// /create-calendar

const express = require('express')
const router = express.Router()

const {
    createCalendar ,
    listCalendar,
    updateCalendar,
    deleteCalendar
} = require('../controllers/calendarController')

router.post('/create-calendar',createCalendar)
router.get('/list-calendar',listCalendar)
router.put('/update-calendar',updateCalendar)
router.delete('/delete-calendar/:id',deleteCalendar)


module.exports = router;