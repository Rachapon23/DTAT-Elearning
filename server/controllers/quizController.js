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

        //create
        await create.save();
        res.send(create)

    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on create quiz')
    }
}
