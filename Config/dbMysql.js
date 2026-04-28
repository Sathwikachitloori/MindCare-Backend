import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Milky@123",
  database: "mental_health",
});

db.connect((err) => {
  if (err) {
    console.log("MySQL Error:", err);
  } else {
    console.log("MySQL Connected");
  }
});

export default db;