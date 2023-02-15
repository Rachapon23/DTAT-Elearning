const express = require("express");
const router = express.Router();

/* Multer  */
const multer = require('multer')


const {
    listCourses,
    createCourse,
    searchCourse,
    addCourse,
    getMyCourse,
    getCourse,
    publicCourses,
    deleteMyCourse,
    getMyCourseTeacher,
    updateCourse,
    deleteCourse,
    getRoom,
    createRoom,
    uploadimg,
    updateimg
} = require("../controllers/courseController");


/* Multer  */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, 'file-' + Date.now() + '.' +
            file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
})
const upload = multer({ storage: storage }).single('file')
/* Multer  */




// // teacher
router.post("/upload-img",upload,uploadimg);
router.post("/update-img",upload,updateimg);


router.post("/create-course", createCourse);
router.put("/update-course", updateCourse);
router.get("/list-courses", listCourses);
router.delete("/delete-courses/:id", deleteCourse);
router.get("/get-mycourse-teacher/:id", getMyCourseTeacher);
router.get("/list-room", getRoom);
router.post("/create-room", createRoom);

// student
router.post("/searchcourse", searchCourse);
router.post("/addchcourse", addCourse);
router.post("/get-my-course/:id", getMyCourse);
router.post("/get-course/:id", getCourse);
router.get("/list-public-courses", publicCourses);
router.post("/delete-my-course/:id", deleteMyCourse);


module.exports = router