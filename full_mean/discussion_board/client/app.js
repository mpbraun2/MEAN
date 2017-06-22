var app = angular.module("app", ["ngRoute", "ngMessages", "ngCookies"]);

app.factory("userFactory", function ($http) {
  var factory = {};
  factory.user = null;
  factory.errors = [];
  factory.register = function (user, finishedAddingUser) {
    $http.post('/api/users', user).then(function (response) {
      if (response.data.user) {
        factory.user = {
          id: response.data.user._id,
          username: response.data.user.username
        }
      }
      else {
        console.log("factory.register.error")
        console.log(response.data)
        factory.errors.push(response.data.error)
      }
      finishedAddingUser();
    });
  }
  factory.login = function (user, finishedLoggingUser) {
    $http.post('/api/login', user).then(function (response) {
      if (response.data.user) {
        factory.user = {
          id: response.data.user.id,
          username: response.data.user.username
        }
      }
      else {
        console.log("factory.login.error")
        console.log(response.data)
        factory.errors.push(response.data.error);
      }
      finishedLoggingUser();
    })
  }
  return factory;
});

app.factory("topicFactory", function ($http) {
  var factory = {};
  var topics = [];
  factory.getTopics = function (receivedTopics) {
    $http.get("/api/topics").then(function (response) {
      topics = response.data.topics;
      receivedTopics(topics);
    })
  }
  factory.addNewTopic = function (topicdata, finishedAddingTopic) {
    $http.post('/api/topics', topicdata).then(function (response) {
      finishedAddingTopic();
    }
    )
  }
  return factory;
})
app.factory("commentFactory", function ($http) {
  var factory = {};
  var comments = [];
  factory.getComments = function (receivedComments) {
    $http.get("/api/comments").then(function (response) {
      comments = response.data.comments;
      receivedComments(comments);

    })
  }
  factory.addNewComment = function (topicdata, finishedAddingComment) {
    $http.post('/api/comments', topicdata).then(function (response) {
      finishedAddingComment();
    }
    )
  }
  return factory;
});
//cookie
app.controller("loginController", function ($scope, $location, userFactory, $cookies) {
  $scope.register = function () {
    if ($scope.registerUser.password == $scope.registerUser.confirm) {
      userFactory.register($scope.registerUser, function () {
        if (userFactory.user) {
          $cookies.put('loggeduserid', userFactory.user.id);
          $cookies.put('loggedusername', userFactory.user.username);
          var favcookie = $cookies.get('loggedusername');
          var othercookie = $cookies.get("loggeduserid");
          console.log(favcookie);
          console.log(othercookie);
          $location.url('/');
        }
        else {
          $scope.errors = userFactory.errors;
        }
      })
    }
  }
  $scope.login = function () {
    userFactory.login($scope.logindata, function () {
      if (userFactory.user) {
        $cookies.put('loggeduserid', userFactory.user.id);
        $cookies.put('loggedusername', userFactory.user.username);
        $location.url('/');
      }
      else {
        $scope.errors = userFactory.errors;
      }
    })
  }
});

app.controller("homeController", function ($scope, $location, userFactory, topicFactory, commentFactory, $cookies, $route) {
  $scope.user = {};
  var logincookie = $cookies.get("loggeduserid");
  if (!logincookie) {
    $location.url("/login");
  } else {
    var id = $cookies.get("loggeduserid");
    var name = $cookies.get("loggedusername");
    $scope.user = { id: id, username: name };
    topicFactory.getTopics(function (topics) {
      $scope.topics = topics;
    })
    commentFactory.getComments(function (comments) {
      $scope.comments = comments;
    })
    $scope.logout = function () {
      console.log("logout");
      $cookies.remove("loggeduserid");
      $cookies.remove("loggedusername");
      $location.url("/login");
    }
    $scope.home = function () {

    }
    $scope.addNewTopic = function () {
      var newtopicdata = { topicName: $scope.topic.name, topicDescription: $scope.topic.description, topicCategory: $scope.topic.category, _user: $scope.user.id }; //just topic was newtopic
      topicFactory.addNewTopic(newtopicdata, function () {
        $scope.newtopic = {};
      })
      $route.reload();
    }
    $scope.addComment = function (topicidfrompage, newcomment) {
      var newcommentdata = {
        commentText: newcomment.commenttext,
        _user: $scope.user.id,
        _topic: topicidfrompage
      };
      commentFactory.addNewComment(newcommentdata, function () {
        $scope.newcomment = {};
      })
      $route.reload();
    }
  }
});

app.config(function ($routeProvider) {
  $routeProvider
    .when("/login", {
      templateUrl: "/partials/login.html",
      controller: "loginController",
    })
    .when("/", {
      templateUrl: "/partials/home.html",
      controller: "homeController",
    })
    .otherwise("/");
});