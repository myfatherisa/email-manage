
// 页面加载获取cookie 并返回页面
var username = $.cookie('username')
console.log(username)
$('#username_side').text(username)
$('#username_top').text(username)
$('#username_hide').text(username)

$('#exit').click(function(){
    location.href = 'index.html'
    $.post('/signout',null,function(res){       
            location.href = 'index.html'
    })
})

$('.treeview').click(function(){
    $('.treeview').removeClass('active')
    $(this).addClass('active')
})

function loadFrame(obj){  
    var url = obj.contentWindow.location.href;  
    // console.log(url) 
    if(url == "http://127.0.0.1:3000/chengzhi.html" || url == "http://localhost:3000/chengzhi.html"){
        $('.treeview').removeClass('active')
        $('#shouYe').addClass('active')
    } 
} 

$('.user-image').attr('src','userPhoto/' + username + '.jpg')
$('.img-circle').attr('src','userPhoto/' + username + '.jpg')
// $.post('/home',function(res){})