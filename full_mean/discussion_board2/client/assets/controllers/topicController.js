app.controller('topicController', function ($scope, dashboardFactory, $location, $cookies, $routeParams) {
  $scope.topic_id = $routeParams.id;
  $scope.user_id = $cookies.get('id');
  $scope.user_username = $cookies.get('username');
  //basic logout, clears cookies.
  $scope.logout = function () { 
    $cookies.remove('username')
    $cookies.remove('id')
    $location.url('/')
  }
  //connects with the factory to show a topic.
  $scope.showOneTopic = function () { 
    factory.showOneTopic($scope.topic_id, function (data) {
      //displays any errors
      if (data.err) {
        console.log(data.err); 
      }
      else {
        //else sends the topic.
        $scope.topic = data.topic;
      };
    });
  };
  $scope.showOneTopic();
  //connects with the factory to add a post to a topic.
  $scope.addPost = function () {
    $scope.post.user = $scope.user_id;
    $scope.post.username = $scope.user_username;
    $scope.post.topic = $scope.topic_id;
    factory.addPost($scope.post, function (data) {
      //displays any errors
      if (data.err) {
        console.log(data.err); 
      }
      else {
        $scope.post = {};
        //else sends the post.
        $scope.showOneTopic(); 
      };
    });
  };
  $scope.addComment = function (post, content) {
    $scope.comment = {};
    $scope.comment.user = $scope.user_id;
    $scope.comment.username = $scope.user_username;
    $scope.comment.post = post;
    $scope.comment.content = content;
    //connects the comment to the factory
    factory.addComment($scope.comment, function (data) { 
      //shows any errors
      if (data.err) { 
      }
      else {
        $scope.comment = {};
        //else sends the comment.
        $scope.showOneTopic(); 
      };
    });
  };
  $scope.like = function (post_id) {
    factory.like(post_id, $scope.user_id, function (data) {
      //connects the likes to the factory
      if (data.err) {
        console.log(data.err)
        // logs any errors
      }
      else {
        console.log(data.like)
        $scope.showOneTopic();
        // else adds like to scope.
      }
    })
  }
  $scope.dislike = function (post_id) {
    //connects the dislikes to the factory
    factory.dislike(post_id, $scope.user_id, function (data) {

      if (data.err) {
        //logs any errors
        console.log(data.err)

      }
      else {
        // else adds dislike to scope
        console.log(data.dislike)
        $scope.showOneTopic();

      }
    })
  }
})