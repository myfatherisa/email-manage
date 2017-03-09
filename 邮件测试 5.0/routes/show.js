var express = require('express');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var fs = require('fs')

var router = express.Router();

//  发送邮件——————全部展示
router.post('/show', function(req, res) {
    var username = req.cookies.username

    function send(code, message, data, files) {
        res.status(200).json({ code, message, data, files })

    }

    // 读取文件
    function readFile(i, files, folder, complete) {
        if (i < files.length) {
            fs.readFile('letters/' + username + '/' + files[i], function(err, data) {
                if (!err) {
                    var time = JSON.parse(data).time.substr(0, 10)
                    folder.push(JSON.parse(data))
                    readFile(++i, files, folder, complete)
                }
            })
        } else {
            complete()
        }
    }

    // 测试用户邮件文件夹是否存在
    fs.exists('letters/' + username,exists=>{
        if(exists){
            // 读取文件夹
    fs.readdir('letters/' + username, function(err, files) {
        var folder = []
        readFile(0, files, folder, function() {
            send('success', "读取成功", folder)
        })
    })
        }else{
            send('file error','邮件箱是空的')
        }
    })
})

module.exports = router