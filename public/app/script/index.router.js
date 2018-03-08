var app = angular.module('someangularjs');
app.config(($locationProvider,$stateProvider,$urlRouterProvider) => {
  $stateProvider.state('index',{
    'url':'/index',
    'views':{
      '':{
        templateUrl:'app/main/main.html'
      },
      'top@index':{
        templateUrl:'app/template/top.html'
      },
      'home@index':{
        templateUrl:'app/template/home.html'
      }
    }
  })
  /*三级路由*/
  .state('index.three_level_route',{
    url:'/three_level_route',
    // 全覆盖这个home.html文件内容
    views:{
      'home@index':{
        templateUrl:'app/three_level_route/index.html',
      }
    }
    // 往带有ui-view的div中插入模版
    // templateUrl:'app/three_level_route/index.html'
  })
  .state('index.three_level_route.part1',{
    url:'/part1',
    // 往带有ui-view的div中插入模版
    templateUrl:'app/three_level_route/part1.html'
  })

  /*二级路由*/
  .state('index.directivePart1',{
    url:'/directivePart1',
    // 全覆盖这个home.html文件内容
    views:{
      'home@index':{
        templateUrl:'app/directivePart/part1.html',
        controller: 'directivePart1Ctrl'
      }
    }
  })
  .state('index.directivePart2',{
    url:'/directivePart2',
    views:{
      'home@index':{
        templateUrl:'app/directivePart/part2.html',
        controller: 'directivePart2Ctrl'
      }
    }
  })
  .state('index.directivePart3',{
    url:'/directivePart3',
    views:{
      'home@index':{
        templateUrl:'app/directivePart/part3.html',
        controller: 'directivePart3Ctrl'
      }
    }
  })
  .state('index.directivePart4',{
    url:'/directivePart4',
    views:{
      'home@index':{
        templateUrl:'app/directivePart/part4.html',
        controller: 'directivePart4Ctrl'
      }
    }
  })
  .state('index.directivePart5',{
    url:'/directivePart5',
    views:{
      'home@index':{
        templateUrl:'app/directivePart/part5.html',
        controller: 'directivePart5Ctrl'
      }
    }
  })

  $locationProvider.hashPrefix('');
  $urlRouterProvider.otherwise('/index');
})