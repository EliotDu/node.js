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
const session = require('express-session');
const moment = require('moment-timezone');
// const mysql = require('mysql2');
const db = require(__dirname + '/modules/db_connet2')




//註冊樣版引擎(需放在最前面)
app.set('view engine', 'ejs');

//top level middleware
app.use(session({
    //session在尚未初始化時要不要儲存
    saveUninitialized: false,
    //沒變更內容是否強制回存
    resave: false,
    //用來加密的字串
    secret:'skdjadklauEEDAK111',
    cookie:{
        //可存放時間20分鐘（1000毫秒為單位）
        maxAge:1_200_000,
    }
}))


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
 //用參數當作路徑
app.get('/my-params1/:action/:id', async (req,res)=>{
    res.json(req.params);
 })
 //用正規表達式當作路徑
app.get(/^\/m\/09\d{2}-?\d{3}-?\d{3}$/i,(req,res)=>{
   
    let u = req.url.slice(3); //從09開始顯示
    u = u.split('?')[0]; // 去掉 query string
    u = u.split('-').join('');//去掉 - 接上''
    res.json({mobile:u});
 })

const myMiddle = (req, res, next)=>{

    res.locals = {...res.locals, Eliot:'哈囉'};
    res.locals.derrrr = 567;
    // res.myPersonal = {...res.locals, shinder:'哈囉'}; // 不建議
    next();
};

app.get('/try-middle', [myMiddle],  (req, res)=>{
    res.json(res.locals);
});

app.get('/try-session',(req, res)=>{
    //初始化設定為0
   req.session.aaa ||=0;
   //更新初始值+1
   req.session.aaa++;
   res.json((req.session))
})

app.get('/try-Date',(req,res)=>{
    const fm = 'YYYY-MM-DD HH:mm:ss';
    const m =moment('07/12/96','DD/MM/YY');
    res.json({
      m,
      m1:m.format(fm),
      m2:m.tz('Europe/London').format(fm)
    });
});

app.get('/try-db',async(req,res)=>{
    const [rows] = await db.query("SELECT * FROM food_product_all LIMIT 5");
//    const [rows] = await db.query("SELECT  5");
   res.json(rows);
});





// '/admin2'=baseurl
app.use('/admin2',require(__dirname +'/routes/admin2'));

//-------------------------------------------------
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