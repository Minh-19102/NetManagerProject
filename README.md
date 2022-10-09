# NetManagerProject

# About

Đây là web app được xây dựng cho quản lý quán internet online. Project này xoay quanh việc thiết kế cơ sở dữ liệu nên phần app không được tập trung vào.

This is a web app built for online internet shop management. This project revolves around database design so the app part is not focused on.

# Database
## ER
![er_draw](https://user-images.githubusercontent.com/58623645/194770541-ce4715c6-c390-40d0-9f39-d0a3d6cf422d.png)
## Table Description
-- users(**user_id**, first_name, last_name, dob, membership) 

-- account(**username**, password, balance, (user_id))

-- computer(**computer_id**, condition, (username))

-- session(**session_id**, login_time, end_time, error, (username),(computer_id))

-- app(app_id,name, (session_id))

-- app_use(app_id, (session_id))

-- staff(**staff_id**, first_name, last_name, dob, role)

-- recharge(recharge_id, amount, recharge_time, staff_id, username)

-- fix(computer_id, staff_id, fix_date, error_id, cost)

-- service(service_id, name, price, restrict)

-- service_info(service_id, name, price, restrict)

# Useage
## Install
1. Cài đặt nodejs (cùng npm) và PostgreSQL vào máy tính.

Install nodejs and PostgreSQL

NodeJS (và NPM): https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

Lưu ý: nếu cài trên Windows phải add đường dẫn vào $PATH$ để có thể gõ lệnh trực tiếp trong CMD.

If your OS is windows, you have to add $PATH$ to run command in CMD.

Thêm Path (nodeJS): https://stackoverflow.com/questions/27344045/installing-node-js-and-npm-on-windows-10

Thêm Path (Postgres): https://blog.sqlbackupandftp.com/setting-windows-path-for-postgres-tools

2. Vào thư mục chính. Bật cửa sổ Terminal gõ các lệnh:

Go in to terminal and run:
```
cd server
npm install
npm install nodemon –save-dev
```
Sau đó bật thêm 1 cửa sổ Terminal ở thư mục chính gõ lệnh:

Then open new terminal and run:
```
cd app-ui
npm install
```
3. Import dữ liệu mẫu (Tùy chọn):

Import sample data (Optional):

Mở terminal mới và gõ:

Open new terminal then enter: `psql postgres postgres` Then enter password. 

Then you are in SQL command enviroment, Enter: `\i autorun.sql`

Note that this step can take long time.

4. Run web:
Open terminal and run:
```
cd server
npm nodemon index.js 
```
Open new terminal and rn:
```
cd app-ui
npm start
```

App is in localhost:8000
