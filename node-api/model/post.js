const mongoose = require("mongoose");

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
    }
});

// export model post with PostSchema
module.exports = mongoose.model("post", PostSchema);