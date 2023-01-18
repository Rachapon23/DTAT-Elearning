const express = require("express");
const router = express.Router();

const {listCourses, createCourse, getCourse} = require("../controllers/courseController");

// student
router.get("/list_courses", listCourses);
router.post("/get_course", getCourse);

// teacher
router.post("/create_course", createCourse);

module.exports = router