const mongoose = require('mongoose');

const ChildrenSchema = new mongoose.Schema({
    ChildrenID: {
        type: String,
        required: [true, "Children ID is required"],
        unique: true
    },
    Name: {
        type: String,
        required: [true, "Children Name is required"]
    },
    Age: {
        type: String,
        required: [false]
    },
    TelephoneNum: {
        type: String,
        required: [true, "Telephone number is required"]
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports= mongoose.model("Children", ChildrenSchema);