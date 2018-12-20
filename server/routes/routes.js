const express = require('express');
const router = express.Router();
var mysql = require('mysql');


// router.get('/', (req, res)=>{
//   res.send('Post works');
// })

var connection = mysql.createConnection({

  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'Schema1',
  multipleStatements: true

});

connection.connect(function(error) {
  if(!!error) {
    console.log('Error');
  } else {
    console.log('Connected')
  }
});

router.get('/', function(req, resp) {
  connection.query('SELECT * FROM mySampleTable', function(error, rows, fields){
    if(error) {
      console.log('Error in the query');
    } else {
      console.log('SUCESS! \n');
      resp.send(rows);
    }
  })
})

router.get('/employees/:id', function(req, resp) {
  connection.query('SELECT * FROM mySampleTable WHERE EmpID = ?',[req.params.id], function(error, rows, fields){
    if(error) {
      console.log('Error in the query');
    } else {
      console.log('SUCESS! \n');
      resp.send(rows);
    }
  })
})

//Delete
router.delete('/employees/:id', function(req, resp) {
  connection.query('DELETE FROM mySampleTable WHERE EmpID = ?',[req.params.id], function(error, rows, fields){
    if(error) {
      console.log('Error in the query');
    } else {
      resp.send('Deleted successfully');
    }
  })
})

//Insert
router.post('/employees', function(req, resp) {
  let emp = req.body;
  var sql = "SET @EmpID = ?;SET @Name = ?;SET @Address = ?;SET @PhoneNumber = ?;SET @Email = ?; \
  CALL EmployeeAddOrEdit(@EmpID,@Name,@Address,@PhoneNumber,@Email);"
  connection.query(sql,[emp.EmpID,emp.Name,emp.Address,emp.PhoneNumber,emp.Email], function(error, rows, fields){
    if(error) {
      console.log(error);
    } else {
      rows.forEach(element => {
        if(element.constructor == Array)
        resp.send('inserted employee id : '+element[0].EmpID);
      })
    }
  })
})

//put
router.put('/employees', function(req, resp) {
  let emp = req.body;
  var sql = "SET @EmpID = ?;SET @Name = ?;SET @Address = ?;SET @PhoneNumber = ?;SET @Email = ?; \
  CALL EmployeeAddOrEdit(@EmpID,@Name,@Address,@PhoneNumber,@Email);"
  connection.query(sql,[emp.EmpID,emp.Name,emp.Address,emp.PhoneNumber,emp.Email], function(error, rows, fields){
    if(error) {
      console.log(error);
    } else {
      resp.send('Updated successfully');
    }
  })
})

module.exports = router;
