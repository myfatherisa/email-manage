var express = require('express');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var fs = require('fs')

var router = express.Router();

// 发邮件 1.接收经过验证的信息
// 2.通过cookie获取用户名; 创建时间
// 3.确认用户存放邮件的文件夹是否存在，如果没有则创建
// 4.保存邮件 邮件名：标题+时间 ; 内容：用户名、标题、时间、正文
// 5.返回数据 成功或失败
router.post('/write',function(req,res){
    // 获取用户名
    var username = req.cookies.username
    console.log(username)
    // 回复数据
    function send(code,message){
        res.status(200).json({code,message})
    }

    // 确认邮件时间
    req.body.time = new Date()
    var year = req.body.time.getFullYear()
    var month = req.body.time.getMonth() + 1
    var day = req.body.time.getDate()
    var hour = req.body.time.getHours()
    var minute = req.body.time.getMinutes()
    var second = req.body.time.getSeconds()
    if(month < 10){
        month = '0' + month
    }
    if(day < 10){
        day = '0' + day
    }

    // 保存邮件
    function saveFile(){
        var fileName = 'letters/' + username + '/' + req.body.title + '&&' + year + month + day + hour + minute + second + '.txt';
        req.body.fileName = fileName
        fs.appendFile(fileName,JSON.stringify(req.body),err=>{
            if(err){
                send('file error','抱歉系统错误......')
            }else{
                send('success','邮件已发送')
            }
        })
    }

    // 测试用户邮件文件夹是否存在
    fs.exists('letters/' + username,exists=>{
        if(exists){
            saveFile()
        }else{
            // 如果不存在，就创建
            fs.mkdir('letters/' + username,err=>{
                if(err){
                    send('file error','抱歉，系统错误')
                }else{
                    saveFile()
                }
            })
        }
    })
})

module.exports = router