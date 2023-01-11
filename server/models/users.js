const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    employee_ID: {
        type: String,
        require: true,
        unique: true,
    },
    department_ID: {
        type: String,
        require: true,
        unique: true,
    },
    name: {
        type: String,
    },
    course: {
        type:{}
    }
}, {timestamps: true});

module.exports = mongoose.model("user", userSchema);