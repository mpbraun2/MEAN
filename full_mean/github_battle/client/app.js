var app = angular.module("myApp", ['ngRoute']);
app.factory('userFactory', function ($http) {
    var factory = {};
    factory.users = [];
    factory.user1 = {};
    factory.user2 = {};
    
    factory.index = function (callback) {
        $http.get("/api").then(function (response) {
            factory.users = response.data.users;
            callback(factory.users);
        });
    };

    factory.createUser1 = function (user, callback) {
        factory.user1 = user;
        factory.createUser(user, callback, 1);
    };

    factory.createUser2 = function (user, callback) {
        factory.user2 = user;
        factory.createUser(user, callback, 2);
    };

    factory.createUser = function (user, callback, number) {
        var api = "https://api.github.com/users/" + user.username; //link to the api
        console.log("api", api);
        $http.get(api).then(function (response) { //actual function to create the score
            var score = 0;
            score = score + response.data.followers;
            score = score + response.data.public_repos;
            score = score * 12;

            user.username = response.data.login;
            user.name = response.data.name;
            user.avatar_url = response.data.avatar_url;
            user.score = score;

            //set user in scope
            callback(user, number);

            //save user in mongodb for rankings
            $http.post("/api/user", user).then(function (response) {
                //factory.index(callback);
                console.log("saved", user);
            });
        })
    };

    factory.setUser1 = function (callback) {
        console.log("setUser1", factory.user1);
        callback(factory.user1, 1);
    };

    factory.setUser2 = function (callback) {
        console.log("setUser2", factory.user2);
        callback(factory.user2, 2);
    };

    return factory;
});

app.controller('usersController', function (userFactory, $scope, $location) {
    function getUsers(users) {
        //rankings
        $scope.users = users;
    }

    function setUser(user, number) { //two way binding!
        if(user && user.username){
            console.log("username", user.username);
            console.log("name", user.name);
            console.log("avatar_url", user.avatar_url);
            console.log("score", user.score);
            //after get github api then populate fields
            if (number===1) { //corresponds to user 1
                $scope.user1.username = user.username;
                $scope.user1.name = user.name;
                $scope.user1.avatar_url = user.avatar_url;
                $scope.user1.score = user.score;
            }
            else if (number===2) { //corresponds to user 2
                $scope.user2.username = user.username;
                $scope.user2.name = user.name;
                $scope.user2.avatar_url = user.avatar_url;
                $scope.user2.score = user.score;
            }
        }
    }
    
    console.log("set");
    $scope.users = [];
    $scope.user1 = {};
    $scope.user2 = {};

    userFactory.setUser1(setUser); // Since the controller drops the information with each refresh, call needs to be made to factory each time to set the data
    userFactory.setUser2(setUser);
    console.log(setUser)

    $scope.index = function () {
        userFactory.index(getUsers);
    }

    $scope.index();

    $scope.createUser1 = function () {
        userFactory.createUser1($scope.user1, setUser);
    }

    $scope.createUser2 = function () {
        userFactory.createUser2($scope.user2, setUser);
    }

    $scope.results = function () {
        console.log("results");
        $location.url('/results');
    }

    $scope.reset = function () {
        console.log("reset");
        $location.url('/reset');
    }
});

app.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "userSelection.html",
        controller: 'usersController'
    })
    .when('/results', {
        templateUrl: "userResults.html",
        controller: 'usersController'
    })
    .when('/rankings', {
        templateUrl: "userRankings.html",
        controller: 'usersController'
    })
    .otherwise({ redirectTo: "/" });
});