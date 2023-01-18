const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema

const QuizSchema = new mongoose.Schema({

    title: {
        type: String,
        require: true,
        unique: true,
    },
    question_data: [{
        type:Object
    }], teacher: {
        type: ObjectId,
        ref:"users"
    
    },

}, { timestamps: true });

module.exports = Quiz = mongoose.model("quiz", QuizSchema);