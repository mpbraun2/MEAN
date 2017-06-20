var app = angular.module('myApp', ['ngRoute']);
// --------------------Client Routes----------------
app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/messageBoard.html',
        controller: 'MessagesController'
    })
        .otherwise({ redirectTo: '/' });
});