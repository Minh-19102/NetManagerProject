CREATE OR REPLACE FUNCTION CreateUser(IN Fname text, IN Lname text, IN dateob timestamp) RETURNS TEXT AS
$$
BEGIN
  INSERT INTO users (user_id, first_name, last_name, dob, membership) 
    VALUES(CONCAT('USER',nextval('uidSequence')), Fname, Lname, dateob, 'N');
  RETURN 'Thành công';
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION CreateAccount(IN UserID text, IN uname text, IN psw text) RETURNS TEXT AS
$$
BEGIN
  IF (SELECT COUNT(*) FROM users WHERE user_id = UserID) = 0 THEN
    RETURN 'User không tồn tại';
  END IF;
  IF (SELECT COUNT(*) FROM account WHERE uname = username) != 0 THEN
    RETURN 'Username đã tồn tại';
  END IF;
  INSERT INTO account (username, password, balance, user_id) 
    VALUES(uname, psw, 0, UserID);
  RETURN 'Thành công';
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION UpRankUser(IN UserID text) RETURNS TEXT AS
$$
BEGIN
  IF (SELECT COUNT(*) FROM users WHERE user_id = UserID) = 0 THEN
    RETURN 'User không tồn tại';
  END IF;
  UPDATE users SET membership = 'Y' WHERE user_id = UserID;
  RETURN 'Thành công';
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION UserLogin(IN uname text, IN psw text) RETURNS INT AS
$$
BEGIN
  IF (SELECT COUNT(*) FROM account WHERE uname = username AND psw = password) = 1 THEN
    RETURN 1;
  END IF;
  RETURN 0;
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION GetTicketListByUsername(IN uname text) RETURNS TABLE (tkid int) AS
$$
BEGIN
  RETURN QUERY SELECT ticket_id as tkid FROM service_ticket WHERE username = uname;
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION Recharge(IN stID text, IN uname text, IN a_value int) RETURNS TEXT AS
$$
BEGIN
  INSERT INTO recharge(username, staff_id, amount, recharge_time) VALUES (uname, stID, a_value, NOW());
  UPDATE account SET balance = balance + a_value WHERE username = uname;
  RETURN 'Thành công';
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION OrderTicket(IN uname text) RETURNS TEXT AS
$$ DECLARE tkid int;
BEGIN
  INSERT INTO service_ticket(username) VALUES (uname);
  SELECT INTO tkid LASTVAL();
  IF (SELECT membership FROM users, account WHERE users.user_id = account.user_id 
    AND account.username = uname and users.membership = 'Y') IS NOT NULL THEN
      UPDATE service_ticket SET discount = 0.05 WHERE ticket_id = tkid;
  END IF;
  RETURN CONCAT('Tạo thành công ticket với ticketID = ', tkid);
END; $$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION ServeTicket(IN staffID text, IN TkID int) RETURNS TEXT AS
$$ BEGIN
  UPDATE service_ticket SET staff_id = staffID WHERE ticket_id = TkID; 
  RETURN 'Thành công';
END; $$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION GetTicketInfo(integer) RETURNS TABLE (svid int,name text, sl int) AS
'SELECT service.service_id, service.name, quantity 
  FROM service JOIN ticket_info on ticket_info.service_id = service.service_id
	AND ticket_id = $1;'
LANGUAGE SQL;

CREATE OR REPLACE FUNCTION UpdateServiceTicket( IN tID int, IN svID int, IN soluong int) RETURNS TEXT AS
$$ 
DECLARE bought int;
DECLARE userAge int;
DECLARE resAge int;
BEGIN
  SELECT INTO bought purchased FROM service_ticket WHERE tID = ticket_id;
  IF bought = 1 THEN
    RETURN 'Không thể thay đổi do Ticket đã được thanh toán.';
  END IF;
  SELECT INTO resAge restrict FROM service WHERE service_id = svID;
  IF resAge = 1 THEN
    SELECT INTO userAge EXTRACT(YEAR FROM AGE(users.dob)) 
      FROM account, users, service_ticket
      WHERE account.username = service_ticket.username AND account.user_id = users.user_id AND ticket_id = tID;
    IF userAge < 18 THEN
      RETURN 'Không thể thêm order do không đủ tuổi.';
    END IF;
  END IF;
  IF soluong = 0 THEN
    DELETE FROM ticket_info WHERE ticket_id = tid AND service_id = svid;
  ELSIF NOT EXISTS (SELECT 1 FROM ticket_info WHERE ticket_id = tid AND service_id = svid) THEN
    INSERT INTO ticket_info(service_id, ticket_id, quantity) VALUES (svID, tID, soluong);
  ELSE
    UPDATE ticket_info SET quantity = soluong WHERE ticket_id = tid AND service_id = svid;
  END IF;
  RETURN 'Thành công';
END; $$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION TicketPay(IN ticketID int) RETURNS TEXT AS
$$ DECLARE checkTicket int;
DECLARE totalbalance int;
DECLARE totalCost int;
DECLARE disct float;
BEGIN
  SELECT INTO checkTicket purchased FROM service_ticket WHERE ticket_id = ticketID;
  IF checkTicket = 0 THEN 
    IF (SELECT count(*) FROM ticket_info WHERE ticket_id = ticketID) = 0 THEN
      RETURN 'Ticket chưa có service nào';
    END IF;
    SELECT INTO totalbalance balance FROM service_ticket, account
      WHERE ticket_id = ticketID AND account.username = service_ticket.username;
    SELECT INTO disct discount FROM service_ticket WHERE ticket_id = ticketID;
    SELECT INTO totalCost CAST(SUM(service.price * ticket_info.quantity)*(1.0-disct) AS INT) FROM ticket_info, service, service_ticket
      WHERE service_ticket.ticket_id = ticketID AND ticket_info.service_id = service.service_id AND service_ticket.ticket_id = ticket_info.ticket_id;
    
    IF totalbalance < totalCost THEN
      RETURN 'Không đủ tiền';
    END IF;

    UPDATE account 
      SET balance = totalbalance - totalCost 
      WHERE username = (SELECT username FROM service_ticket WHERE ticket_id = ticketID);

    UPDATE service_ticket 
      SET purchased = 1, purchase_time = NOW(), total = totalCost
      WHERE username = (SELECT username FROM service_ticket WHERE ticket_id = ticketID) AND ticket_id = ticketID;
      
  ELSE 
    RETURN 'Ticket đã được thanh toán trước đó';
  END IF;
  RETURN 'Thành công';
END; $$ LANGUAGE PLPGSQL;
