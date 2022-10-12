const multer= require('multer');
const {v4:uuidv4}= require('uuid');

const extMap = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
};

const fileFilter =(req,file,callback)=>{
    callback(null,!!extMap[file.mimetype])
}

const storage =multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null,__dirname + '/../public/uploads');
    },
    filename:(req,file,callback)=>{
        const ext  = extMap[file.mimetype]
        //錯誤先行的概念，如果沒有要除錯第一個參數可給空值
        callback(null,uuidv4()+ext)
    }
})

module.exports = multer({storage,fileFilter});