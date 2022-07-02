const express = require('express')
const app = express()
const pool = require('./db')
const cors = require('cors')

app.use(express.json())

app.listen(5000, () => {
	console.log('server has started on port 5000')
})

app.post('/createAccount', async (req, res) => {
	try {
		info = req.body
		uid = info.userID
		uname = info.username
		pwd = info.password
		SQLexecute = await pool.query(`SELECT CreateAccount('${uid}', '${uname}', '${pwd}')`)
		res.json(SQLexecute.rows)
	} catch (err) {
		console.log(err.message)
	}
})
