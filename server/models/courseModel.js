const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    teacher: {
        type: [String],
        require: true,
    },
    description: {
        type: String,
    }
}, {timestamps: true});

module.exports = Course = mongoose.model("course", CourseSchema);
