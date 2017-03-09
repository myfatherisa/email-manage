$('#login').click(function(){
    location.href = 'login.html'
  })

  $('form').submit(function(event){
      event.preventDefault()
      console.log('x')
      var password = document.getElementById('password')
      var confirm = document.getElementById('confirm')
      var formData = $(this).serialize()
      if(password.value != confirm.value){
        console.log(password.value)
        console.log(confirm.value)
         $('#xingXi').text('两次密码不一致')
         $('.modal').modal('show')
         return;
      }
        
      $.post('/register',formData,function(res){
         if(res.code == 'success'){
            $('#xingXi').text('注册成功')
            $('.modal').modal('show')
            setTimeout(function(){
               location.href = "login.html"
            },2000)
         }else{
            $('#xingXi').text('用户名已注册')
            $('.modal').modal('show')
         }
      })
  })
  
  var app = angular.module('myApp',[])
  app.controller('myController',function($scope){
    $scope.user = '';
    $scope.email = '';
    $scope.password = '';
    $scope.confirm = '';
  })
