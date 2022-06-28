const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        index: {
            unique: true,
        }
    },
    lastName: {
        type: String,
        required: true,
    },
    firstName:{
        type: String,
        required: true,
    }, 
    password: {
        type: String,
        required: true,
    },
},{
    collection: 'User'
});

UserSchema.pre('save', (doc, next) => {
    if (!doc.isModified('password')){
        return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if(err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err) {
                return next(err);
            }

            user.password = hash;
            next();
        });
    })
});

UserSchema.methods.comparePassword = (candidatePassword, cb) => {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }

        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);