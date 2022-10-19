CREATE OR REPLACE FUNCTION CreateSession(IN uname text, IN comid text, IN loginTime timestamp) RETURNS TEXT AS
$$
BEGIN
  IF (SELECT condition FROM computer WHERE computer_id = comid) <> 0 THEN
    RETURN 'Máy hiện đang gặp sự cố!';
  END IF;
  IF (SELECT count(*) FROM BeingUsedComputer WHERE computer_id = comid) <> 0 THEN
    RETURN 'Máy tính hiện đang được sử dụng bởi người khác';
  END IF;
  IF (SELECT count(*) FROM BeingUsedComputer WHERE username = uname) <> 0 THEN
    RETURN 'Tài khoản hiện đang được login trên máy khác';
  END IF;
  IF (SELECT balance FROM account WHERE username = uname) < 100 THEN
    RETURN 'Số dư tài khoản không đủ (<100đ) để mở máy';
  END IF;
  IF loginTime is null THEN
    INSERT INTO session(username, computer_id, login_time) VALUES (uname, comid, NOW());
  ELSE
    INSERT INTO session(username, computer_id, login_time) VALUES (uname, comid, loginTime);
  END IF;
  RETURN CAST(LASTVAL() AS TEXT);
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION EndSession(IN ssID int, IN logoutTime timestamp) RETURNS TEXT AS
$$
BEGIN
  IF logoutTime is null THEN
    UPDATE session SET logout_time = NOW() WHERE session_id = ssID;
  ELSE
    UPDATE session SET logout_time = logoutTime WHERE session_id = ssID;
  END IF;
  RETURN 'Thành công';
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION AppUse(IN ssID int, IN appID int) RETURNS TEXT AS
$$
BEGIN
  IF (SELECT count(*) FROM app_use WHERE app_id = appID AND session_id = ssID) = 0 THEN
    INSERT INTO app_use(app_id, session_id) VALUES (appID, ssID);
  END IF;
  RETURN 'Thành công';
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION ReportError(IN ssID int, IN err text, IN errType int) RETURNS TEXT AS
$$
BEGIN
  IF LENGTH(err) >= 200 THEN
    RETURN 'Độ dài Error report vượt quá phạm vi cho phép.';
  END IF;
  UPDATE session SET error = err WHERE session_id = ssID;
  UPDATE computer SET condition = errType
    WHERE computer_id = (SELECT computer_id FROM session WHERE session_id = ssID);
  RETURN 'Thành công';
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION AutoDecreaseBalanceEveryMinute(in CostPerHour int) RETURNS int AS
$$
DECLARE uname text;
BEGIN
  FOR uname IN SELECT username FROM BeingUsedComputer LOOP
    UPDATE account SET balance = balance - CostPerHour/60 WHERE username = uname;
    IF (SELECT balance FROM account WHERE username = uname) <= 0 THEN
      UPDATE account SET balance = 0 WHERE username = uname;
    END IF;
  END LOOP;
  RETURN 0;
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION SeeComputerHistory(in comID text) RETURNS SETOF text AS
$$
DECLARE record text;
BEGIN
  FOR record IN (SELECT error FROM session WHERE computer_id = comID AND error is not null) LOOP
    RETURN NEXT record;
  END LOOP;
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION FixBrokenComputer(in comID text, in staID text, in fix_cost int, in bugDes text) RETURNS text AS
$$
BEGIN
  IF (SELECT condition FROM computer WHERE computer_id = comID) = 0 THEN
    RETURN 'Máy tính hoạt động bình thường, không cần sửa chữa.';
  END IF;
  UPDATE computer SET condition = 0 WHERE computer_id = comID;
  INSERT INTO fix(staff_id, computer_id, fix_date, cost, bug) VALUES (staID, comID, CURRENT_DATE, fix_cost, bugDes);
  RETURN 'Thành công';
  END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION SummaryRechargeByDate(IN start_date timestamp, IN end_date timestamp) RETURNS SETOF INT AS
$$
DECLARE
rec int;
BEGIN
  WHILE start_date < end_date LOOP
    SELECT SUM(amount) FROM recharge WHERE recharge_time BETWEEN start_date AND start_date + interval '1 day' INTO rec ;
  	SELECT INTO start_date (start_date + interval '1 day');
    RETURN next rec;
  END LOOP;
END;
$$ LANGUAGE PLPGSQL;
