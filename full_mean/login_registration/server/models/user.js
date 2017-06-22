var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

//basic validations to ensure fields are not blank.
var usersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        minlength: 2,
        trim: true //removes any whitespaces provided by the user in the form
    },
    last_name: {
        type: String,
        required: true,
        minlength: 2,
        trim: true

    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 2,
        trim: true,
        validate: {
            validator: function( value ) { //value is the password entered.
            return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test ( value );
        },
        message: "Email failed validation, please try again!"
        }
    },
    password: {
        type: String,
        required:true,
        minlength: 8,
        maxlength:32,
        validate: {
            validator: function( value ) { //value is the password entered.
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( value );
            },
            message: "Password failed validation, you must have at least 1 number, uppercase and special character"
        }
    },
    confirm_password: {
        type: String,
        required:true,
        validate: {
            validator: function ( value ) {
                if (password != confirm_password);
            },
                message: "Passwords do not match!"
            }
        },
    birthday: {
        type: Date,
        required: true,
        validate:{
            validator: function (value) {
                return value < Date.now();
            },
            message: "Birthday cannot be in the future!"
        }
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

//hash the user's password
usersSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// checking if password is correct with what is entered in login.
usersSchema.methods.validPassword = function(password) { //compares what user has entered vs what the db has
    return bcrypt.compareSync(password, this.password);
};

usersSchema.pre('save', function(done) {
    this.password = this.generateHash(this.password);
    done();
});

mongoose.model('User', usersSchema);