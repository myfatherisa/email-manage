var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var fs = require('fs')
var multer = require('multer')

var router = express.Router();

// 个人信息——————修改
router.post('/personalSend',userPhoto.single('inputUserImg'),function(req,res){
    var fileName = `user/${req.cookies.username}.txt`
    fs.writeFile(fileName,JSON.stringify(req.body),function(err){
        if(err){
            res.status(200).json({code:'error',message:'上传失败'})
        }else{
            res.status(200).json({code:'success',message:'上传成功'})
        }
    })   
})

module.exports = router