CREATE OR REPLACE FUNCTION Recharge(IN stID text, IN uname text, IN a_value int, OUT rs int) AS
$$
BEGIN
  INSERT INTO recharge(username, staff_id, amount) VALUES (uname, stID, a_value);
  UPDATE account SET balance = balance + a_value WHERE username = uname;
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION AddTicket(IN stID text, in uname, ) AS
$$
BEGIN
  INSERT INTO service_ticket(staff_id, username) VALUES (stID, uname);
END;
$$
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION AddServiceToTicket(IN svID number, IN tTD number, IN soluong) AS
$$
BEGIN
  INSERT INTO service_info(service_id, ticket_id, quantity) VALUES (stID, uname, soluong);
END;
$$
$$ LANGUAGE PLPGSQL;



ờm sửa ntn à :V