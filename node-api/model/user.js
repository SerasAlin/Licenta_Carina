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
    animals: {
        type: Array,
        required: false
    },
    photo: {
        type: Array,
        required: false
    }
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);