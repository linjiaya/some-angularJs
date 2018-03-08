var app = angular.module('someangularjs');
app.directive('loader',function(){
  return {
    restrict: 'AE',
    link:function(scope,element,attrs){
      // 给元素绑定事件
      element.bind('mouseenter',function(event){
        // scope.loadData();
        scope.$apply('loadData()');
      })
    }
  }
})