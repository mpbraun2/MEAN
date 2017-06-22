app.controller('profileController', function ($scope, dashboardFactory, $location, $cookies, $routeParams) {
  $scope.logout = function () { //logout functionality
    $cookies.remove('username')
    $cookies.remove('id')
    $location.url('/')
  }
  $scope.profile_id = $routeParams.id
  $scope.showUser = function () {
    dashboardFactory.showUser($scope.profile_id, function (data) {
      if (data.err) {
        consolelog(data.err) //provides errors if any exist.
      }
      else {
        console.log(data.user) //otherwise creates the user.
        $scope.user = data.user;
      }
    })
  }
  $scope.showUser();
})