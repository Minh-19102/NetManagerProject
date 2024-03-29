import random
import datetime
import string

random.seed(1000)

targetFile = open("SampleData.sql", "w", encoding="utf8")

userID = []
staffID1 = []
staffID2 = []
staffID3 = []
comID = []


def create_user():
    targetFile.write("-- User --\n")
    tenF = open("ten.txt", "r", encoding="utf8")
    hoF = open("ho.txt", "r", encoding="utf8")
    ten = tenF.read().split('\n')
    ho = hoF.read().split('\n')
    id1 = 0
    # Random Dob
    start_date = datetime.date(1990, 1, 1)
    end_date = datetime.date(2010, 12, 31)
    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    # Loop
    for name in ten:
        id1 += 1
        userID.append("USER{}".format(("00" + str(id1))[-3:]))
        random_date = start_date + datetime.timedelta(days=random.randrange(days_between_dates))
        targetFile.write("INSERT INTO users (user_id, first_name, last_name, dob, membership) VALUES('{}', '{}', '{}', '{}', 'N');\n".format(
            userID[-1], name, random.choice(ho), random_date))


create_user()

account = []


def create_account():
    targetFile.write("\n\n\n--Account--\n")
    n = int(len(userID) * 1.2)
    for i in range(n):
        ownerID = i % len(userID)
        account.append(''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase + string.digits, k=random.randint(5, 20))))
        passw = ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase + string.digits, k=random.randint(8, 16)))
        targetFile.write("INSERT INTO account (username, password, balance, user_id) VALUES('{}', '{}', 0, '{}');\n".format(
            account[-1], passw, userID[ownerID]))


create_account()


def create_staff():
    targetFile.write("\n\n\n-- Staff --\n")
    hoF = open("ho.txt", "r", encoding="utf8")
    ten1 = ["Trọng Quang", "Tiến Đạt", "Văn Trường", "Quang Vũ"]
    ten2 = ["Thị Thanh", "Văn Lâm", "Văn Khoa"]
    ten3 = ["Quỳnh Anh", "Minh Chí", "Thị Liên"]
    ho = hoF.read().split('\n')
    id1 = 0
    # Random Dob
    start_date = datetime.date(1990, 1, 1)
    end_date = datetime.date(2003, 12, 31)
    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    # Loop
    for name in ten1:
        id1 += 1
        staffID1.append("RE{}".format(("0" + str(id1))[-2:]))
        random_date = start_date + datetime.timedelta(days=random.randrange(days_between_dates))
        targetFile.write("INSERT INTO staff (staff_id, first_name, last_name, dob, role) VALUES('{}', '{}', '{}', '{}', '{}');\n".format(
            staffID1[-1], name, random.choice(ho), random_date, "repairer"))
    id1 = 0
    for name in ten2:
        id1 += 1
        staffID2.append("CA{}".format(("0" + str(id1))[-2:]))
        random_date = start_date + datetime.timedelta(days=random.randrange(days_between_dates))
        targetFile.write("INSERT INTO staff (staff_id, first_name, last_name, dob, role) VALUES('{}', '{}', '{}', '{}', '{}');\n".format(
            staffID2[-1], name, random.choice(ho), random_date, "cashier"))
    id1 = 0
    for name in ten3:
        id1 += 1
        staffID3.append("SE{}".format(("0" + str(id1))[-2:]))
        random_date = start_date + datetime.timedelta(days=random.randrange(days_between_dates))
        targetFile.write("INSERT INTO staff (staff_id, first_name, last_name, dob, role) VALUES('{}', '{}', '{}', '{}', '{}');\n".format(
            staffID3[-1], name, random.choice(ho), random_date, "server"))


create_staff()


def create_computer():
    targetFile.write("\n\n\n-- Computer --\n")
    for i in range(50):
        comID.append("COM{}".format(("00" + str(i))[-3:]))
        targetFile.write("INSERT INTO computer(computer_id, condition) VALUES('{}', 0);\n".format(comID[-1]))


create_computer()


def create_service():
    targetFile.write("\n\n\n-- Service --\n")
    servicePrice = {
        "Cofee": [15000, 0],
        "Big coffee": [25000, 0],
        "Small cofee": [10000, 0],
        "Coca Cola": [7000, 0],
        "Pesi": [7000, 0],
        "Sting": [8000, 0],
        "Normal noodles": [10000, 0],
        "Big noodles": [20000, 0],
        "Small ice cream": [5000, 0],
        "Ice cream": [13000, 0],
        "Big ice cream": [20000, 0],
        "555 tobacco": [26000, 1],
        "Thang Long tobacco": [10000, 1],
        "Sai gon silver tobacoo": [15000, 1],
    }
    for name, price in servicePrice.items():
        targetFile.write("INSERT INTO service(name, price, restrict) VALUES ('{}', {}, {});\n".format(name, price[0], price[1]))


