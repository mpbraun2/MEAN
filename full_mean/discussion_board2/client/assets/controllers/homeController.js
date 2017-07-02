app.controller('homeController', function ($scope, dashboardFactory, $location, $cookies) {
  $scope.user = $cookies.get('username')
  //holds onto active user name.
  $scope.id = $cookies.get('id')
  $scope.logout = function () {
    //provides logout functionality
    $cookies.remove('username')
    $cookies.remove('id')
    $location.url('/')
    //redirects
  }
  $scope.showTopic = function () {
    //shows all topics in home.html
    dashboardFactory.showTopic(function (data) {
      console.log(data)
      $scope.topics = data.topic
    })
  }
  $scope.showTopic();
  $scope.addTopic = function () {
    $scope.topic.user_id = $scope.id
    //allows the addition of a topic into the home.html
    dashboardFactory.addTopic($scope.topic, function (data) {
      if (data.err) {
        console.log(data.err)
        //will log error if exists
      }
      else {
        $scope.topic = {};
        $scope.showTopic();
        //otherwise will add topic to the scope.
      }
    })
  }

})