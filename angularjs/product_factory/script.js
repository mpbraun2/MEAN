var myAppModule = angular.module('myApp', []);
      // the .controller() method adds a controller to the module
      myAppModule.controller('productsController', function ($scope){
          $scope.products = [
            {name: 'Keyboard', price: '$20.99'}, 
            {name: 'Mouse', price: '$6.99'}, 
            {name: 'Monitor', price: '$69.99'}, 
            {name: 'CPU Tower', price: '$600.00'}, 
        ];
        $scope.createProduct = function (){
            // add to the array
            $scope.products.push($scope.newProduct);
            console.log($scope.newProduct);
            // clear the form values
            $scope.newProduct = {};
        };
        $scope.deleteProduct = function (productToDelete){
            $scope.products = $scope.products.filter( function (product){
                return product !== productToDelete;
        })
    }
});