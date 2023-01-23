const express = require("express");
const router = express.Router();

const {createCourseTopic,UpdateTopic} = require('../controllers/courseTopicController')

router.post("/create_course_topic",createCourseTopic )
router.put("/update_course_topic",UpdateTopic )

module.exports = router;