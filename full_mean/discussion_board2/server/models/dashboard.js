//server side model/factory
var mongoose = require('mongoose') //required on each Mongoose page.

var userSchema = mongoose.Schema({ //basic validations for user schema
  username: { type: String, required: [true, "Username is required"], unique: [true, "Username has already been taken"] },
  topics: { type: Number, default: 0 },
  posts: { type: Number, default: 0 },
  comments: { type: Number, default: 0 }
}, { timestamps: true });

var commentSchema = mongoose.Schema({//basic validations for comment schema
  content: { type: String, required: [true, 'Comment is needed'], minlength: [3, "Comment must be longer than 3 characters"] },
  user: { type: String },
  user_id: { type: String },
}, { timestampes: true });

var postSchema = mongoose.Schema({//basic validations for post schema
  content: { type: String, required: [true, 'Post is needed'], minlength: [3, "Post must be longer than 3 characters"] },
  user: { type: String },
  user_id: { type: String },
  like: [],
  dislike: [],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
});

var topicSchema = mongoose.Schema({ //basic validations for topic schema
  name: { type: String, required: [true, 'Topic is needed'], unique: [true, 'Topic is already created'], minlength: [3, "Topic must be longer than 3 characters"], maxlength: [100, "Topic cannot be longer than 100 Characters"] },
  description: { type: String, required: [true, 'Description is needed'], minlength: [3, "Topic must be longer than 3 characters"], maxlength: [400, "Description cannot be longer than 400 Characters"] },
  category: { type: String, required: [true, 'Category is needed'] },
  _user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }]
}, { timestamps: true });

mongoose.model('User', userSchema) //same as controller dashboard.js lines 1-4
mongoose.model('Comment', commentSchema)//same as controller dashboard.js lines 1-4
mongoose.model('Post', postSchema)//same as controller dashboard.js lines 1-4
mongoose.model('Topic', topicSchema)//same as controller dashboard.js lines 1-4