const mongoose = require("mongoose");

const AnimalSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    },
    tag: {
        type: String,
        required: true
    },
    master_id: {
        type: String,
        required: true
    },
    story: {
        type: String,
        required: false
    }
});

// export model user with UserSchema
module.exports = mongoose.model("animal", AnimalSchema);