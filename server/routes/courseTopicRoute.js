const express = require("express");
const router = express.Router();

const {createCourseTopic} = require('../controllers/courseTopicController')

router.post("/create_course_topic",createCourseTopic )

module.exports = router;