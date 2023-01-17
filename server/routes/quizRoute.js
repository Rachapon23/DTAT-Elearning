const express = require('express')
const router = express.Router()

//middleware
const {checkUser,checkTeacher,checkAdmin} = require('../middleware/middleward')

const {
    create
} = require('../controllers/quizController')


router.post('/quiz/create',checkUser,checkTeacher,create)

module.exports = router;