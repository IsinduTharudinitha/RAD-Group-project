const mongoose = require('mongoose');

const GuardianSchema = new mongoose.Schema({
    GuardianID: {
        type: String,
        required: [true, "Guardian ID is required"],
        unique: true
    },
    Name: {
        type: String,
        required: [true, "Guardian Name is required"]
    },
    Email: {
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

module.exports= mongoose.model("Guardian", GuardianSchema);