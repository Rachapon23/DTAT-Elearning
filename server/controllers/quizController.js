const Quiz = require('../models/quizModel')

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
      const quiz = await Quiz.findOne({_id:req.params.params}).exec()
    // console.log(req.params)
        res.send(quiz)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on list quiz By')
    }
}
exports.remove = async (req, res) => {
    try {
      const quiz = await Quiz.findOneAndRemove({_id:req.params.params}).exec()
   
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
        let qusetion = await Quiz.findOne({_id:req.params.params}).exec()
        // const qt_push = qusetion.question_data.push(req.body.content)
       
        qusetion.question_data.push(req.body.value)

 const qt_push = qusetion.question_data
         const qusetion_update = await Quiz.findByIdAndUpdate(
                {_id:req.params.params},
                {question_data:qt_push}
            )
        console.log("push : ",qusetion_update)
        res.send(qusetion_update)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on createQusetion')
    }
}
