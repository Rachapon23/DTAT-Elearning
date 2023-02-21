
const Quize = require('../models/quize')


// exports.listquizUser = async (req, res) => {
//     try {
//         const {params} = req.params
//         const examiner = await Examiner.find({ examiner_id : params }).populate('quiz')
//         .exec()
//         // console.log("papapa :: ", params)
//         res.send(examiner)
//     } catch (err) {
//         console.log(err)
//         res.status(500).send('Server Error!!! on list quiz user')
//     }
// }
exports.getQuiz = async (req, res) => {
    try {
        const quiz = await Quize.findOne({ _id: req.params.id }).exec()
        // console.log(req.params)
        res.send(quiz)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on list quiz get Quiz')
    }
}

exports.remove = async (req, res) => {
    try {
        // console.log(req.params)
        const quiz = await Quize.findOneAndRemove({ _id: req.params.params }).exec()
        res.send(quiz)

    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on remove Quiz')
    }
}
exports.updateQuiz = async (req, res) => {
    try {
        // const quiz = await Quiz.find({})
        //     .populate('teacher')
        //     .exec()
        console.log(req.body)


        const { head, body } = req.body
        // console.log(head,body)

        const course = await Quize.findOneAndUpdate(
            { _id: head._id }
            , {
                new: true,
                name: head.name,
                explanation: head.explanation,
                question: body
            },


        ).exec()


        res.send("update success")
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on update quiz')
    }
}


exports.createQuiz = async (req, res) => {
    try {
        const {head,body} = req.body
        console.log(head,body)

        const quiz = new Quize({
            name:head.name,
            explanation:head.explanation,
            question:body,
            access_number: head.attemp,
            teacher:head.teacher
        })
        await quiz.save()
        res.send('create success')
      
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on createQuiz')
    }
}
exports.listQuiz = async (req, res) => {
    try {
        const {user_id} = req.user

        const quizzs = await Quize.find({teacher:user_id}).exec()
      
        console.log(quizzs)
        let payload = [];
        quizzs.forEach((quiz, index) => {
            payload.push({
                index: index + 1,
                key: quiz._id,
                name: quiz.name,
                explanation: quiz.explanation,
                access_number: quiz.access_number,
                noq: quiz.question.length,
            })
        })
        res.send(payload)
      
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on listQuiz')
    }
}

exports.listquizby = async (req, res) => {
    try {
        const quiz = await Quize.findOne({ _id: req.params.params }).exec()
        res.send(quiz)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on list quiz By')
    }
}