var app = angular.module('someangularjs');
app.controller('directivePart4Ctrl',controller);
function controller($scope) {
  console.log(123);
  $scope.data = '123';
}

app.directive('part4directive',function(){
  return{
    restrict: 'ECMA',
    template: '<p><span ng-transclude></span>指令中：{{data}}</p>',
    transclude:true
  } 
})
// 输入项模拟
app.directive('contenteditable',function(){
  return {
    require: 'ngModel',
    link:function(scope,element,attrs,ctrl){
      //view -> model
      element.bind('keyup',function(){
        scope.$apply(function(){
          ctrl.$setViewValue(element.text());
        });
      });

      //model -> view
      ctrl.$render = function(){
        element.html(ctrl.$viewValue);
      };

      //load init value form DOM
      ctrl.$setViewValue(element.html());
    }
  }
})