const express = require('express')
const router = express.Router()

//middleware
const {checkUser,checkTeacher,checkAdmin} = require('../middleware/middleward')

const {
    // create,
    listquizby,
    // listquiz,
    remove,
    getQuiz,
    // createQusetion,
    // createExaminer,
    // // listquizbyUser,
    // listquizUser
    createQuiz,
    listQuiz,
    updateQuiz,
    createExaminer
} = require('../controllers/quizController')


// router.post('/quiz/create',checkUser,checkTeacher,create)

// router.get('/quiz/listquizby/:params',checkUser,listquizby)
// router.get('/quiz/listquizuser/:params',checkUser,listquizUser)
// // router.get('/quiz/listquizbyuser/:params',checkUser,checkTeacher,listquizbyUser)
// router.get('/quiz/listquiz',checkUser,listquiz)
// router.delete('/quiz/removequiz/:params',checkUser,checkTeacher,remove)
// router.put('/quiz/createqusetion/:params',checkUser,checkTeacher,createQusetion)
// router.put('/quiz/createexaminer/:params',checkUser,createExaminer)


// teacher
router.post('/quiz/create',createQuiz)
router.get('/quiz/list-teacher',checkUser,listQuiz)
router.get('/quiz/get-quiz/:id',getQuiz)
router.delete('/quiz/remove-quiz/:params',remove)
router.put("/quiz/update-quiz", updateQuiz);

//student
router.get('/quiz/list-quiz-by/:params',listquizby)

module.exports = router;