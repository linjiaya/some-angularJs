var app = angular.module('someangularjs');
app.controller('directivePart2Ctrl',controller);
function controller($scope) {
  console.log('123');
  $scope.loadData = function(){
    console.log('数据加载中...222');
  }
  $scope.loadData();
}
// 指令之间的调用
app.directive('superman',function(){
  return {
    scope:{},
    restrict: 'AE',
    controller:function($scope){
      $scope.ability = [];
      this.addStronger = function(){
        $scope.ability.push('stronger');
      }
      this.addLight = function(){
        $scope.ability.push('light');
      }
      this.addPower = function(){
        $scope.ability.push('power');
      }
    },
    link:function(scope,elements,attrs){
      elements.addClass('btn btn-primary');
      elements.bind('click',function(){
        console.log(scope.ability);
      })
    }
  }
})

app.directive('stronger',function(){
  return {
    require:'^superman',
    link:function(scope,elements,attrs,parentCtrl){
      parentCtrl.addStronger();
    } 
  }
})

app.directive('light',function(){
  return {
    require:'^superman',
    link:function(scope,elements,attrs,parentCtrl){
      parentCtrl.addLight();
    } 
  }
})

app.directive('power',function(){
  return {
    require:'^superman',
    link:function(scope,elements,attrs,parentCtrl){
      parentCtrl.addPower();
    } 
  }
})