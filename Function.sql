CREATE OR REPLACE FUNCTION Recharge(IN stID text, IN uname text, IN a_value int, OUT rs int) AS
$$
BEGIN
  INSERT INTO recharge(username, staff_id, amount) VALUES (uname, stID, a_value);
  UPDATE account SET balance = balance + a_value WHERE username = uname;
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION AddTicket(IN stID text, in uname text) RETURNS INTEGER AS
$$ BEGIN
  INSERT INTO service_ticket(staff_id, username) VALUES (stID, uname);
  RETURN 0;
END; $$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION AddServiceToTicket(IN svID int, IN tID int, IN soluong int) RETURNS INTEGER AS
$$ BEGIN
  INSERT INTO ticket_info(service_id, ticket_id, quantity) VALUES (svID, tID, soluong);
  RETURN 0;
END; $$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION TicketPay(IN ticketID int) RETURNS INTEGER AS
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
      RETURN 2;
    END IF;

    UPDATE account 
      SET balance = totalbalance - totalCost 
      WHERE username = (SELECT username FROM service_ticket WHERE ticket_id = ticketID);

    UPDATE service_ticket 
      SET purchased = 1
      WHERE username = (SELECT username FROM service_ticket WHERE ticket_id = ticketID);
      
  ELSE 
    RETURN 1;
  END IF;
  RETURN 0;
END; $$ LANGUAGE PLPGSQL;




