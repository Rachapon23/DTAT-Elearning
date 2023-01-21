const express = require("express");
const router = express.Router();

const { listCourses, createCourse, getCourse, searchCourse, addCourse, getMyCourse, deleteMyCourse,publicCourses } = require("../controllers/courseController");

// student
router.get("/list_courses", listCourses);
router.get("/list_public_courses", publicCourses);
router.post("/get_course", getCourse);
//my course
router.post("/get_my_course/:id", getMyCourse);
router.post("/delete_my_course/:id", deleteMyCourse);

router.post("/searchcourse", searchCourse);
router.post("/addchcourse", addCourse);

// teacher
router.post("/create_course", createCourse);

module.exports = router