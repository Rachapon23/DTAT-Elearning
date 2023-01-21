const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const ExaminerSchema = new mongoose.Schema({

    examiner_id: {
        type: String,
        require: true,
    },
    examiner_name:{
        type:String,
    },
    score: {
        type: Number,
    },
    quiz:{
        type:ObjectId,
        ref:'quiz'
        
    },
}, {timestamps: true});

module.exports = Examiner = mongoose.model("examiner",ExaminerSchema);