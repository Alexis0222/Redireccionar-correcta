const mysql = require("mysql");
module.exports=mysql.createPool({
    host:"localhost",
    user:"twister",
    password:"1234ABC%",
    database:"my_store"
    
});