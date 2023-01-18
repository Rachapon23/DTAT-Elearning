const express = require("express");
const router = express.Router();

const {listCourses, createCourse, getCourse,searchCourse} = require("../controllers/courseController");

// student
router.get("/list_courses", listCourses);
router.post("/get_course", getCourse);

router.post("/searchcourse", searchCourse);

// teacher
router.post("/create_course", createCourse);

module.exports = router