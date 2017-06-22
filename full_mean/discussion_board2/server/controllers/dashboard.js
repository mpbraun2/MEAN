//server side controller.
var mongoose = require('mongoose')
var User = mongoose.model('User')//same from the models line 34-37
var Comment = mongoose.model('Comment')//same from the models line 34-37
var Post = mongoose.model('Post')//same from the models line 34-37
var Topic = mongoose.model('Topic')//same from the models line 34-37

module.exports = {
    addUser: function (request, response) {
        User.findOne({ username: request.body.username }, function (err, user) { //finds first user of the same name.
            if (err) {
                response.json({ err: err })// if errors, respond with error object
            }
            else if (user) {
                response.json({ user: user })// if no errors, respond with user object.
                return
            }
            else {
                var user = new User({ username: request.body.username })
                user.save(function (err, user) { //saves the user given no errors
                    if (err) {
                        response.json({ err: err })//if errors, respond with error object
                    }
                    else {
                        response.json({ user: user })// if no errors, save user.
                    }
                })
            }
        })
    },
    addTopic: function (request, response) {
        User.findOne({ _id: request.body.user_id }, function (err, user) { //finds first topic with matching name
            if (err) {
                response.json({ err: err }) //if errors, respond with error object
            }
            else {
                var topic = new Topic({ _user: user._id, name: request.body.name, description: request.body.description, category: request.body.category })
                topic.save(function (err, topic) { //if no errors, save the topic.
                    if (err) {
                        response.json({ err: err })
                    }
                    else {
                        user.topics += 1;//increments the users topics by one if the topic was successfully saved.
                        user.save()
                        response.json({ topic: topic })
                    }
                })
            }
        })
    },
    showTopic: function (request, response) {
        Topic.find({}).populate('_user').exec(function (err, topic) { //displays all topics
            if (err) {
                response.json({ err: err }) //returns error if issue
            }
            else {
                response.json({ topic: topic })
            }
        })
    },
    showOneTopic: function (request, response) {
        Topic.findOne({ _id: request.params.id }).populate("_user").populate("posts").populate({ path: "posts", populate: { path: "comments" } }).exec(function (err, topic) {
            if (err) {
                response.json({ err: err })//shows the topic selected, or returns an error
            }
            else {
                console.log(topic.posts)
                response.json({ topic: topic })
            }
        })
    },
    addPost: function (request, response) {
        User.findOne({ _id: request.body.user }, function (err, user) {
            if (err) {
                response.json({ err: err }) //adds the post to the selected topic from a user unless there are errrors.
            }
            else {
                Topic.findOne({ _id: request.body.topic }, function (err, topic) {
                    if (err) {
                        response.json({ err: err })
                    }
                    else {
                        var post = new Post({ content: request.body.content, user: request.body.username, user_id: request.body.user })
                        post.save(function (err, post) { //saves the post from the user to the topic, unless there are errors.
                            if (err) {
                                response.json({ err: err })
                            }
                            else {
                                user.posts += 1; //increments the user posts by 1 for each post successfully saved.
                                user.save((err) => { console.log(err); })
                                topic.posts.push(post)
                                topic.save((err) => { console.log(err); })
                                response.json({ post: post })
                            }
                        })
                    }
                })
            }
        })
    },
    addComment: function (request, response) {
        User.findOne({ _id: request.body.user }, function (err, user) {
            if (err) {
                response.json({ err: err })
            }
            else {
                Post.findOne({ _id: request.body.post }, function (err, post) {
                    if (err) {
                        response.json({ err: err })
                    }
                    else {
                        var comment = new Comment({ content: request.body.content, user: request.body.username, user_id: request.body.user })
                        comment.save(function (err, comment) {
                            if (err) {
                                response.json({ err: err })
                            }
                            else {
                                user.comments += 1 //increments the comments of the user by one assuming that the comment did not have errors
                                user.save((err) => { console.log(err); })
                                post.comments.push(comment)
                                post.save((err) => { console.log(err); })
                                response.json({ comment: comment })
                            }
                        })
                    }
                })
            }
        })
    },
    showUser: function (request, response) {
        User.findOne({ _id: request.params.id }, function (err, user) { //shows the individual user, matching on id.
            if (err) {
                response.json({ err: err })
            }
            else {
                response.json({ user: user })
            }
        })
    },
    Like: function (request, response) {
        Post.findOne({ _id: request.body.post }, function (err, post) { // creates likes
            if (err) {
                response.json({ err: err })
            }
            else {
                post.like.push(request.body.user);
                post.save((err) => { console.log(err); })
                response.json({ post: post })
            }
        })
    },
    Dislike: function (request, response) { //creates dislikes
        Post.findOne({ _id: request.body.post }, function (err, post) {
            console.log(post)
            if (err) {
                response.json({ err: err })
            }
            else {
                post.dislike.push(request.body.user);
                post.save((err) => { console.log(err); })
                response.json({ post: post })
            }
        })
    }
}