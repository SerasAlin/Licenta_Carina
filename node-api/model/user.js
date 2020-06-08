const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    photo: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    desc: {
        type: String,
        required: false
    }
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);