const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
    },
    description:{
        type:String,
    },
    material: {
        type: [String],
    },
    enabled:{
        type:Boolean,
        default: true,
    },
}, {timestamps: true});

module.exports = User = mongoose.model("topic",UserSchema);