        var app = angular.module('app', []);
        app.factory('userFactory', function() { //userfactory is singular on purpose
            var factory = {};
            var users = [
                {name: 'Joe', age: 23},
                {name: 'Moe', age: 33},
                {name: 'Shmoe', age: 44},
                {name: 'Blow', age: 55},
            ];
            factory.getUsers = function(callback){
                callback(users);
            };
            return factory;
        });
        app.controller('usersController', ['$scope', 'userFactory', function($scope, userFactory) {

            userFactory.getUsers(function(data) {
                $scope.users = data;
            });
            
        }]);
//hits factory, hits controller, gets users, back to factory(call to db), data is sent back to controller, displays users
//factory should be the only place that you make permanent changes (factory is global)