
// 显示所有邮件 并添加删除、查看按钮
// 在此处对此功能进行封装，以便显示所有邮件使用
// 页面加载时 应自动调用一次
// 点击显示全部的按钮时 还需调用
$('#searchAll_button').click(function(){
    showAll()
})
showAll()
function showAll(){
    $('#showAll').children().remove()
$.post('/show', function(res) {
        console.log("客户端数据")
        console.log(res.data)

        if(res.data == ""){
            $('#zhuangTai').text('邮件箱是空的');
            $('#xingXi').text('试着写点什么吧');
            $('#rename').css({'display':'none'})
            $('#rename').next().text('确定')
            $('#myModal').modal('show');
        }


        for (var i = 0; i < res.data.length; i++) {
            $('div').removeClass('addSearch')
            $('<div class="addSearch"></div>').appendTo($('#showAll'))
            $('<h4></h4>').append($('<p></p>')).appendTo($('.addSearch')).html(res.data[i].title)
            $('<span></span>').append($('<p></p>')).appendTo($('.addSearch')).html(res.data[i].time.substr(0, 10) + "&#x3000")
            $('<span></span>').append($('<p></p>')).appendTo($('.addSearch')).html(res.data[i].email)
            $('<button class="zhanShi btn btn-info pull-right">展示</button>').appendTo($('.addSearch'))
            $('<span style="display:none"></span>').appendTo($('.addSearch')).html(res.data[i].zhengWen)
            $('<button class="shanChu btn btn-danger pull-right">删除</button>').appendTo($('.addSearch'))
            $('<span style="display:none"></span>').appendTo($('.addSearch')).html(res.data[i].fileName)
        }

        $('.zhanShi').click(function(){
            $('#zhuangTai').text('正文内容');
            $('#xingXi').text($(this).next().text());
            $('#rename').css({'display':'none'})
            $('#rename').next().text('确定')
            $('#myModal').modal('show');
        })


        // $('.shanChu').on('click', function() {
        //     confirm("确定删除？")
        //     if (confirm()) {
        //         $(this).parent().remove()
        //         var del = $(this).next().text()
        //         console.log(del)
        //         $.ajax({
        //             method: "POST",
        //             url: '/dell',
        //             data: {
        //                 fileName: del
        //             }
        //         })

        //     }

        // })

        // 删除————模态框弹出
        $('.shanChu').click(function(){
            $('#zhuangTai').text('删除');
            $('#xingXi').text('确定将邮件扔入回收站吗？');
            $('#rename').css({'display':'inline-block'})
            $('#rename').next().text('取消')
            $(this).addClass('shan')
            $('#myModal').modal('show');
        })

        // 删除————确定
        $('#rename').click(function(){           
            var del = $('.shan').next().text()
            console.log(del)
            $.ajax({
                    method: "POST",
                    url: '/remove',
                    data: {
                        fileName: del
                    }
                })
            $('.shan').parent().remove()

        })

        // 删除————取消
        $('#rename').next().click(function(){
             $('.shanChu').removeClass('shan')
        })
       
    })
}

    // 查询
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
            $('<div id="showSearch" class="box box-info"></div>').appendTo($('#showAll'))
            $('#showSearch').text('没有找到这个邮件')
            return;
        }
            // $('#showSearch').remove()
            
            // $('<div id="showSearch" class="box box-info"></div>').appendTo($('#content'))
            $('#showAll').children().remove()
            for (var i = 0; i < res.data.length; i++) {
            $('div').removeClass('addSearch')
            $('<div class="addSearch"></div>').appendTo($('#showAll'))
            $('<h4></h4>').append($('<p></p>')).appendTo($('.addSearch')).html(res.data[i].title)
            $('<span></span>').append($('<p></p>')).appendTo($('.addSearch')).html(res.data[i].time.substr(0, 10) + "&#x3000")
            $('<span></span>').append($('<p></p>')).appendTo($('.addSearch')).html(res.data[i].email)
            $('<button class="zhanShi btn btn-info pull-right">展示</button>').appendTo($('.addSearch'))
            $('<span style="display:none"></span>').appendTo($('.addSearch')).html(res.data[i].zhengWen)
            $('<button class="shanChu btn btn-danger pull-right">删除</button>').appendTo($('.addSearch'))
            $('<span style="display:none"></span>').appendTo($('.addSearch')).html(res.data[i].fileName)
        }
           
}else{
    $('#showSearch').remove()
            $('<div id="showSearch" class="box box-info"></div>').appendTo($('#content'))
            $('#showSearch').text('抱歉，未找到')
}

        })
    })