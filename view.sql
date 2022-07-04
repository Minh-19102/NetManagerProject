CREATE OR REPLACE VIEW userList AS
SELECT user_id, first_name, last_name, TO_CHAR(dob ::DATE,'dd-mm-yyyy') as dob, membership FROM users;

CREATE OR REPLACE VIEW usernameList AS
SELECT username FROM account;

CREATE OR REPLACE VIEW staffList AS
SELECT staff_id FROM staff;

CREATE OR REPLACE VIEW cashierList AS
SELECT staff_id FROM staff WHERE role = 'cashier';

CREATE OR REPLACE VIEW repairerList AS
SELECT staff_id FROM staff WHERE role = 'repairer';

CREATE OR REPLACE VIEW serverList AS
SELECT staff_id FROM staff WHERE role = 'server';