const CourseTopics = require("../models/courseTopicModel");
const Courses = require("../models/courseModel");

exports.createCourseTopic = async (req, res) => {
    try {
        const couseTopic = req.body
        
        // console.log(couseTopic)
        const create = await CourseTopics.insertMany(couseTopic)

        let course_be = await Courses.findOne({_id:couseTopic[0].course}).exec()
           console.log(course_be)

        for(let i =0 ; i< create.length ; i++){
        //    console.log("course id : ",create[i].course) 
           
           course_be.topic.push(create[i]._id)
        
        }
        const course_af = await Courses.findOneAndUpdate(
            {_id:couseTopic[0].course},
            {topic:course_be.topic}
        )
 res.send(course_af)
    
    }
    catch(err) {
        console.log("fail to create the course topic");
        res.status(500).json({error: "fail to create the course topic"})
    }
}