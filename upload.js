const multer= require('multer')
const path= require('node:path')

const storage=multer.diskStorage({
   destination:path.join(__dirname,"uploads"),
   filename: (req, file, res) => {
    res(null, Date.now() + "-" + file.originalname)
   }
})

const fileFilterConfig=(req,file,callback)=>{
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ||file.mimetype === 'image/jpg' ){
        callback(null,true)
    }else{
        callback(null,false)
    }
}
const upload=multer({
    storage:storage,
    limits:1024*1024*10,
    fileFilter:fileFilterConfig
})

module.exports=upload