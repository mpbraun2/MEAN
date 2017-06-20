var app = angular.module("myApp", ['ngRoute', 'ngMessages']);

app.factory('playerFactory', function ($http) {
    var factory = {};
    factory.players = [];
    factory.index = function (callback) {
        $http.get("/api").then(function (response) {
            factory.players = response.data.players;
            callback(factory.players);
        });
    };
    factory.addPlayer = function (player, callback) {
        $http.post("/api/player", player).then(function (response) {
            factory.players = response.players;
            factory.index(callback);
        });
    };

    factory.deletePlayer = function (id, callback) {
        $http.delete("/api/delete_player/" + id).then(function (response){
           factory.index(callback);
        }, console.warn).catch(console.warn); 
        };
        
    return factory;
});





app.controller('PlayersController', function ($scope, playerFactory) {
    function getPlayers(data) {
        $scope.players = data;
        $scope.player = {};
    }
    $scope.players = [];
    $scope.player = {};

    $scope.index = function () {
        playerFactory.index(getPlayers);
    }
    $scope.index();

    $scope.addPlayer = function () {
        playerFactory.addPlayer($scope.player, getPlayers);
    }
    $scope.deletePlayer = function (id) {
        playerFactory.deletePlayer(id, getPlayers);
    }
});

app.config(function ($routeProvider) {
    $routeProvider
        .when("/list", {
            templateUrl: "list_players.html",
            controller: 'PlayersController'
        })
        .when("/addplayer", {
            templateUrl: "add_player.html",
            controller: 'PlayersController'
        })
        .when("/status/game/1", {
            templateUrl: "game1.html",
            controller: 'PlayersController'
        })
        .when("/status/game/2", {
            templateUrl: "game2.html",
            controller: 'PlayersController'
        })
        .when("/status/game/3", {
            templateUrl: "game3.html",
            controller: 'PlayersController'
        })
        .otherwise({ redirectTo: "/" });
});