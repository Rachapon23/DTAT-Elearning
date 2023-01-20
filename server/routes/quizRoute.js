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
    // listquizbyUser,
    listquizUser
} = require('../controllers/quizController')


router.post('/quiz/create',checkUser,checkTeacher,create)

router.get('/quiz/listquizby/:params',checkUser,listquizby)
router.get('/quiz/listquizuser/:params',checkUser,listquizUser)
// router.get('/quiz/listquizbyuser/:params',checkUser,checkTeacher,listquizbyUser)
router.get('/quiz/listquiz',checkUser,listquiz)
router.delete('/quiz/removequiz/:params',checkUser,checkTeacher,remove)
router.put('/quiz/createqusetion/:params',checkUser,checkTeacher,createQusetion)
router.put('/quiz/createexaminer/:params',checkUser,createExaminer)

module.exports = router;