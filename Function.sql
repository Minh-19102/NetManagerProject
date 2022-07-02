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
  IF (SELECT COUNT(*) FROM account WHERE uname = username) != 0 THEN
    RETURN 'Username đã tồn tại';
  END IF;
  INSERT INTO account (username, password, balance, user_id) 
    VALUES(uname, psw, 0, UserID);
  RETURN 'Thành công';
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION Recharge(IN stID text, IN uname text, IN a_value int) RETURNS TEXT AS
$$
BEGIN
  INSERT INTO recharge(username, staff_id, amount) VALUES (uname, stID, a_value);
  UPDATE account SET balance = balance + a_value WHERE username = uname;
  RETURN 'Thành công';
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION AddTicket(IN stID text, in uname text) RETURNS TEXT AS
$$ BEGIN
  INSERT INTO service_ticket(staff_id, username) VALUES (stID, uname);
  RETURN 'Thành công';
END; $$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION AddServiceToTicket( IN tID int, IN svID int, IN soluong int) RETURNS TEXT AS
$$ 
DECLARE userAge int;
DECLARE resAge int;
BEGIN
  SELECT INTO resAge restrict FROM service WHERE service_id = svID;
  IF resAge = 1 THEN
    SELECT INTO userAge EXTRACT(YEAR FROM AGE(users.dob)) 
      FROM users join service_ticket ON users.username = service_ticket.username
      WHERE service_ticket = tID;
    IF userAge < 18 THEN
      RETURN "Không thể thêm order do không đủ tuổi.";
    END IF;
  END IF;
  INSERT INTO ticket_info(service_id, ticket_id, quantity) VALUES (svID, tID, soluong);
  RETURN 'Thành công';
END; $$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION TicketPay(IN ticketID int) RETURNS TEXT AS
$$ DECLARE checkTicket int;
DECLARE totalbalance int;
DECLARE totalCost int;
BEGIN
  SELECT INTO checkTicket purchased FROM service_ticket WHERE ticket_id = ticketID;
  IF checkTicket = 0 THEN 
    SELECT INTO totalbalance balance FROM service_ticket, account
      WHERE ticket_id = ticketID AND account.username = service_ticket.username;
    SELECT INTO totalCost SUM(service.price * ticket_info.quantity) FROM ticket_info, service, service_ticket
      WHERE service_ticket.ticket_id = ticketID AND ticket_info.service_id = service.service_id AND service_ticket.ticket_id = ticket_info.ticket_id;
    
    IF totalbalance < totalCost THEN
      RETURN 'Không đủ tiền';
    END IF;

    UPDATE account 
      SET balance = totalbalance - totalCost 
      WHERE username = (SELECT username FROM service_ticket WHERE ticket_id = ticketID);

    UPDATE service_ticket 
      SET purchased = 1
      WHERE username = (SELECT username FROM service_ticket WHERE ticket_id = ticketID);
      
  ELSE 
    RETURN 'Ticket đã được thanh toán trước đó';
  END IF;
  RETURN 'Thành công';
END; $$ LANGUAGE PLPGSQL;
