const express = require('express')
const app = express()
const pool = require('./db')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.listen(5000, () => {
	console.log('server has started on port 5000')
})

const autoRun = () => {
	setInterval(async () => {
		try {
			SQLexecute = await pool.query(`SELECT AutoDecreaseBalanceEveryMinute(${6000});`)
		} catch (err) {
			console.log(err.message)
		}
	}, 60 * 1000)
}
autoRun()
app.post('/createAccount', async (req, res) => {
	try {
		info = req.body
		uid = info.userID
		uname = info.username
		pwd = info.password
		SQLexecute = await pool.query(`SELECT CreateAccount('${uid}', '${uname}', '${pwd}');`)
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.post('/createUser', async (req, res) => {
	try {
		info = req.body
		Fname = info.firstName
		Lname = info.lastName
		dob = info.dob
		SQLexecute = await pool.query(`SELECT CreateUser('${Fname}', '${Lname}', '${dob}');`)
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.post('/recharge', async (req, res) => {
	try {
		info = req.body
		username = info.username
		staff_id = info.staff_id
		amount = info.amount
		SQLexecute = await pool.query(`SELECT Recharge('${staff_id}', '${username}', ${amount});`)
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err)
	}
})

app.post('/orderTicket', async (req, res) => {
	try {
		info = req.body
		uname = info.username
		SQLexecute = await pool.query(`SELECT OrderTicket('${uname}');`)
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.post('/login', async (req, res) => {
	try {
		info = req.body
		username = info.username
		password = info.password
		SQLexecute = await pool.query(`SELECT UserLogin('${username}', '${password}');`)
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.get('/AllUser', async (req, res) => {
	try {
		SQLexecute = await pool.query('SELECT * FROM userList;')
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.get('/UserRanking', async (req, res) => {
	try {
		SQLexecute = await pool.query('SELECT * FROM UserRanking;')
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.get('/AppRanking', async (req, res) => {
	try {
		SQLexecute = await pool.query('SELECT * FROM AppRanking;')
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.post('/UpRankUser', async (req, res) => {
	try {
		info = req.body
		uid = info.userID
		SQLexecute = await pool.query(`SELECT * FROM UpRankUser('${uid}');`)
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.post('/userBalance', async (req, res) => {
	try {
		info = req.body
		username = info.username
		SQLexecute = await pool.query(`SELECT balance FROM account WHERE username = '${username}';`)
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.get('/AllAccount', async (req, res) => {
	try {
		SQLexecute = await pool.query('SELECT * FROM account;')
		SQLexecute.rows.forEach((element) => {
			delete element.password
		})
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.get('/usernameList', async (req, res) => {
	try {
		SQLexecute = await pool.query('SELECT * FROM usernameList;')
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.get('/cashierList', async (req, res) => {
	try {
		SQLexecute = await pool.query('SELECT * FROM cashierList;')
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.get('/serverList', async (req, res) => {
	try {
		SQLexecute = await pool.query('SELECT * FROM serverList;')
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.get('/repairerList', async (req, res) => {
	try {
		SQLexecute = await pool.query('SELECT * FROM repairerList;')
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.get('/uncompletedTicketList', async (req, res) => {
	try {
		SQLexecute = await pool.query('SELECT * FROM uncompletedTicket;')
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.post('/serve', async (req, res) => {
	try {
		info = req.body
		ticket_id = info.ticket_id
		staff_id = info.staff_id
		SQLexecute = await pool.query(`SELECT ServeTicket('${staff_id}', '${ticket_id}');`)
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.get('/ticketInfo/:tid', async (req, res) => {
	try {
		SQLexecute = await pool.query(`SELECT * FROM GetTicketInfo(${req.params.tid});`)
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.get('/listTicketByUsername/:uname', async (req, res) => {
	try {
		SQLexecute = await pool.query(`SELECT * FROM GetTicketListByUsername('${req.params.uname}');`)
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.get('/listAllService', async (req, res) => {
	try {
		SQLexecute = await pool.query(`SELECT * FROM service;`)
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.post('/UpdateServiceTicket', async (req, res) => {
	try {
		info = req.body
		ticket_id = info.ticket_id
		service_id = info.service_id
		amount = info.amount
		SQLexecute = await pool.query(`SELECT UpdateServiceTicket(${ticket_id}, ${service_id}, ${amount});`)
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.post('/purchase', async (req, res) => {
	try {
		info = req.body
		ticket_id = info.ticket_id
		SQLexecute = await pool.query(`SELECT TicketPay(${ticket_id})`)
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.get('/computerList', async (req, res) => {
	try {
		SQLexecute = await pool.query(`SELECT * FROM computer;`)
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.post('/computerLogin', async (req, res) => {
	try {
		info = req.body
		username = info.username
		comID = info.comID
		SQLexecute = await pool.query(`SELECT CreateSession('${username}', '${comID}', null);`)
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.post('/computerLogout', async (req, res) => {
	try {
		info = req.body
		sessionID = info.sessionID
		SQLexecute = await pool.query(`SELECT EndSession('${sessionID}', null);`)
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.get('/GetComputerIDBySession/:ss', async (req, res) => {
	try {
		SQLexecute = await pool.query(`SELECT computer_id FROM session WHERE session_id = ${req.params.ss};`)
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.get('/AllApp', async (req, res) => {
	try {
		SQLexecute = await pool.query(`SELECT * FROM app;`)
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.post('/UsingApp', async (req, res) => {
	try {
		info = req.body
		ssID = info.session_id
		appID = info.app_id
		//console.log(`SELECT AppUse(${ssID}, ${appID});`)
		SQLexecute = await pool.query(`SELECT AppUse(${ssID}, ${appID});`)
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.get('/listAppUsingInSession/:ssID', async (req, res) => {
	try {
		SQLexecute = await pool.query(
			`SELECT app.app_id, name FROM app_use, app WHERE app.app_id = app_use.app_id AND session_id = ${req.params.ssID};`,
		)
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.post('/ReportError', async (req, res) => {
	try {
		info = req.body
		ssID = info.session_id
		error = info.error
		errorCode = info.errorCode
		SQLexecute = await pool.query(`SELECT ReportError(${ssID}, '${error}', ${errorCode});`)
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.get('/SeeComputerHistory/:comID', async (req, res) => {
	try {
		SQLexecute = await pool.query(`SELECT * FROM SeeComputerHistory('${req.params.comID}');`)
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.post('/Fix', async (req, res) => {
	try {
		info = req.body
		staID = info.staff_id
		comID = info.computer_id
		bug = info.bug_description
		cost = info.cost
		SQLexecute = await pool.query(`SELECT FixBrokenComputer('${comID}', '${staID}', ${cost}, '${bug}');`)
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})

app.post('/Summary', async (req, res) => {
	try {
		info = req.body
		start = info.start + ' 00:00:00'
		end = info.end + ' 23:59:59'
		SQLexecute1 = await pool.query(
			`SELECT SUM(amount) AS "RSUM" FROM recharge WHERE recharge_time BETWEEN '${start}' AND '${end}';`,
		)
		SQLexecute2 = await pool.query(
			`SELECT SUM(AGE(logout_time, login_time)) AS "TimeSUM" from session where login_time BETWEEN '${start}' and '${end}';`,
		)
		SQLexecute3 = await pool.query(
			`SELECT SUM(total) AS "SVSUM" FROM service_ticket WHERE purchase_time BETWEEN '${start}' and '${end}';`,
		)
		SQLexecute4 = await pool.query(
			`SELECT SUM(cost) AS "CSUM" FROM fix WHERE fix_date BETWEEN '${start}' and '${end}';`,
		)
    SQLexecute5 = await pool.query(`SELECT * FROM SummaryRechargeByDate('${start}', '${end}');`);
		res.json([
      SQLexecute1.rows[0]["RSUM"],
      SQLexecute2.rows[0]["TimeSUM"],
      SQLexecute3.rows[0]["SVSUM"],
      SQLexecute4.rows[0]["CSUM"],
      SQLexecute5.rows,
    ]);
	} catch (err) {
		console.log(err.message)
	}
})
