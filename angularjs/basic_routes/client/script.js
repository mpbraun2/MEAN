 //  inject the ngRoute dependency in the module.
    var myApp = angular.module('myApp', ['ngRoute']);
    //  use the config method to set up routing:
    myApp.config(function ($routeProvider) {
      $routeProvider
        .when('/',{
            templateUrl: 'partials/view1.html',
        })
        .when('/partial2',{
            templateUrl: 'partials/view2.html'
        })
        .otherwise({
          redirectTo: '/'
        });
    });
    //  build the controllers
    myApp.controller('view1Controller', function ($scope) {
      $scope.sports = ['golf', 'basketball', 'hockey', 'tennis', 'football'];
    });
    myApp.controller('view2Controller', function ($scope) {
      $scope.message = 'We are using another controller';
    });