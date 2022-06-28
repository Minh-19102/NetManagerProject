CREATE OR REPLACE FUNCTION Recharge(IN stID text, IN uname text, IN a_value int, OUT rs int) AS
$$
BEGIN
  INSERT INTO recharge(username, staff_id, amount) VALUES (uname, stID, a_value);
  UPDATE account SET balance = balance + a_value WHERE username = uname;
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION Order() AS
$$
BEGIN
END;
$$
$$ LANGUAGE PLPGSQL;

ờm sửa ntn à :V