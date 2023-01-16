const express = require("express");
const router = express.Router();

const {listCourses, createCourse} = require("../controllers/courseController");


router.get("/list_courses", listCourses);
router.post("/create_course", createCourse);

module.exports = router