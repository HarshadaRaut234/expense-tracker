const mysql = require('mysql2');
require('dotenv').config();

console.log('DB USER:', process.env.DB_USER);
console.log('DB PASSWORD:', process.env.DB_PASSWORD);

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('DB connection failed:', err);
  } else {
    console.log('Connected to MySQL DB');
  }
});

module.exports = db;
