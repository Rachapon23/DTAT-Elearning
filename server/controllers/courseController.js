const Courses = require("../models/courseModel");

exports.createCourse = async (req, res) => {
    try {
        const {
            name,
            teacher,
            description,
        } = req.body;

        Courses.create({name, teacher, description}, (err, course) => {
            if(err) {
                return res.status(500).json({error: "fail to create the course"});
            }
            res.json(course);
        })
    }
    catch(err) {
        console.log("fail to create the course");
        res.status(500).json({error: "fail to create the course"})
    }
}

exports.listCourses = async (req, res) => {
    try {
        
        await Courses.find({}).exec((err, courses) => {
            res.json(courses);
        });
        
    }
    catch(err) {
        console.log("fail to fetch courses");
        res.status(500).json({error: "fail to fetch courses"});
    }
}