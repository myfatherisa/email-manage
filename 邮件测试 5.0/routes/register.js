var express = require('express');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var fs = require('fs')

var router = express.Router();

// 注册
router.post('/register',function(req,res){
	var username = req.body.user;
      var password = req.body.password;

      function send(code,message){
      res.status(200).json({code,message})}

      function saveFile(){
         // ``js中新增字符串替换方法利用${}来进行替换
         var fileName = `user/${req.body.user}.txt`
         // var fileName ='users/' + req.body.petname + '.txt'
         fs.exists(fileName,exists=>{
            if(exists){
               send('register','用户名已经注册过了')
            }else{
            fs.appendFile(fileName,JSON.stringify(req.body),(err)=>{
               if(err){
                  send('file error','抱歉 系统错误')
                  }else{
                  send('success','恭喜,注册成功')
                  }
            })
            }               
        })
    }
   fs.exists('user',exists=>{
      //  回调函数包含一个参数exists true则文件存在 否则是false
      if(exists){
         saveFile()
      }
      else{
         // mkdir创建文件夹 第一个参数文件名 第二个参数 回调函数
         fs.mkdir('user',err=>{
            if(err){
               send('file error','抱歉，系统错误')
            }
            else{
               saveFile()
            }
         })
      }
   })
})

module.exports = router