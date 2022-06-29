CREATE OR REPLACE FUNCTION Recharge(IN stID text, IN uname text, IN a_value int, OUT rs int) AS
$$
BEGIN
  INSERT INTO recharge(username, staff_id, amount) VALUES (uname, stID, a_value);
  UPDATE account SET balance = balance + a_value WHERE username = uname;
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION AddTicket(IN stID text, in uname ) AS
$$ BEGIN
  INSERT INTO service_ticket(staff_id, username) VALUES (stID, uname);
END; $$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION AddServiceToTicket(IN svID number, IN tTD number, IN soluong number) AS
$$ BEGIN
  INSERT INTO service_info(service_id, ticket_id, quantity) VALUES (stID, uname, soluong);
END; $$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION TicketPay(IN ticketID) AS
$$ DECLARE checkTicket NUMBER;
DECLARE totalbalance NUMBER;
DECLARE totalCost NUMBER;
BEGIN
  SELECT INTO checkTicket purchased FROM service_ticket WHERE ticket_id = ticketID;
  IF checkTicket = 0 THEN 
    SELECT INTO totalbalance balance FROM service_ticket, account
      WHERE ticket_id = ticketID AND account.username = service_ticket.username;
    SELECT INTO totalCost SUM(service.price * service_info.quantity)
      WHERE ticket_id = ticketID AND service_info.service_id = service.service_id AND service_ticket.ticket_id = service_info.ticket_id;
    
  END IF;
END; $$ LANGUAGE PLPGSQL;

ờm sửa ntn à :V