const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema

const QuizSchema = new mongoose.Schema({

    title: {
        type: String,
        require: true,
        unique: true,
    },
    question_data: {
        type: {}
    }, teacher: {
        type: ObjectId,
    
    },

}, { timestamps: true });

module.exports = Quiz = mongoose.model("quiz", QuizSchema);