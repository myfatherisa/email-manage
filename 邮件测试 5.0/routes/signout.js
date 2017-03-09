var express = require('express');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var fs = require('fs')

var router = express.Router();

// 登出
router.post('/signout',(req,res)=>{
    // 删除coolie
    res.clearCookie('username')
})

module.exports = router