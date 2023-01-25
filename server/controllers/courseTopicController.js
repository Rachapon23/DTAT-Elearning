const CourseTopics = require("../models/courseTopicModel");
const Courses = require("../models/courseModel");

exports.createCourseTopic = async (req, res) => {
    try {
        const couseTopic = req.body

        console.log(couseTopic)
        const create = await CourseTopics.insertMany(couseTopic)


        let course_be = await Courses.findOne({ _id: couseTopic[0].course }).exec()
        console.log(course_be)
        // console.log(create)

        for (let i = 0; i < create.length; i++) {
            //    console.log("course id : ",create[i].course) 

            course_be.topic.push(create[i]._id)

        }
        const course_af = await Courses.findOneAndUpdate(
            { _id: couseTopic[0].course },
            { topic: course_be.topic }
        )

        res.send("course_af")

    }
    catch (err) {
        console.log("fail to create the course  topic: ", err);
        res.status(500).json({ error: "fail to create the course topic" })
    }
}
exports.UpdateTopic = async (req, res) => {
    try {
        const topic = req.body


        // console.log(topic[1].name)

        // const create = await CourseTopics.aggregate({$replaceWith:topic}).exec()

        for (let i = 0; i < topic.length; i++) {
            let id = topic[i]._id
            let course_be = await CourseTopics.findOneAndUpdate(
                { _id:topic[i]._id }
                , { new: true, name: topic[i].name, description: topic[i].description },
                // , { name: topic[i].name },

            ).exec()
            console.log("UPDATE : ",id)
            console.log("UPDATE : ",course_be)
        }

        // let course_be = await Courses.findOne({_id:couseTopic[0].course}).exec()
        //    console.log(course_be)

        // for(let i =0 ; i< create.length ; i++){
        // //    console.log("course id : ",create[i].course) 

        //    course_be.topic.push(create[i]._id)

        // }
        // const course_af = await Courses.findOneAndUpdate(
        //     {_id:couseTopic[0].course},
        //     {topic:course_be.topic}
        // )
        res.send("update success")

    }
    catch (err) {
        console.log("fail to update the course topic: ", err);
        res.status(500).json({ error: "fail to update the course topic" })
    }
}