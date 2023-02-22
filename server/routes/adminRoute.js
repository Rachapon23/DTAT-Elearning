const express = require('express')
const router = express.Router()

//middleware
const {checkUser,checkTeacher,checkAdmin} = require('../middleware/middleward')

const {
    listAlluser,
    listStudentuser,
    ChangeRole,
    listTeacheruser,
    changeEnable
} = require('../controllers/adminController')

router.get('/listalluser',checkUser,checkTeacher,checkAdmin,listAlluser)
router.get('/liststudentuser',checkUser,checkTeacher,listStudentuser)
router.get('/listteacheruser',checkUser,checkTeacher,checkAdmin,listTeacheruser)


router.post('/change-role',checkUser,checkTeacher,checkAdmin,ChangeRole)
router.post('/change_enable',checkUser,checkTeacher,checkAdmin,changeEnable)

module.exports = router;