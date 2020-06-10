const mongoose = require("mongoose");
const User = require("../model/User");

const PostSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        ref: 'user'
    },
    content: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    },
    details: {
        type: JSON,
        required: true
    }
});

// export model post with PostSchema
module.exports = mongoose.model("post", PostSchema);