let mysql = require('mysql');

let db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'',
  database: 'node3'  
})

db.connect()

module.exports = db