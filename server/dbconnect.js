const mysql = require ('mysql2')

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password :"*data989Base#",
    database:"task"
})

connection.connect((error) => {
    if (error)
        console.log("not connected")
    else
        console.log("connected........!")
})

module.exports = connection;