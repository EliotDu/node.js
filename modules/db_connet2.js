const mysql = require('mysql2');

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'TimeTravel',
    waitForConnections:true,
    connectionLimit:6,//最大連線數
    queueLimit:0, //排隊等待連線

})
//匯出promise pool
module.exports=pool.promise();