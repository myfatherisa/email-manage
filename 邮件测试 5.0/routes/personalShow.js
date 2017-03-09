var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var fs = require('fs')
var multer = require('multer')

var router = express.Router();

// 个人信息——————展示
router.post('/personalShow',function(req,res){
    function send(code,message){
        res.status(200).json({code,message})
    }
    var fileName = `user/${req.cookies.username}.txt`;
    fs.readFile(fileName,function(err,data){
        if(err){
            send('file error','抱歉系统错误')
        }else{
            send('success',JSON.parse(data))
        }
    })
})

module.exports = router