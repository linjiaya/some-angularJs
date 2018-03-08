var app = angular.module('someangularjs');
app.controller('directivePart5Ctrl',controller);
function controller($scope) {
  console.log(123);
  $scope.title = '标题 点击展开';
  $scope.text = '展开的内容';
  $scope.repeaters = [
    {title:'title1',text:'text1'},
    {title:'title2',text:'text2'},
    {title:'title3',text:'text3'}
  ]
}

app.directive('expand',function(){
  return {
    restrict : 'EA',
    replace : true,
    transclude : true,
    scope : {
      title : '=expanderTitle'
    },
    template:`<div>
      <div class="title" ng-click="toggle()" style="border:1px solid black;">{{title}}</div>
      <div class="body" ng-show="showMe" ng-transclude></div>
    </div>`,
    link : function (scope,element,attrs){
      scope.showMe = false;
      scope.toggle = function() {
        scope.showMe = !scope.showMe;
      }
    }
  }
});

app.directive('accordion',function(){
  return {
    restrict : 'EA',
    replace : true,
    transclude :true,
    template : '<div ng-transclude></div>',
    controller : function(){
      var expanders = [];
      this.getOpened = function(selectedExpander){
        angular.forEach(expanders,function(expander){
          if (selectedExpander != expander) {
            expander.showMe = false;
          }
        })
      };
      this.addExpander = function(expander){
        expanders.push(expander);
      }
    }
  }
})
app.directive('expander',function(){
  return {
    restrict : 'EA',
    replace : true,
    transclude : true,
    require : '^?accordion',
    scope : {
      title : '=expanderTitle'
    },
    template :`<div>
      <div class="title" ng-click="toggle()" style="background-color:gray;color:white;">{{title}}</div>
      <div class="body" ng-show="showMe" ng-transclude></div>
    </div>`,
    link: function(scope,element,attrs,accordionCtrl){
      console.log('scope',scope)
      // scope.showMe = false;
      accordionCtrl.addExpander(scope);
      scope.toggle = function (){
        scope.showMe = !scope.showMe;
        accordionCtrl.getOpened(scope);
      }
    }
  }
})