let mysql = require('mysql');

let db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'',
  database: 'quizz' 
  
})

db.connect()

module.exports = db