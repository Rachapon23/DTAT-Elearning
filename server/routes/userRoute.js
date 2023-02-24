const express = require('express')
const router = express.Router()
/* Multer  */
const multer = require('multer')
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
    checkRole,
    getMyaccount,
    uploadProfile,
    updateProfile
} = require('../controllers/userController')

/* Multer  */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, 'file-' + Date.now() + '.' +
            file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
})
const upload = multer({ storage: storage }).single('file')
/* Multer  */

// สมัครสมาชิก
router.post('/register',register)
// เข้าสู่ระบบ
router.post('/login',login)
// forgot password
router.post('/send-email', checkUser, sendEmail)
router.post('/reset-password', checkUser, resetPassword)
router.post('/check-token', checkUser, checkToken)
// ตรวจสอบผู้ใช้ปัจจุบัน
router.post('/current-user',checkUser,currentUser)

router.post('/current-teacher',checkUser,checkTeacher,currentUser)


router.post('/current-admin',checkUser,checkAdmin,currentUser)
router.post('/get_teacher_by_course_id', checkUser, getTeacherByCourseId)


router.get('/check-role',checkUser,
// checkTeacher,
checkRole
)
router.get('/get-myaccount',checkUser,getMyaccount)
router.post('/upload-profile',checkUser,upload,uploadProfile)
router.post('/update-profile',checkUser,updateProfile)



module.exports = router;