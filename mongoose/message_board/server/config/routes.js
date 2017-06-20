var posts = require('../controllers/posts.js');

module.exports = function (app) {
    app.get('/api', post.index);
    app.post('/api/message', posts.new_message);
    app.post('/api/comment/:id',posts.new_comment);
}