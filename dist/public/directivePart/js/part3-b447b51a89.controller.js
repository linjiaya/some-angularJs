var app = angular.module('someangularjs');
app.controller('directivePart3Ctrl',controller);
function controller($scope) {
  $scope.ctrlFalvor = 'linjia';
  $scope.sayHello = function(name){
    alert('hello ' + name);
  }
}
app.directive('drink',function(){
  return {
    scope:{},
    restrict: 'AE',
    // template:'<input type="text" ng-model="falvor"/>{{falvor}}',
    template:`<input type="text" ng-model="username"/><br />
              <button ng-click="greet({uname:username})">点击试试</button>`,
    scope:{
      // falvor:'@'//字符串的形式
      //把当前属性作为字符串传递。可以绑定来自外层的scope值，在属性值中插入{{}}即可
      // falvor:'='//双向绑定
      greet:'&'//传递一个父scope函数，稍后调用
    }//这段话是代替下方link的作用，angular自动绑定的

    /*link:function(scope,element,attrs){
      scope.falvor = attrs.falvor;
    }*/
  }
})

app.directive("direct",function(){
  return{
    restrict: 'ECMA',
    template: '<div>指令中：{{ case.name }}</div>',
    scope:{
      case:'='
    }
  } 
})
app.controller("nameController",function($scope){
  $scope.data=[{name:"张三"},{name:"李四"}]; 
});