 $('#resign').click(function(){
    location.href = 'index.html'
  })

   var app = angular.module('myApp',[])
   app.controller('myController',function($scope){
     $scope.user = '';
     $scope.password = '';
   })

   $('form').submit(function(event){
      event.preventDefault()
      var formData = $(this).serialize()
      $.post('/login',formData,function(res){
         if(res.code == 'success'){
            $('#xingXi').text('登录成功')
            $('.modal').modal('show')
            setTimeout(function(){
              location.href = 'home.html'
            },2000)
         }

         if(res.code == 'notPassword'){
           $('#xingXi').text('密码错误')
           $('.modal').modal('show')
         }
         
         if(res.code == 'notRegister'){
           $('#xingXi').text('用户名还未注册')
           $('.modal').modal('show')
         }
      })
   })