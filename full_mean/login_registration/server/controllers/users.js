var mongoose = require('mongoose'), //requires it for the controller
    User = mongoose.model('User'); //This grabs the models that were created by the schemas, now allows calls to be made from controllers. Models are ALWAYS CAPITALIZED.

function response_additions(err, data) {
    if (err) {
        this.json({
            error: err
        });
    }
    this.json({
        data
    });
}
//what is the user Controller allowed to do
function UsersController() { //this is server side, $scope does not work, this
    var _this = this;
    this.index = function(req, res) {
        User.find({}, function(err, data) {
            res.json(data); //sends back JSON Object. Replaces Render.
        });
    };
    //basic CRUD additions into the controller.
    this.create = function(req, res) {
        res.json({
            future: 'create' //in case of emergency, break glass
        });
    }
    this.update = function(req, res) {
        res.json({
            future: 'update'//in case of emergency, break glass
        });

    }
    this.delete = function(req, res) {
        res.json({
            future: 'delete'//in case of emergency, break glass
        });

    }
    this.show = function(req, res) {
        res.json({
            future: 'show'//in case of emergency, break glass
        });
    }

    this.login = function(req, res) {
        User.findOne({ //finds the first user that matches the email
            email: req.body.email
        }, function(err, data) {
            if (err) {
                res.json({
                        errors: {
                            login_reg: {
                                message: "user name and/or password is invalid",
                                kind: "what didn't work",
                                path: "reference to the schema's name",
                                value: "cause of the initial error"
                            }
                        },
                        name: "Validation error"
                    }

                );
            } else if (data && data.validPassword(req.body.password)) { //from the user.js file, comparing PWs
                res.json({
                    _id: data._id
                });
            } else {
                res.json({
                        errors: {
                            login_reg: {
                                message: "user name and/or password is invalid",
                                kind: "what didn't work",
                                path: "reference to the schema's name",
                                value: "cause of the initial error"
                            }
                        },
                        name: "Validation error"
                    }

                );
            }
        })
    }
    this.register = function(req, res) {
        var user = new User(req.body);
        console.log("users.js", user);
        user.save(function(err, newuser) {
            console.log("users.js", newuser);
            if (err){
              res.json(err);
              console.log('users.js', err);
            }
            else{
            res.json({
                _id: newuser._id
            });
          }
        });
        // res.json({future:'register'});
    }


}



module.exports = new UsersController(); //export a new instance of this controller.