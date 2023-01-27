const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema

const TeachTimeSchema = new mongoose.Schema({

    course: {
        type: ObjectId,
        ref:"course",
        require: true,
    },
    date_time: [],
    teacher: {
        type: ObjectId,
        ref:"users"
    
    },

}, { timestamps: true });

module.exports = TeachTime = mongoose.model("teachTime", TeachTimeSchema);