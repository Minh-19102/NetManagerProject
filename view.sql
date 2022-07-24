CREATE OR REPLACE VIEW userList AS
SELECT user_id, first_name, last_name, TO_CHAR(dob ::DATE,'dd-mm-yyyy') as dob, membership FROM users ORDER BY(user_id);

CREATE OR REPLACE VIEW usernameList AS
SELECT username FROM account;

CREATE OR REPLACE VIEW staffList AS
SELECT staff_id FROM staff;

CREATE OR REPLACE VIEW uncompletedTicket AS
SELECT ticket_id FROM service_ticket WHERE staff_id IS NULL AND purchased = 1;

CREATE OR REPLACE VIEW cashierList AS
SELECT staff_id FROM staff WHERE role = 'cashier';

CREATE OR REPLACE VIEW repairerList AS
SELECT staff_id FROM staff WHERE role = 'repairer';

CREATE OR REPLACE VIEW serverList AS
SELECT staff_id FROM staff WHERE role = 'server';

CREATE OR REPLACE VIEW BeingUsedComputer AS
SELECT computer.computer_id, account.username FROM account, session, computer
WHERE account.username = session.username AND computer.computer_id = session.computer_id AND session.logout_time is null;

CREATE OR REPLACE VIEW BrokenComputer AS
SELECT computer_id FROM computer WHERE condition <> 0;

CREATE OR REPLACE VIEW AppRanking AS
SELECT app.app_id, name, count(session_id) from app, app_use
WHERE app.app_id = app_use.app_id
GROUP BY app.app_id
ORDER BY count(session_id) DESC;

CREATE OR REPLACE VIEW UserRanking AS
SELECT u.user_id, CONCAT(u.last_name ,' ', u.first_name) AS fullname, sum(r.amount) AS "Total Recharge"
FROM users u, account a, recharge r 
WHERE u.user_id = a.user_id AND r.username = a.username
group by u.user_id
ORDER BY sum(r.amount) DESC;