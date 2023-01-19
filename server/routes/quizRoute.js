const express = require('express')
const router = express.Router()

//middleware
const {checkUser,checkTeacher,checkAdmin} = require('../middleware/middleward')

const {
    create,
    listquizby,
    listquiz,
    remove,
    createQusetion,
    createExaminer,
    listquizbyUser
} = require('../controllers/quizController')


router.post('/quiz/create',checkUser,checkTeacher,create)
router.get('/quiz/listquizby/:params',checkUser,checkTeacher,listquizby)
// router.get('/quiz/listquizbyuser/:params',checkUser,checkTeacher,listquizbyUser)
router.get('/quiz/listquiz',checkUser,checkTeacher,listquiz)
router.delete('/quiz/removequiz/:params',checkUser,checkTeacher,remove)
router.put('/quiz/createqusetion/:params',checkUser,checkTeacher,createQusetion)
router.put('/quiz/createexaminer/:params',checkUser,checkTeacher,createExaminer)

module.exports = router;