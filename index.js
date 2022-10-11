require('dotenv').config();
const { request, response } = require('express');
//引入express
const express = require('express');
//建立web server物件
const app = express();


//註冊樣版引擎
app.set('view engine', 'ejs');

//設定路由
app.get('/',(req,res)=>{
    // res.send(`<span>找我幹嘛</span>`);
    res.render('main',{name:'Eliot'});
})

app.get('/sales-json',(req,res)=>{
    const sales = require(__dirname + '/data/sales');
    console.log(sales);
    res.render(`sales-json`,{sales})
})

app.get('/json-test',(req,res)=>{
    res.json({name:'Eliot',age:25});
})
//取得queryString資料
app.get('/try-qs',(req,res)=>{
    res.json(req.query);
})

//取得POST資料
const urlencodedParser = express.urlencoded({extends:false});
app.post('/try-post',urlencodedParser,(req,res)=>{
    res.json(req.body);
})


app.use(express.static('public'));
//連接bootstrap路徑
app.use(express.static('node_modules/bootstrap/dist'));


app.use((req,res)=>{
//    res.type('text/plain');//類型為純文字
   res.status(404).render('404')
})
const port = process.env.SERVER_PORT || 3002;
//server偵聽
app.listen(port,()=>{
    console.log(`server started port:${port}`);
})