const express = require('express')
const app = express()
const pool = require('./db')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.listen(5000, () => {
	console.log('server has started on port 5000')
})

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
		console.log(`SELECT ReportError(${ssID}, '${error}', ${errorCode});`)
		SQLexecute = await pool.query(`SELECT ReportError(${ssID}, '${error}', ${errorCode});`)
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})
