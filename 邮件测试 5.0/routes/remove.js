var express = require('express');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var fs = require('fs')

var router = express.Router();

// 删除——————移动文件
// 1.获取要移动文件的绝对路径
// 2.遍历原路径名，将邮件名分开 letters已知 用户名cookies获得 字符串剪切得到文件名
// 3.在remove文件夹下判断是否有该用户的文件夹，如果没有就创建
// 4.文件移动(移动的第二个参数中，其路径名必须是真实存在的，这个方法 并不能创建文件夹)
router.post('/remove',function(req,res){
    var username = req.cookies.username
    fs.exists('remove/' + username,function(exists){
        if(exists){
            removeFile()
        }else{
            fs.mkdir('remove/' + username,function(err){
                if(err){
                    res.status(200).json('err')
                }else{
                    removeFile()
                }
            })
        }
    })
    function removeFile(){
        var removeName = req.body.fileName.substring(8,req.body.fileName.length)
        fs.rename(req.body.fileName,'remove/' + removeName,function(err){
            if(err){
                res.status(200).json('err')
            }else{
                res.status(200).json('success')
            }
        })
    }
})

module.exports = router