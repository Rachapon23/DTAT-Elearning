const express = require('express')
const router = express.Router()

//middleware
const {checkUser,checkTeacher,checkAdmin} = require('../middleware/middleward')

const {
    listAlluser,
    listStudentuser,
    ChangeRole,
    listTeacheruser
} = require('../controllers/adminController')

router.get('/listalluser',checkUser,checkTeacher,checkAdmin,listAlluser)
router.get('/liststudentuser',checkUser,checkTeacher,checkAdmin,listStudentuser)
router.get('/listteacheruser',checkUser,checkTeacher,checkAdmin,listTeacheruser)


router.post('/change-role',checkUser,checkTeacher,checkAdmin,ChangeRole)

module.exports = router;