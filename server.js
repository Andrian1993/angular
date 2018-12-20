var express = require('express');
const path = require('path');
var mysql = require('mysql');
var app = express();
var bodyparser = require('body-parser');

app.use(bodyparser.json());

//getting our Post routes
const routes = require('./server/routes/routes');

// Using middleware
app.use(express.static(path.join(__dirname, 'dist/ang-mysql-nodejs')));
app.use('/routes', routes);


//Catch all routes request and return it to the index
app.get('*', (req, res)=> {
  res.sendFile(path.join(__dirname, 'dist/ang-mysql-nodejs/index.html'))
})

// var connection = mysql.createConnection({
//
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'Schema1',
//   multipleStatements: true
//
// });
//
// connection.connect(function(error) {
//   if(!!error) {
//     console.log('Error');
//   } else {
//     console.log('Connected')
//   }
// });
//
// app.get('/employees', function(req, resp) {
//   connection.query('SELECT * FROM mySampleTable', function(error, rows, fields){
//     if(error) {
//       console.log('Error in the query');
//     } else {
//       console.log('SUCESS! \n');
//       resp.send(rows);
//     }
//   })
// })
//
// app.get('/employees/:id', function(req, resp) {
//   connection.query('SELECT * FROM mySampleTable WHERE EmpID = ?',[req.params.id], function(error, rows, fields){
//     if(error) {
//       console.log('Error in the query');
//     } else {
//       console.log('SUCESS! \n');
//       resp.send(rows);
//     }
//   })
// })
//
// //Delete
// app.delete('/employees/:id', function(req, resp) {
//   connection.query('DELETE FROM mySampleTable WHERE EmpID = ?',[req.params.id], function(error, rows, fields){
//     if(error) {
//       console.log('Error in the query');
//     } else {
//       resp.send('Deleted successfully');
//     }
//   })
// })
//
// //Insert
// app.post('/employees', function(req, resp) {
//   let emp = req.body;
//   var sql = "SET @EmpID = ?;SET @Name = ?;SET @Address = ?;SET @PhoneNumber = ?;SET @Email = ?; \
//   CALL EmployeeAddOrEdit(@EmpID,@Name,@Address,@PhoneNumber,@Email);"
//   connection.query(sql,[emp.EmpID,emp.Name,emp.Address,emp.PhoneNumber,emp.Email], function(error, rows, fields){
//     if(error) {
//       console.log(error);
//     } else {
//       rows.forEach(element => {
//         if(element.constructor == Array)
//         resp.send('inserted employee id : '+element[0].EmpID);
//       })
//     }
//   })
// })
//
// //put
// app.put('/employees', function(req, resp) {
//   let emp = req.body;
//   var sql = "SET @EmpID = ?;SET @Name = ?;SET @Address = ?;SET @PhoneNumber = ?;SET @Email = ?; \
//   CALL EmployeeAddOrEdit(@EmpID,@Name,@Address,@PhoneNumber,@Email);"
//   connection.query(sql,[emp.EmpID,emp.Name,emp.Address,emp.PhoneNumber,emp.Email], function(error, rows, fields){
//     if(error) {
//       console.log(error);
//     } else {
//       resp.send('Updated successfully');
//     }
//   })
// })

const port = process.env.PORT || 4600;

app.listen(port, (req, res)=>{
  console.log(`RUNNING on port ${port}`);
});
