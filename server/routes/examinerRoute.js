const express = require("express");
const router = express.Router();
const {createExaminer, getAccessNumber, listScore} = require("../controllers/examinerController")

router.post('/quiz/send-quiz', createExaminer)
router.post("/quiz/get-access-number", getAccessNumber)
router.post("/quiz/list-score", listScore)

module.exports = router;