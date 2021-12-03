var mysql=require("mysql2");

module.exports=mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "Password1!",
    database: "fitapi"
});
