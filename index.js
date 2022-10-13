require('dotenv').config();
const { request, response } = require('express');
//引入express
const express = require('express');
// const multer = require('multer');
// const upload = multer({dest:'tmp_uploads/'});
const upload = require(__dirname +'/modules/upload-img');
const fs = require('fs').promises;
//建立web server物件
const app = express();


//註冊樣版引擎
app.set('view engine', 'ejs');

//top level middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());


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
app.post('/try-post',(req,res)=>{
    res.json(req.body);
})
app.get('/try-post-form',(req,res)=>{
    res.render('try-post-form');
})

app.post('/try-post-form',(req,res)=>{
    res.render('try-post-form',req.body);
})

app.post('/try-upload',upload.single('avatar'), async (req,res)=>{
    res.json(req.file);
//     if(req.file && req.file.originalname ){
//        await  fs.rename(req.file.path,`public/imgs/${req.file.originalname}`);
//        res.json(req.file);
//     }else{
//         req.json({msg:'沒有上傳檔案'});
//     }
 })

app.post('/try-upload2',upload.array('photos'), async (req,res)=>{
    res.json(req.files);
 })
app.get('/my-params1/:action/:id', async (req,res)=>{
    res.json(req.params);
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