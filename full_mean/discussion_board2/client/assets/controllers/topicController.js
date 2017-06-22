app.controller('topicController', function ($scope, dashboardFactory, $location, $cookies, $routeParams) {
  $scope.topic_id = $routeParams.id;
  $scope.user_id = $cookies.get('id');
  $scope.user_username = $cookies.get('username');
  $scope.logout = function () { //basic logout, clears cookies.
    $cookies.remove('username')
    $cookies.remove('id')
    $location.url('/')
  }
  $scope.showOneTopic = function () { //connects with the factory to show a topic.
    factory.showOneTopic($scope.topic_id, function (data) {
      if (data.err) {
        console.log(data.err); //displays any errors
      }
      else {
        $scope.topic = data.topic;//else sends the topic.
      };
    });
  };
  $scope.showOneTopic();
  $scope.addPost = function () { //connects with the factory to add a post to a topic.
    $scope.post.user = $scope.user_id;
    $scope.post.username = $scope.user_username;
    $scope.post.topic = $scope.topic_id;
    factory.addPost($scope.post, function (data) {
      if (data.err) {
        console.log(data.err); //displays any errors
      }
      else {
        $scope.post = {};
        $scope.showOneTopic(); //else sends the post.
      };
    });
  };
  $scope.addComment = function (post, content) {
    $scope.comment = {};
    $scope.comment.user = $scope.user_id;
    $scope.comment.username = $scope.user_username;
    $scope.comment.post = post;
    $scope.comment.content = content;
    factory.addComment($scope.comment, function (data) { //connects the comment to the factory
      if (data.err) { //shows any errors
      }
      else {
        $scope.comment = {};
        $scope.showOneTopic(); //else sends the comment.
      };
    });
  };
  $scope.like = function (post_id) {
    factory.like(post_id, $scope.user_id, function (data) { //connects the likes to the factory
      if (data.err) {
        console.log(data.err) // logs any errors
      }
      else {
        console.log(data.like)
        $scope.showOneTopic();// else adds like to scope.
      }
    })
  }
  $scope.dislike = function (post_id) {
    factory.dislike(post_id, $scope.user_id, function (data) { //connects the dislikes to the factory
      if (data.err) {
        console.log(data.err) //logs any errors
      }
      else {
        console.log(data.dislike)
        $scope.showOneTopic(); // else adds dislike to scope
      }
    })
  }
})