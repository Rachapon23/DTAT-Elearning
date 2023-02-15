const express = require("express");
const router = express.Router();

const {
    listCourses,
    createCourse,
    searchCourse,
    addCourse,
    getMyCourse,
    getCourse,
    publicCourses,
    deleteMyCourse,
    getMyCourseTeacher,
    updateCourse,
    deleteCourse,
    getCourseName,
    getRoom,
    // createRoom,

} = require("../controllers/courseController");

// student
// router.get("/list_courses", listCourses);

// router.post("/get_course", getCourse);
// //my course
// router.post("/get_my_course/:id", getMyCourse);
// router.post("/delete_my_course/:id", deleteMyCourse);

// router.post("/searchcourse", searchCourse);
// router.post("/addchcourse", addCourse);

// // teacher
// router.post("/create_course", createCourse);


// // teacher
router.post("/create-course", createCourse);
router.put("/update-course", updateCourse);
router.get("/list-courses", listCourses);
router.delete("/delete-courses/:id", deleteCourse);
router.get("/get-mycourse-teacher/:id", getMyCourseTeacher);
router.get("/list-room", getRoom);
// router.post("/create-room", createRoom);

// student
router.post("/searchcourse", searchCourse);
router.post("/addchcourse", addCourse);
router.post("/get-my-course/:id", getMyCourse);
router.post("/get-course/:id", getCourse);
router.get("/list-public-courses", publicCourses);
router.post("/delete-my-course/:id", deleteMyCourse);


module.exports = router