//contains the factories and controllers. 
var app = angular.module('myApp', ['ngRoute', 'ngCookies', 'ngMessages']); //ensure that routes, cookies, and messages are included.

//factories
app.factory('usersFactory', ['$http', function ($http) {
    var usersFactory = function () {
        this.login = function (data, callback, errback) {
            $http.post('/login', data).then(callback, errback); //error handler
        }
        this.index = function (callback) {
            $http.get('/users').then(callback);
        }
        this.register = function (data, callback, errback) {
            console.log(data); //creates an object
            $http.post('/register', data).then(callback, errback);
            console.log(data);
        }

    }
    return new usersFactory;
}]);
//controllers (with functions past into scope ie register and login)
app.controller('loginController', ['$scope', 'usersFactory', function ($scope, userFact) {

    $scope.register = function () {

        userFact.register($scope.registration, function (data) {
            if (data.data.errors) {
                $scope.errors = data.data.errors;
            }
            else {
                $scope.user = data.data;
            }
        }, function (err) {
            console.log("I am an error", err);
        })
    }
    $scope.login = function () {
        userFact.login(
            $scope.userLogin,
            function (data) {
                if (data.data.errors) {
                    $scope.errors = data.data.errors;
                }
                else {
                    $scope.user = data.data;
                }
            },
            function (err) {
                console.log("I am an error", err);
            });
    }
}]);