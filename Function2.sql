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
  IF (SELECT balance FROM account WHERE username = uname) < 1000 THEN
    RETURN 'Số dư tài khoản không đủ (<1000đ) để mở máy';
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