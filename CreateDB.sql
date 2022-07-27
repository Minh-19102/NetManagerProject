DROP DATABASE IF EXISTS netmanager; 
DROP ROLE IF EXISTS nadmin;
CREATE DATABASE netmanager ENCODING 'UTF8';
CREATE ROLE nadmin LOGIN PASSWORD '123456';
grant all on database netmanager to nadmin;
\c netmanager nadmin

SET CLIENT_ENCODING TO 'utf8';

-- users(user_id, first_name, last_name, dob, membership)
CREATE SEQUENCE uidSequence START 100;
CREATE TABLE users (
	user_id VARCHAR(20) NOT NULL,
	first_name VARCHAR(20) NOT NULL,
	last_name VARCHAR(20) NOT NULL,
	dob DATE NOT NULL,
	membership CHAR(1),
	CONSTRAINT user_pk PRIMARY KEY (user_id),
	CONSTRAINT user_chk_membership CHECK (membership = 'Y' OR membership = 'N')
);

-- account(username, password, balance, (user_id))
CREATE TABLE account (
	username VARCHAR(20) NOT NULL,
	password VARCHAR(20) NOT NULL,
	balance INT,
	user_id VARCHAR(20) NOT NULL,
	CONSTRAINT account_pk PRIMARY KEY (username),
	CONSTRAINT account_fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- computer(computer_id, condition, (username))
CREATE TABLE computer (
	computer_id VARCHAR(20),
	condition INT DEFAULT 0 NOT NULL,
	CONSTRAINT computer_pk PRIMARY KEY (computer_id),
	CONSTRAINT computer_check_condition CHECK (condition >=0 and condition <=9)
);

-- session(session_id, login_time, end_time, (username),(computer_id))
CREATE TABLE session (
	session_id SERIAL,
	login_time timestamp NOT NULL,
	logout_time timestamp,
	username VARCHAR(20) NOT NULL,
	computer_id VARCHAR(20) NOT NULL,
  error VARCHAR(150),
	CONSTRAINT session_pk PRIMARY KEY (session_id),
	CONSTRAINT session_fk_username FOREIGN KEY (username) REFERENCES account(username),
	CONSTRAINT session_fk_computer_id FOREIGN KEY (computer_id) REFERENCES computer(computer_id)
);

CREATE TABlE app(
	app_id SERIAL,
	name VARCHAR(40) NOT NULL,
	CONSTRAINT app_pk PRIMARY KEY (app_id)
);

CREATE TABlE app_use(
	app_id INT NOT NULL,
	session_id INT NOT NULL,
	CONSTRAINT app_id_fk FOREIGN KEY (app_id) REFERENCES app(app_id),
	CONSTRAINT session_id_fk FOREIGN KEY (session_id) REFERENCES session(session_id)
);

-- staff(staff_id, first_name, last_name, dob, gender, role, email, tele, salary)
CREATE TABLE staff(
	staff_id VARCHAR(20) NOT NULL,
	first_name VARCHAR(20) NOT NULL,
	last_name VARCHAR(20) NOT NULL,
	dob DATE NOT NULL,
	role VARCHAR(20) NOT NULL,
	CONSTRAINT staff_pk PRIMARY KEY(staff_id)
);
--recharge(amount, (staff_id), (username))
CREATE TABLE recharge (
  recharge_id SERIAL,
	username VARCHAR(20) NOT NULL,
	amount INT NOT NULL,
  recharge_time timestamp,
	staff_id VARCHAR(20) NOT NULL,
	CONSTRAINT recharge_pk FOREIGN KEY (username) REFERENCES account(username),
	CONSTRAINT recharge_staff_id_fk FOREIGN KEY (staff_id) REFERENCES staff(staff_id)
);

-- fix(computer_id, staff_id, date, bug, cost)
CREATE TABLE fix (
	computer_id VARCHAR(20) NOT NULL,
	staff_id VARCHAR(20) NOT NULL,
	fix_date DATE NOT NULL,
	cost INT NOT NULL,
	bug char(150) NOT NULL,
	CONSTRAINT staff_id_fk FOREIGN KEY (staff_id) REFERENCES staff(staff_id),
  CONSTRAINT computer_id_fk FOREIGN KEY (computer_id) REFERENCES computer(computer_id)
);

-- service(service_id, name, price)
CREATE TABLE service (
	service_id SERIAL,
	name VARCHAR(30) NOT NULL,
	price INT NOT NULL,
	restrict INT,
  CONSTRAINT restrict_check CHECK (restrict=0 or restrict=1),
	CONSTRAINT service_pk PRIMARY KEY (service_id)
);

-- service_ticket(ticket_id, (staff_id), (username))
CREATE TABLE service_ticket (
	ticket_id SERIAL,
	staff_id VARCHAR(20),
	username VARCHAR(20) NOT NULL,
  purchase_time TIMESTAMP,
  purchased INT DEFAULT 0,
  total INT DEFAULT 0,
  discount FLOAT DEFAULT 0.0,
  CONSTRAINT purchased_check CHECK (purchased=0 or purchased=1),
	CONSTRAINT ticket_pk PRIMARY KEY (ticket_id),
	CONSTRAINT ticket_username_fk FOREIGN KEY (username) REFERENCES account(username)
);

-- ticket_info(service_id, ticket_id, quantity, discount)
CREATE TABLE ticket_info (
	service_id INT NOT NULL,
	ticket_id INT NOT NULL,
	quantity INT NOT NULL,
	CONSTRAINT service_info_service_ticket_fk FOREIGN KEY (service_id) REFERENCES service(service_id),
	CONSTRAINT service_info_ticket_id_fk FOREIGN KEY (ticket_id) REFERENCES service_ticket(ticket_id)
);