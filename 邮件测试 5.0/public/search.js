// 点击确定的时候，获取模态框的值，发送请求，获取数据文件夹
    $('#search').on('click', function() {

        var data = {}
        data.title = $('#searchTitle').val()
        data.time = $('#searchTime').val()
        console.log(data.time)

        $.post('/search', data, function(res) {

if(res.code == 'success'){
    console.log(res)
    if(res.data == ""){
            $('#showSearch').remove()
            $('<div id="showSearch" class="box box-info"></div>').appendTo($('#content'))
            $('#showSearch').text('没有找到这个邮件')
            return;
        }
            $('#showSearch').remove()
            $('<div id="showSearch" class="box box-info"></div>').appendTo($('#content'))

            for (var i = 0; i < res.data.length; i++) {
                $('<h4></h4>').append($('<p></p>')).appendTo($('#showSearch')).html(res.data[i].title)
                $('<p></p>').appendTo($('#showSearch')).html("收件人地址：" + res.data[i].email)
                $('<p></p>').appendTo($('#showSearch')).html("时间：" + res.data[i].time.substr(0, 10))
                $('<p></p>').appendTo($('#showSearch')).html("内容：" + res.data[i].zhengWen)
                $('<hr>').appendTo($('#showSearch'))
            }
}else{
    $('#showSearch').remove()
            $('<div id="showSearch" class="box box-info"></div>').appendTo($('#content'))
            $('#showSearch').text('抱歉，未找到')
}

        })
    })