const CourseTopics = require("../models/courseTopicModel");

exports.createCourseTopic = async (req, res) => {
    try {
        const {
            name,
            description,
            material,
        } = req.body
        CourseTopics.create({name, description, material}, (err, courseTopic) => {
            if(err) {
                return res.status(500).json({error: "fail to create the cuurse topic"});
            }
            res.json(courseTopic);
        })
    }
    catch(err) {
        console.log("fail to create the course topic");
        res.status(500).json({error: "fail to create the course topic"})
    }
}