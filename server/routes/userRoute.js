const express = require('express')
const router = express.Router()

//middleware
const {checkUser,checkAdmin,checkTeacher} = require('../middleware/middleward')

//controller
const {
    register,
    login,
    sendEmail,
    currentUser,
    getTeacherByCourseId,
    resetPassword,
    checkToken,
} = require('../controllers/userController')

// สมัครสมาชิก
router.post('/register',register)
// เข้าสู่ระบบ
router.post('/login',login)
// forgot password
router.post('/send-email', sendEmail)
router.post('/reset-password', resetPassword)
router.post('/check-token', checkToken)
// ตรวจสอบผู้ใช้ปัจจุบัน
router.post('/current-user',checkUser,currentUser)

router.post('/current-teacher',checkUser,checkTeacher,currentUser)


router.post('/current-admin',checkUser,checkAdmin,currentUser)
router.post('/get_teacher_by_course_id', getTeacherByCourseId)




module.exports = router;