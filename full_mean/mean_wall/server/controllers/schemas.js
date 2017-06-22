//Server Controller that does requests for any and all incoming things

var mongoose = require("mongoose");
var User = mongoose.model("User");
var Post = mongoose.model("Post");
var Comment = mongoose.model("Comment")


module.exports.home = function (request, response) {
  Post.find({}).populate("_author").then(function (posts) { //finds all the posts by a specific author
    Comment.find({}).populate("_author _post").then(function (comments) {
      response.json({ posts: posts, comments: comments });//provides two sets of objects as posts and comments associated with that post
    }).catch(function (err) {
      console.log(err)
    })
  }).catch(function (err) {
    console.log(err)
  })
}

module.exports.login = function (request, response) {
  User.findOne({ email: request.body.email }, function (err, user) { //email is the unique identifier for login and user recognition

    if (err) {
      console.log(err)
      response.json({ errors: err }); //if errors exist, display the errors(returned as JSON data)
    }
    else if (user && user.validPassword(request.body.password)) {
      response.json({
        id: user._id,
        username: user.username //if everything is good, allow login
      });
    }
    else if (user && !user.validPassword(request.body.password)) {
      response.json({
        errors: {
          login: {
            message: "Password doesn't match what is on file, please try again!" //if the user is on file, but the password is incorrect
          }
        },

      })
    }
    else {
      response.json({
        errors: {
          login: {
            message: "Email was not found, please try again, or register!"//if the user is not found
          }
        }
      })
    }
  })
}

module.exports.register = function (request, response) {//register controller
  var user = new User(request.body); //stages the user
  user.save(function (err) { //creates the user if no errors
    if (err) {
      response.json({ errors: err })
      // console.log(err);
    } else {
      response.json({ message: "User was successfully created!", user: user });
    }
  });
}

module.exports.addpost = function (request, response) {
  var post = new Post(request.body);
  post.save(function (err, newpost) {
    if (err) {
      console.log(err);
    } else {
      response.json({ posttext: newpost.posttext, author: newpost.author })
    }
  })
}

module.exports.addcomment = function (request, response) {
  var comment = new Comment(request.body);
  comment.save(function (err, newcomment) {
    if (err) {
      console.log(err);
    } else {
      response.json({ commenttext: newcomment.commenttext, author: newcomment.author })
    }
  })
}
