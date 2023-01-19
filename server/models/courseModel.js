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
<<<<<<< HEAD
    password:{
        type:String,
=======
    material: {
        type: ObjectId,
        ref: "topic",
>>>>>>> d099e632c086e793acc3449b46c5f4e96020d4e3
    }
}, {timestamps: true});

module.exports = Course = mongoose.model("course", CourseSchema);