const Pool = require('pg').Pool

const pool = new Pool({
	user: 'nadmin',
	password: '123456',
	host: 'localhost',
	port: 5432,
	database: 'netmanager',
})

module.exports = pool
