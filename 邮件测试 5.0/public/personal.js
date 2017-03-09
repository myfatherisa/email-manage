
// 与服务器相连的应该有两个接口 一个用于显示用户数据 在页面加载时响应; 另一个 用于发送用户更新后的信息。流程：页面加载，发送请求获取用户已知信息，展示在网页上。用户修改，发送请求，将内容重新覆盖。用户名不可修改。

// 历史记录回退
$('#historyBack').click(function(event){
    event.preventDefault()
    history.back()
})

// 个人信息显示
$.post('/personalShow',null,function(res){
    var username = $.cookie('username')
    console.log(res.message.password)
    $('#inputUsername').val(username)
    $('#inputUseremail').val(username + '@youxiang.com')
    $('#inputUserPassword').val(res.message.password)
    $('#inputUserRePassword').val(res.message.confirm)
    $('#inputUserAge').val(res.message.age)
    $('#inputUserAddress').val(res.message.address)
    $('#inputUserPhone').val(res.message.phone)
    $('#inputUserPrepare').val(res.message.prepare)
    $('#inputUserBeizhu').val(res.message.beiZhu)
    if(res.message.sex == "女"){
        $('#woman').attr('checked','checked')
    }else{
        $('#man').attr('checked','checked')
    }
    $('#form_touxiang').attr('src','userPhoto/' + username + '.jpg')
})

// 单选按钮启动模块
layui.use('form', function(){
  var form = layui.form(); //只有执行了这一步，部分表单元素才会修饰成功
  var layer = layui.layer
  var layedit = layui.layedit
  var laydate = layui.laydate;
  //……
});

// 头像上传设置
$('.form-group img').click(function(){
    $(this).next().click()
})
$('input[type="file"]').change(function(event){
    var input = event.originalEvent.target;
    var fileList = input.files;
    var file = fileList[0];
    if(file.type.startsWith('image')){
        $(this).prev().attr('src',URL.createObjectURL(file));
    }else{
        $('#zhuangTai').text('错误');
        $('#xingXi').text('请选择一张图片');
        $('#myModal').modal('show');
    }
})

// 个人信息提交
$('form').submit(function(event){
    event.preventDefault();
    if($('#inputUserPassword').val() != $('#inputUserRePassword').val()){
        $('#zhuangTai').text('错误');
        $('#xingXi').text('两次密码不一致');
        $('#myModal').modal('show');
        return;
    }
    var data = new FormData(this);
    $.ajax({
        method:'POST',
        url:'/personalSend',
        data:data,
        contentType:false,//默认application
        cache:false,//是否允许是有缓存数据
        processData:false, 
        success:function(res){
            if(res.code == 'success'){
                $('#zhuangTai').text('成功');
                $('#xingXi').text('修改完成');
                $('#myModal').modal('show');
                setTimeout(function(){
                    location.href = 'chengzhi.html'
                },3000)
            }else{
                $('#zhuangTai').text('错误');
                $('#xingXi').text('系统错误');
                $('#myModal').modal('show');
            }
        }
    })
})