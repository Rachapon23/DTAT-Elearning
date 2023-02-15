
const User = require('../models/userModel')
const Course = require('../models/course')
const ResetPassword = require("../models/resetPassword")
const nodeMailer = require("nodemailer")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ObjectId = require('mongoose').Types.ObjectId;

//สมัครสมาชิก
exports.register = async(req,res)=>{
    try{
        const {
            employee_ID,
            password,
            department_ID,
            firstname,
            lastname,
        } = req.body

        //ตรวจสอบว่าเป็นสมาชิกหรือยัง
        let user = await User.findOne({employee_ID})
        if(user){
            return res.status(400).send("User already");
        }

        user = new User({
            employee_ID,
            password,
            department_ID,
            firstname,
            lastname,
        });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        //register
        await user.save();
        res.send('register Success')

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error!!! on Register')
    }
}

//เข้าสู่ระบบ
exports.login = async (req, res) => {
    try {
      const { employee_ID, password } = req.body;

      var user = await User.findOneAndUpdate({ employee_ID }, { new: true });
      if (user && user.enabled) {

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
  
        if (!isMatch) {
          return res.status(400).send("Password Invalid!!!");
        }

        // user_id = user._id.toString();
        const Payload = {
          user: {
            fisrtname: user.firstname,
            role: user.role,
            user_id: user._id,
          },
        };

        // Generate Token Time_limit( 1 day )
        jwt.sign(Payload, "jwtSecret", { expiresIn: '1d' }, (err, token) => {
          if (err) throw err;
          res.json({ token, Payload });
        });
      } 
      else if(user.enabled === false) {
        return res.status(400).send("User not active!!! Please contact admin");
      }
      else {
        return res.status(400).send("User not found!!!");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error!!! on Login");
    }
  };
  

  //ตรวจสอบผู้ใช้ปัจจุบัน
  exports.currentUser = async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user.user_id })
        .select("-password")
        .exec();
      console.log("USer: ",user)
      res.send(user);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error!!! on current user");
    }
  };
  
exports.getTeacherByCourseId = async (req, res) => {
    try {
      const {course_id} = req.body
      const course = await Course.findOne({_id: course_id})
      .populate("teacher")
      .select("-password")
      .exec();
      // console.log(course)
      let data = {
        _id: course.teacher._id,
        firstname: course.teacher.firstname,
        lastname: course.teacher.lastname,
      }
      res.send(data);
    } 
    catch (err) {
      console.log(err);
      res.status(500).send("Server Error!!! on get teacher by ID");
    }
};

exports.sendEmail = async (req, res) => {
    try {
      const {email} = req.body
      console.log(email)

      const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'densoeleaning@gmail.com',
          pass: 'hqqabmpdjxmqsevf'
        }
      });

      const token = jwt.sign({email: email}, "jwtSecret", { expiresIn: '5m' });
      const reset_password_data = new ResetPassword({
        email: email, 
        token: token,
        is_used: false
      })
      await reset_password_data.save()

      var mailOptions = {
        from: 'densoeleaning@gmail.com',
        to: email,
        subject: 'Sending Email using Node.js',
        html: `
              <html>
              <h1> Click the button below to link to reset password page <h1>
              <a href="http://localhost:3000/reset-password/${token}"> click </a>
              </html>
              `
      };

      await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.send("send email success")
        }
      });

      
    }
    catch(err) {
      console.log(err);
      res.status(500).send("Server Error!!! on send email");
    }
}

exports.resetPassword = async (req, res) => {
    try {
      const userEmail = req.body.email;
      const decoded = jwt.verify(req.headers.authtoken,"jwtSecret");
      const tokenEmail = decoded.email;

      const reset_password_data = await ResetPassword.findOne({token: req.headers.authtoken}).exec()
      console.log(reset_password_data)
      if(reset_password_data) {
        if(reset_password_data.is_used){
          res.status(500).send("cannot reset password because previous token is not expire")
        }
      }
      else {
        res.status(500).send("must send rest password request first")
      }

      if(userEmail === tokenEmail) {
        await ResetPassword.findOneAndDelete({token: req.headers.authtoken}).exec()
        res.send("OK")
      }
      else {
        res.status(500).send("Entered email does not match with email that server send")
      }

      
    }
    catch(err) {
      console.log(err);
      res.status(500).send("Server Error!!! invalid token");
    }
}

exports.checkToken = (req, res) => {
  try {
    console.log(req.headers)
    jwt.verify(req.headers.authtoken,"jwtSecret", (err, _) => {
      if (err) res.json({isValid: false});
      res.json({isValid: true});
    });

  }
  catch(err) {
    console.log(err);
    res.status(500).send("Server Error!!! invalid token");
  }
}