create_service()


def create_app():
    targetFile.write("\n\n\n-- App --\n")
    appNameFile = open("appList.txt", "r", encoding="utf8")
    appName = appNameFile.read().split('\n')
    for app in appName:
        targetFile.write("INSERT INTO app(name) VALUES('{}');\n".format(app))


create_app()

from random import randint, randrange
from datetime import timedelta


def random_date(start, end):
    delta = end - start
    int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
    random_second = randrange(int_delta)
    return start + timedelta(seconds=random_second)


def create_recharge():
    targetFile.write("\n\n\n-- Recharge --\n")
    NN = 2000
    ttime = []
    for i in range(NN):
        ttime.append(random_date(datetime.datetime(2022, 1, 1), datetime.datetime(2022, 7, 24)))
    ttime.sort()
    for i in range(NN):
        uuname = random.choice(account)
        sta = random.choice(staffID2)
        amount = random.randrange(5000, 200000, 1000)
        targetFile.write("INSERT INTO recharge(username, staff_id, amount, recharge_time) VALUES ('{}', '{}', '{}', '{}');\n".format(
            uuname, sta, amount, ttime[i]))
        targetFile.write("UPDATE account SET balance = balance + {} WHERE username = '{}';\n".format(amount, uuname))


create_recharge()


def create_ticket():
    targetFile.write("\n\n\n-- Ticket --\n")
    NN = 1000
    ttime = []
    for i in range(NN):
        ttime.append(random_date(datetime.datetime(2022, 1, 1), datetime.datetime(2022, 7, 24)))
    ttime.sort()
    for i in range(NN):
        uuname = random.choice(account)
        tkid = i + 1
        sta = random.choice(staffID3)
        targetFile.write("\nSELECT OrderTicket('{}');\n".format(uuname))
        for j in range(0, random.randint(1, 5)):
            svid = random.randint(1, 11)
            targetFile.write("SELECT UpdateServiceTicket({}, {}, {}); ".format(tkid, svid, random.randint(1, 5)))
        targetFile.write("\nSELECT TicketPay({}); SELECT ServeTicket('{}', {});\n".format(tkid, sta, tkid))
        targetFile.write("UPDATE service_ticket SET purchase_time = '{}' WHERE ticket_id = {};\n".format(ttime[i], tkid))


create_ticket()


def create_sesion():
    targetFile.write("\n\n\n-- Session --\n")
    NN = 5000
    ssTime = []
    ssEndTime = []
    for i in range(NN):
        ssTime.append(random_date(datetime.datetime(2022, 2, 1), datetime.datetime(2022, 7, 24)))
    ssTime.sort()
    for i in range(NN):
        ssEndTime.append(ssTime[i] + datetime.timedelta(minutes=randint(1, 420)))
    for i in range(NN):
        ssID = i + 1
        uuname = random.choice(account)
        com = random.choice(comID)
        targetFile.write("\nSELECT CreateSession('{}', '{}', '{}');\n".format(uuname, com, ssTime[i]))
        for j in range(0, random.randint(1, 8)):
            targetFile.write("SELECT AppUse({}, {}); ".format(ssID, random.randint(1, 41)))
        errChange = random.random()
        if errChange < 0.01:
            targetFile.write("\nSELECT ReportError({}, '{}', {});\n".format(ssID, ''.join(random.choice(string.ascii_lowercase) for xx in range(30)),
                                                                            random.randint(1, 9)))
            targetFile.write("INSERT INTO fix(staff_id, computer_id, fix_date, cost, bug) VALUES ('{}', '{}', '{}', {}, '{}');".format(
                random.choice(staffID1), com,
                str(ssEndTime[i]).split(' ')[0],
                random.randint(50, 1100) * 1000, ''.join(random.choice(string.ascii_lowercase) for xx in range(30))))
            targetFile.write("UPDATE computer SET condition = 0 WHERE computer_id = '{}';".format(com))
        targetFile.write("\nSELECT EndSession({}, '{}');\n".format(ssID, ssEndTime[i]))


create_sesion()

targetFile.close()
