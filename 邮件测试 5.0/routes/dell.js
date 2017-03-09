var express = require('express');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var fs = require('fs')

var router = express.Router();

// 删除——————删除邮件
router.post('/dell', function(req, res) {
    var removeName = req.body.fileName.substring(8,req.body.fileName.length)
    fs.unlink('remove/' + removeName, function(res) {
    })
})

module.exports = router