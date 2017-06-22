console.log("/server/config/routes.js");
var users = require("../controllers/schemas");  // This requires the controllers schema

module.exports = function (app) {
    //controls login, users and posts
    app.post("/api/users", users.register);
    app.post("/api/login", users.login);
    app.post("/api/posts", users.addpost);
    app.get("/api/posts", users.home);

    //controls comments
    app.post("/api/comments", users.addcomment);
    app.get("/api/comments", users.home);

}