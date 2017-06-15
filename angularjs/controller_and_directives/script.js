var myAppModule = angular.module('myApp', []);
      // the .controller() method adds a controller to the module
      myAppModule.controller('foodsController', function ($scope){
          $scope.foods = [
            {name: 'Pizza'}, 
            {name: 'Pasta'}, 
            {name: 'Hamburger'}, 
            {name: 'Cheeseburger'}
        ];
        $scope.addFood = function (){
            // add to the array
            $scope.foods.push($scope.newFood);
            console.log($scope.newFood);
            // clear the form values
            $scope.newFood = {};
        }
});