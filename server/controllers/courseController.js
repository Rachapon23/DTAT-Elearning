
const User = require('../models/userModel')



const Coursee = require('../models/course')

exports.createCourse = async (req, res) => {
    try {
        const { head, body } = req.body
        if (!head.password) {
            const status = "public"
            const course = new Coursee(
                {
                    name: head.name,
                    description: head.description,
                    course_number: head.course_number,
                    password: head.password,
                    teacher: head.teacher,
                    status: status,
                    topic: body,

                }
            )
            // console.log(course)
            await course.save()
            res.send('OK Public')

        } else {
            const course = new Coursee(
                {
                    name: head.name,
                    description: head.description,
                    course_number: head.course_number,
                    password: head.password,
                    teacher: head.teacher,
                    topic: body,

                }
            )
            // console.log(course)
            await course.save()
            res.send('OK corse Private')
        }




    }
    catch (err) {
        console.log("fail to create the course");
        res.status(500).json({ error: "fail to create the course" })
    }
}

// exports.createCourse = async (req, res) => {
//     try {
//         const {
//             course_number,
//             name,
//             teacher,
//             description,
//             password,

//         } = req.body;

//         if(!password){
//             const status = "public"
//             Courses.create({ course_number, name, teacher, description, password,status }, (err, course) => {
//             if (err) {
//                 return res.status(500).json({ error: "fail to create the course" });
//             }
//             res.json(course);
//         })
//         }else{
//             Courses.create({ course_number, name, teacher, description, password }, (err, course) => {
//                 if (err) {
//                     return res.status(500).json({ error: "fail to create the course" });
//                 }
//                 res.json(course);
//             })
//         }

//     }
//     catch (err) {
//         console.log("fail to create the course");
//         res.status(500).json({ error: "fail to create the course" })
//     }
// }

exports.listCourses = async (req, res) => {
    try {

        await Coursee.find({}).populate("teacher", "-password")
            .exec((err, courses) => {
                res.json(courses);
            });

    }
    catch (err) {
        console.log("fail to fetch courses");
        res.status(500).json({ error: "fail to fetch courses" });
    }
}

exports.publicCourses = async (req, res) => {
    try {

        await Coursee.find({ status: "public" })
            .exec((err, courses) => {
                res.json(courses);
            });

    }
    catch (err) {
        console.log("fail to fetch courses");
        res.status(500).json({ error: "fail to fetch courses" });
    }
}

exports.getCourse = async (req, res) => {
    try {
        const { id } = req.params
        const course = await Coursee.findOne({ _id: id })
            .populate('teacher')
            .exec()
        res.send(course)
    }
    catch (err) {

    }
}

exports.searchCourse = async (req, res) => {
    try {
        const { query } = req.body
        console.log(query)
        let courseSearch = await Coursee.find({ course_number: { $regex: query }, status: "private" }).populate("teacher", "firstname").exec()
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

        const courseSearch = await Coursee.findOne({ _id: id }).exec()
        let user = await User.findOne({ _id: id_user }).exec()
        user.coursee.push(id)
        const user_push = user.coursee


        // console.log(user_push)
        // console.log(courseSearch.password)

        if (password == courseSearch.password) {
            console.log('math')
            const user_update = await User.findByIdAndUpdate(
                { _id: id_user },
                { coursee: user_push }
            ).exec()
            res.send(user_update)

        } else {
            return res.status(400).send("Password Invalid!!!");
        }
        // res.send("ok")

    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error!!! on AddCourse");
    }
}


exports.getMyCourse = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findOne({ _id: id })
            .populate("coursee")
            .select("coursee")
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
        const { id } = req.params
        const { user_id } = req.body
        const { coursee } = await User.findOne({ _id: user_id })
            .select("coursee")
            .exec()
        // console.log("before:",coursee)
        for (let i = 0; i < coursee.length; i++) {

            if (coursee[i] == id) {
                //   console.log(course[i],"--",id)  
                coursee.splice(coursee.indexOf(coursee[i]), 1);

            }
        }
        // console.log("after:",coursee)
        const user_update = await User.findByIdAndUpdate(
            { _id: user_id },
            { coursee: coursee }
        ).exec()
        // console.log(id,user_id)
        res.send(user_update)
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error!!! on  deleteMyCourse");
    }
}

exports.getMyCourseTeacher = async (req, res) => {
    try {
const { id } = req.params
        const courses = await Coursee.find({ teacher: id }).populate("teacher", "-password").exec()
        res.send(courses)
        // res.send("ok")
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error!!! on getMyCourse");
    }
}
exports.updateCourse = async (req, res) => {
    try {
        const { head, body } = req.body
        // console.log(head,body)

        const course = await Coursee.findOneAndUpdate(
            { _id: head._id }
            , {
                new: true,
                name: head.name,
                description: head.description,
                course_number: head.course_number,
                password: head.password,
                topic: body
            },


        ).exec()


        res.send("update success")

    }
    catch (err) {
        console.log("fail to update the course topic: ", err);
        res.status(500).json({ error: "fail to update the course topic" })
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        const course = await Coursee.findOneAndRemove({ _id: req.params.id }).exec()
        res.send(course)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on remove course')
    }
}
