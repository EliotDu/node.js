
const express = require('express');
const router = express.Router();

router.use((req,res,next)=>{
    res.locals.my=123;
    next();
    
})





router.get('/zzz/:action?/:id?',(req,res)=>{

    const {params,url,baseUrl,originalUrl} = req;

    res.json({params,url,baseUrl,originalUrl,'my':123});
});

module.exports = router;

