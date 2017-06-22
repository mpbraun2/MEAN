var users = require("../controllers/users");
module.exports = function (app)
{
    app.post("/api/users", users.register);
    app.post("/api/login", users.login);
    app.post("/api/topics", users.addNewTopic);
    app.get("/api/topics", users.home);
    app.post("/api/comments", users.addcomment);
    app.get("/api/comments", users.home);
};