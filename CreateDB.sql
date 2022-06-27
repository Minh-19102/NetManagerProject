-- TABLE DEFINITION
-- users(user_id, first_name, last_name, dob, membership) 
-- account(username, password, balance, (user_id))
-- computer(computer_id, condition, (username))
-- session(session_id, login_time, end_time, (username),(computer_id))
-- app_install(app_id,name,(session_id))
-- error(error_id,error (session_id))
-- fix(computer_id, staff_id, date, bug, cost)

-- staff(staff_id, first_name, last_name, dob, gender, role, email, tele, salary)
-- service_ticket(ticket_id, (staff_id), (username))
-- service(service_id, name, price)
-- recharge(staff_id,username, amount)
-- ticket_info(service_id, ticket_id, quantity, discount)


-- ================================================================================

DROP DATABASE IF EXISTS netmanager; 
CREATE DATABASE netmanager;
\c netmanager

-- users(user_id, first_name, last_name, dob, membership)
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
	condition CHAR(1) DEFAULT '0' NOT NULL,
	CONSTRAINT computer_pk PRIMARY KEY (computer_id),
	CONSTRAINT computer_check_condition CHECK (condition ='0' or condition ='1')
);

-- session(session_id, login_time, end_time, (username),(computer_id))
CREATE TABLE session (
	session_id INT NOT NULL,
	login_time timestamp NOT NULL,
	end_time timestamp,
	username VARCHAR(20) NOT NULL,
	computer_id VARCHAR(20) NOT NULL,
	CONSTRAINT session_pk PRIMARY KEY (session_id),
	CONSTRAINT session_fk_username FOREIGN KEY (username) REFERENCES account(username),
	CONSTRAINT session_fk_computer_id FOREIGN KEY (computer_id) REFERENCES computer(computer_id)
);


-- error(error, (session_id))
CREATE TABLE error (
	error_id INT,
	session_id INT NOT NULL,
	error CHAR(1),

	CONSTRAINT error_pk PRIMARY KEY (error_id),
	CONSTRAINT error_fk_session_id FOREIGN KEY (session_id) REFERENCES session(session_id),
	CONSTRAINT error_check CHECK (error='0' or error='1') 
);

-- app_install(app_id,name,(session_id))
CREATE TABlE app_install(
	app_id INT NOT NULL,
	name char(20) NOT NULL,
	session_id INT NOT NULL,
	CONSTRAINT app_install_pk PRIMARY KEY (app_id),
	CONSTRAINT app_install_fk FOREIGN KEY (session_id) REFERENCES session(session_id)
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
	username VARCHAR(20) NOT NULL,
	amount INT NOT NULL,
	staff_id VARCHAR(20) NOT NULL,
	CONSTRAINT recharge_pk PRIMARY KEY (username),
	CONSTRAINT recharge_staff_id_fk FOREIGN KEY (staff_id) REFERENCES staff(staff_id)
);

-- fix(computer_id, staff_id, date, bug, cost)
CREATE TABLE fix (
	computer_id INT NOT NULL,
	staff_id VARCHAR(20) NOT NULL,
	date DATE NOT NULL,
	cost INT NOT NULL,
	bug char(50) NOT NULL,
	CONSTRAINT staff_id_fk FOREIGN KEY (staff_id) REFERENCES staff(staff_id)
	
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
	ticket_id INT NOT NULL,
	staff_id VARCHAR(20) NOT NULL,
	username VARCHAR(20) NOT NULL,
	CONSTRAINT ticket_pk PRIMARY KEY (ticket_id),
	CONSTRAINT ticket_username_fk FOREIGN KEY (username) REFERENCES account(username)
);

-- ticket_info(service_id, ticket_id, quantity, discount)
CREATE TABLE service_info (
	service_id INT NOT NULL,
	ticket_id INT NOT NULL,
	quantity INT NOT NULL,
	discount VARCHAR(3),
	CONSTRAINT service_info_service_ticket_fk FOREIGN KEY (service_id) REFERENCES service(service_id),
	CONSTRAINT service_info_ticket_id_fk FOREIGN KEY (ticket_id) REFERENCES service_ticket(ticket_id)
);