const express = require('express')
const router = express.Router()

//middleware
const {checkUser,checkTeacher} = require('../middleware/middleward')

const {createTeachTime, listTeachTimes, listCoursesInTeachTime} = require('../controllers/teachTimeController')

router.post('/create_teach_time',checkUser,checkTeacher,createTeachTime)
router.get('/list_teach_times',checkUser,checkTeacher,listTeachTimes)
router.post('/list_courses_in_teach_time',checkUser,checkTeacher,listCoursesInTeachTime)





module.exports = router;