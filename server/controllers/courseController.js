const Courses = require("../models/courseModel");
const User = require('../models/userModel')

exports.createCourse = async (req, res) => {
    try {
        const {
            course_number,
            name,
            teacher,
            description,
            password,

        } = req.body;

        Courses.create({ course_number, name, teacher, description, password }, (err, course) => {
            if (err) {
                return res.status(500).json({ error: "fail to create the course" });
            }
            res.json(course);
        })
    }
    catch (err) {
        console.log("fail to create the course");
        res.status(500).json({ error: "fail to create the course" })
    }
}

exports.listCourses = async (req, res) => {
    try {

        await Courses.find({}).populate("teacher", "-password").exec((err, courses) => {
            res.json(courses);
        });

    }
    catch (err) {
        console.log("fail to fetch courses");
        res.status(500).json({ error: "fail to fetch courses" });
    }
}

exports.getCourse = async (req, res) => {

    const { id } = req.body

    try {
        await Courses.findOne({ _id: id }).populate("teacher", "-password").exec((err, course) => {
            res.json(course);
        })
    }
    catch (err) {

    }
}
exports.searchCourse = async (req, res) => {
    try {
        const { query } = req.body
        //    console.log(query)
        let courseSearch = await Courses.find({ course_number: { $regex: query } }).populate("teacher", "firstname").exec()
        //$text:{$search:"110011"}
        res.send(courseSearch)
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error!!! on searchCourse");
    }
}
exports.addCourse = async (req, res) => {
    try {
        const { id, id_user, password } = req.body
        const courseSearch = await Courses.findOne({ _id: id }).exec()
        let user = await User.findOne({ _id: id_user }).exec()
        user.course.push(id)
        const  user_push = user.course

        if(password == courseSearch.password){
            console.log('math')
            const user_update = await User.findByIdAndUpdate(
                { _id: id_user },
                { course: user_push }
            ).exec()
             res.send(user_update)

        }else{
            return res.status(400).send("Password Invalid!!!");
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error!!! on AddCourse");
    }
}
exports.getMyCourse = async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findOne({ _id: id })
        .populate("course")
        .select("course")
        .exec()
        res.send(user)
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error!!! on getMyCourse");
    }
}
exports.deleteMyCourse = async (req, res) => {
    try {
        const {id} = req.params
        const {user_id} = req.body
        const {course} = await User.findOne({ _id: user_id })
        // // .populate("course")
        .select("course")
        .exec()
        // console.log("before:",course)
        for(let i = 0 ; i<course.length; i++){
            
            if(course[i] == id){
            //   console.log(course[i],"--",id)  
            course.splice(course.indexOf(course[i]), 1);

            }
        }
        // console.log("after:",course)
        const user_update = await User.findByIdAndUpdate(
            { _id: user_id },
            { course: course }
        ).exec()

        res.send(user_update)
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error!!! on  deleteMyCourse");
    }
}
