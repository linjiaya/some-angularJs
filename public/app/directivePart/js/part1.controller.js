var app = angular.module('someangularjs');
app.controller('directivePart1Ctrl',controller);
function controller($scope) {
  console.log('123');
  $scope.loadData = function(){
    console.log('数据加载中...111');
  }
  $scope.loadData();
}
