const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const TopicSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
    },
    description:{
        type:String,
    },
    materials: {
        type: Array,
    },
    course:{
        type:ObjectId,
        
    },
    quiz:{
        type:ObjectId,
        ref:"quiz"
        
    },
}, {timestamps: true});

module.exports = Topic = mongoose.model("topic",TopicSchema);