const express = require('express')
const mysql = require("mysql2")
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
let connection = require('./dbconnect')

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/getdata", (req, res) => {
    const sql = "select * from task5"
    connection.query(sql, (err, result) => {
        res.send(result)
    })
})

app.post("/update", (req, res) => {
    let { id, name, department, company, location, salary } = req.body
    // let image = req.file.location
    let { ...data } = { id, name, department, company, location, salary }
    let sqlQuery = "insert into task5 SET ? "
    connection.query(sqlQuery, data, (error, result) => {
        if (error)
            res.send(error)
        else
            res.send(result)
    })
})
 //// for delete employee in manager /////
app.delete("/delete/:id", (req, res) => {
    let eid= req.params.id   
    let sqlQuery = "DELETE from task5 WHERE id = ?"
    connection.query(sqlQuery,  eid, function (err, result) {
        if (err)
            res.send(err)
        else
            res.send(result)
    })   
});

///   for update to get data on form by manager  /////
app.get("/getdata/:id", (req, res) => {
    const {id} = req.params;
    const sql = "select * from task5 where id = ?"
    connection.query(sql, id, (err, result) => {
        if(err){
            console.log(err)
        }
        res.send(result)
    })
})
/// update id by manager /////
app.put("/update/:id", (req, res) => {
    // let eid= req.params.id
    const {id} = req.params;
    let {name, department, company, location, salary} = req.body;
    // let data = req.body
    let sqlQuery = "UPDATE task5 SET  name = ?, department = ?, company = ?, location = ?, salary = ? WHERE id = ?"
     connection.query(sqlQuery, [name, department, company, location, salary,  id], function (err, result) {
        if (err)
            res.send(err)
        else
            res.send(result)
    })
});


/// signup page for both manager and employee ///
app.post('/signup', (req,res)=>{
    // const {fname, lname , gender, hobbies,role} = req.body;
    let data = req.body
    const sql = "INSERT INTO task5_signup SET ?"
    connection.query(sql, data, (err, result)=>{
        if(err){
            console.error('Error inserting user: ', err);
            res.status(500).send('Error inserting user');
        }else{
            console.log("user inserted")
            res.status(200).send("user registrated sccessfully")
        }
    });
});



// API route for user login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM task5_login WHERE email = ? AND password = ?';
    connection.query(query, [email, password], (err, results) => {
      if (err) {
        console.error('Error querying user: ', err);
        res.status(500).send('Error querying user');
      } else {
        if (results.length === 1) {
          const user = results[0];
          res.status(200).json({ id: user.id, role: user.role });
        } else {
          res.status(401).send('Invalid credentials');
        }
      }
    });
  });
  
  // ... (rest of the code)
  



app.listen(5000, () => {
    console.log("Server is running on port 5000..........!")
})
