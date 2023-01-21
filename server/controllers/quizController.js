const Quiz = require('../models/quizModel')
const Examiner = require('../models/examinerModal')

exports.create = async (req, res) => {
    try {
        const {
            title,
            teacher
        } = req.body
        const create = new Quiz({
            title,
            teacher
        });
        await create.save();
        res.send(create)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on create quiz')
    }
}

exports.listquizby = async (req, res) => {
    try {
        const quiz = await Quiz.findOne({ _id: req.params.params }).exec()
        // console.log(req.params)
        res.send(quiz)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on list quiz By')
    }
}
exports.listquizUser = async (req, res) => {
    try {
        const {params} = req.params
        const examiner = await Examiner.find({ examiner_id : params }).populate('quiz')
        .exec()
        // console.log("papapa :: ", params)
        res.send(examiner)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on list quiz user')
    }
}
// exports.listquizbyUser = async (req, res) => {
//     try {
//         // const quiz = await Quiz.findOne({ _id: req.params.params }).exec()
//         // console.log(req.params)
//         res.send("quiz")
//     } catch (err) {
//         console.log(err)
//         res.status(500).send('Server Error!!! on list quiz By User')
//     }
// }
exports.remove = async (req, res) => {
    try {
        const quiz = await Quiz.findOneAndRemove({ _id: req.params.params }).exec()

        res.send("quiz")
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on remove Quiz')
    }
}
exports.listquiz = async (req, res) => {
    try {
        const quiz = await Quiz.find({})
            .populate('teacher')
            .exec()
        // console.log(req.params)
        res.send(quiz)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on list quiz')
    }
}

exports.createQusetion = async (req, res) => {
    try {
        // console.log(req.body)
        let qusetion = await Quiz.findOne({ _id: req.params.params }).exec()
        // const qt_push = qusetion.question_data.push(req.body.content)

        qusetion.question_data.push(req.body.value)

        const qt_push = qusetion.question_data
        const qusetion_update = await Quiz.findByIdAndUpdate(
            { _id: req.params.params },
            { question_data: qt_push }
        )
        console.log("push : ", qusetion_update)
        res.send(qusetion_update)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on createQusetion')
    }
}
exports.createExaminer = async (req, res) => {
    try {

        // const examiner = req.body
        // console.log(examiner)
        let qusetion = await Quiz.findOne({ _id: req.params.params }).exec()
        const { value } = req.body
        const arrValue = []
        const { question_data } = qusetion
        const { examiner_data } = qusetion
        for (let i = 0; i < question_data.length; i++) {
            for (let j = 0; j < value.length; j++) {
                if (i == value[j][0]) {
                    if (question_data[i].ans == value[j][1]) {


                        let quse = `qu${i + 1}`
                        arrValue.push([quse, true])
                    }
                }
                else {
                    let quse = `qu${i + 1}`
                    arrValue.push([quse, false])
                }

            }
        }
        let score = 0
        for (let i = 0; i < arrValue.length; i++) {
            if (arrValue[i][1]) {
                score = score + 1
            }
        }



        const examiner = new Examiner({
            examiner_id: req.user.user_id,
            examiner_name: req.user.fisrtname,
            score: score,
            quiz:req.params.params,
        })

        // console.log("exex :: ",examiner)

        // qusetion.examiner_data.push(exm)
        // const exm_push = qusetion.examiner_data
        // const qusetion_update = await Quiz.findByIdAndUpdate(
        //     { _id: req.params.params },
        //     { examiner_data: exm_push }
        // )
        await examiner.save()
         examiner_data.push(examiner._id)
        //  const newMiner =
        const qusetion_update = await Quiz.findByIdAndUpdate(
            { _id: req.params.params },
            { examiner_data: examiner_data }
        )
        // console.log(examiner_data)
        // console.log(examiner_data)

        res.send(examiner_data)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on createExaminer')
    }
}
