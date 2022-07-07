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
