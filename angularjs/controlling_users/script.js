var myAppModule = angular.module('myApp', []);
      // the .controller() method adds a controller to the module
      myAppModule.controller('usersController', function ($scope){
          $scope.users = [
            {first_name: 'Jerry', last_name: 'Bonds', favorite_language: 'Ruby'}, 
            {first_name: 'Kerry', last_name: 'Fronds', favorite_language: 'Javascript'},
            {first_name: 'Barry', last_name: 'Johns', favorite_language: 'PhP'},
            {first_name: 'Jean', last_name: 'Franklin', favorite_language: 'Woo!'},
        ];
        $scope.createUser = function (){
            // add to the array
            $scope.users.push($scope.newUser);
            console.log($scope.newUser);
            // clear the form values
            $scope.newUser = {};
        };
        $scope.deleteUser = function (userToDelete){
            $scope.users = $scope.users.filter( function (user){
                return user !== userToDelete;
        })
    }
});