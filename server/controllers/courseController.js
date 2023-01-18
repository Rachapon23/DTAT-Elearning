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
        
        await Courses.find({}).populate("teacher", "-password").exec((err, courses) => {
            res.json(courses);
        });
        
    }
    catch(err) {
        console.log("fail to fetch courses");
        res.status(500).json({error: "fail to fetch courses"});
    }
}

exports.getCourse = async (req, res) => {
    
    const {id} = req.body
    
    try {
        await Courses.findOne({_id:id}).populate("teacher", "-password").exec((err, course) => {
            res.json(course);
        })
    }
    catch(err) {

    }
}