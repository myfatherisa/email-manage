
// 
$.post('/del', function(res) {
        console.log("客户端数据")
        console.log(res.data)

        if(res.data == ""){
            $('#zhuangTai').text('邮件箱是空的');
            $('#xingXi').text('试着写点什么吧');
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
            $('#myModal').modal('show');
        })


        $('.shanChu').on('click', function() {
            confirm("确定删除？")
            if (confirm()) {
                $(this).parent().remove()
                var del = $(this).next().text()
                console.log(del)
                $.ajax({
                    method: "POST",
                    url: '/dell',
                    data: {
                        fileName: del
                    }
                })

            }

        })


    })