app.controller('loginController', function ($scope, dashboardFactory, $location, $cookies) {//login controller
  $scope.addUser = function () {
    dashboardFactory.addUser($scope.user, function (data) {// adds user post login.
      if (data.err) {
        $scope.error = data.err //provides errors
      } else {
        $cookies.put('id', data.user._id)
        $cookies.put('username', data.user.username)
        $location.url('/home') //otherwise accepts user and redirects to main page.
      }
    })
  }
})