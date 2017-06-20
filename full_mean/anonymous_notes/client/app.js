var app = angular.module("app", ["ngRoute"]);
app.factory("noteFactory", function ($http) {

    var factory = {};
    factory.notes = [];

    factory.index = function (callback) {
        $http.get("/api").then(function (response) {
            factory.notes = response.data.notes;
            callback(factory.notes);
        });
    };
    
    factory.createNote = function (note, callback) {
        $http.post("/api/note", note).then(function (response) {
            factory.index(callback);
        });
    };

    return factory;
});

app.controller("notesController", function ($scope, noteFactory) {

    function setNotes(data) {
        $scope.notes = data;
        $scope.note = {};
    }

    $scope.note = {};
    $scope.notes = [];

    $scope.index = function () {
        noteFactory.index(setNotes);
    }

    $scope.index();

    $scope.createNote = function () {
        noteFactory.createNote($scope.note, setNotes);
    }
});

app.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "partial.html",
        controller: 'notesController'
    })
    .otherwise({ redirectTo: "/" });
});