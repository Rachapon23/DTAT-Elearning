const User = require('../models/userModel')

exports.createTeachTime = async (req, res) => {
    try {
        const {
            course_number,
            name,
            teacher,
            description,
            password,

        } = req.body;

        if(!password){
            const status = "public"
            Courses.create({ course_number, name, teacher, description, password,status }, (err, course) => {
            if (err) {
                return res.status(500).json({ error: "fail to create the course" });
            }
            res.json(course);
        })
        }else{
            Courses.create({ course_number, name, teacher, description, password }, (err, course) => {
                if (err) {
                    return res.status(500).json({ error: "fail to create the course" });
                }
                res.json(course);
            })
        }
       
    }
    catch (err) {
        console.log("fail to create the course");
        res.status(500).json({ error: "fail to create the course" })
    }
}