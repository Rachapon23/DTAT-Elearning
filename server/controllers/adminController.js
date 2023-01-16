const User = require('../models/userModel')

exports.listAlluser = async (req, res) => {
    try {
        const user = await User.find({})
            .select("-password")
            .exec();
        // console.log("User: ", user)
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!!! on liastAlluser");
    }
};

