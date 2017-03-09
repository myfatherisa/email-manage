
// 表单提交
$('form').submit(function(event){
    event.preventDefault()
    // 判断邮箱
    var patrn = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
    if(!patrn.exec($('#inputEmail3').val())){
        $('#zhuangTai').text('错误');
        $('#xingXi').text('请正确填写邮箱');
        $('#myModal').modal('show');
        console.log('fae')
        return;
    }
    // 判断标题
    if($('#title').val() == ""){
        $('#zhuangTai').text('错误');
        $('#xingXi').text('标题不能为空');
        $('#myModal').modal('show');
        console.log('fat')
        return;
    }
    // 发送邮件数据
    var formData = $(this).serialize()
    $.post('/write',formData,function(res){
        console.log(res)
        $('#zhuangTai').text(res.code);
        $('#xingXi').text(res.message);
        $('#myModal').modal('show');

        setTimeout(function(){
            location.href = 'chengzhi.html'
        },3000)
    })
})
var date = new Date
var hour = date.getHours()
var minute = date.getMinutes()
var second = date.getSeconds()