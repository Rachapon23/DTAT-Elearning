const express = require('express')
const router = express.Router()

//middleware
const {checkUser,checkAdmin,checkTeacher} = require('../middleware/middleward')

const {
    listAlluser,
} = require('../controllers/adminController')

router.get('/listalluser',listAlluser)

module.exports = router;