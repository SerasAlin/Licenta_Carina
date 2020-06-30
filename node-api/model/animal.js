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
        required: true,
        ref: 'user'
    },
    story: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },

});

// export model animal with AnimalSchema
module.exports = mongoose.model("animal", AnimalSchema);