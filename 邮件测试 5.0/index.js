var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var fs = require('fs')
var multer = require('multer')

var app = express();

var storagec = multer.diskStorage({
    destination:'public/userPhoto',
    filename:function(req,file,cb){
        var username = req.cookies.username
        cb(null,`${username}.jpg`)
    }
})

userPhoto = multer({storage:storagec})

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}))

app.use(require('./routes/write'))
app.use(require('./routes/register'))
app.use(require('./routes/login'))
app.use(require('./routes/search'))
app.use(require('./routes/show'))
app.use(require('./routes/del'))
app.use(require('./routes/dell'))
app.use(require('./routes/signout'))
app.use(require('./routes/remove'))
app.use(require('./routes/personalSend'))
app.use(require('./routes/personalShow'))

app.listen(3000,()=>{
    console.log('服务器在3000运行了')
})