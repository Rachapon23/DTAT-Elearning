const express = require('express')
const router = express.Router()

//middleware
const {checkUser,checkAdmin,checkTeacher} = require('../middleware/middleward')

//controller
const {
    register,
    login,
    currentUser,ch
} = require('../controllers/userController')

//สมัครสมาชิก
router.post('/register',register)
//เข้าสู่ระบบ
router.post('/login',login)
//ตรวจสอบผู้ใช้ปัจจุบัน
router.post('/current-user',checkUser,currentUser)
router.post('/current-teacher',checkUser,checkTeacher,currentUser)
router.post('/current-admin',checkUser,checkAdmin,currentUser)


//---------
router.get('/studench',checkUser,ch)
router.get('/teacherch',checkUser,checkTeacher,ch)
router.get('/adminch',checkUser,checkTeacher,checkAdmin,ch)

module.exports = router;