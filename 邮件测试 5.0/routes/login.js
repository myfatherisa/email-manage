var express = require('express');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var fs = require('fs')

var router = express.Router();

// 登录
router.post('/login',function(req,res){ 
   var fileName = `user/${req.body.user}.txt`

   function send(code,message){
      res.status(200).json({code,message})
   }

   fs.exists(fileName,exists=>{
      if(exists){
         // readFile读取文件 两个参数第一个为文件的路径
         // 第二个参数为回调函数 包含两个参数 第一个为error 第二个为读取的数据
         fs.readFile(fileName,(err,data)=>{
            if(err){
               send('file error','抱歉系统错误')
            }else{
               var user = JSON.parse(data)
               if(user.password == req.body.password){
                  res.cookie('username',req.body.user)
                  //  使用cookie记录用户名的值
                  send('success','登录成功')
               }else{
                  send('notPassword','密码错误')
               }
            }
         })
      }
      else{
         send('notRegister','用户名未注册')
      }
   }) 
})

module.exports = router