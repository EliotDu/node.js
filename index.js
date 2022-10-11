//引入express
const express = require('express');
//建立web server物件
const app = express();
//設定路由
app.get('/',(req,res)=>{
    res.send(`<span>找我幹嘛</span>`);
})
//server偵聽
app.listen(3000,()=>{
    console.log('server started');
})