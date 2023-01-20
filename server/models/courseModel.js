const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    teacher: {
        type: ObjectId,
        ref: "users",
    },
    description: {
        type: String,
    }
    ,
    course_number: {
        type: String,
        Text:true
    },
    password: {
        type: String,
    },
    material: {
        type: ObjectId,
        ref: "topic",
    }
}, {timestamps: true});

module.exports = Course = mongoose.model("course", CourseSchema);