//rote
import { Routes, Route } from "react-router-dom";
// import UserRoute from "./route/UserRoute";
// import TeacherRoute from "./route/TeacherRoute";
// import AdminRoute from "./route/AdminRoute";
//auth
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import { currentUser } from "../src/function/auth";
//admin
import HomePageadmin from "./component/page/admin page/HomePageAdmin";
import AlluserFromadmin from "./component/page/admin page/AlluserFromadmin";
import StudentFormAdmin from "./component/page/admin page/StudentFormAdmin";
import TeacherFromAdmin from "./component/page/admin page/TeacherFromAdmin";

//teacher
import HomePageTeacher from "./component/page/teacher page/HomePageTeacher";
import TeacherQuiz from './component/page/teacher page/quiz/TeacherQuiz'
import Question from "./component/page/teacher page/quiz/Question";
import QuizDetail from "./component/page/teacher page/quiz/QuizDetail";
import Score from "./component/page/teacher page/score/Score";
import ScoreDetail from "./component/page/teacher page/score/ScoreDetail";
//test
import Test from "./component/page/teacher page/test/Test";
import Dotest from "./component/page/teacher page/test/Dotest";
//student
import HomePageStudent from "./component/page/student page/HomePageStudent";

import CoursesPageStudent from "./component/page/student page/CoursesPageStudent";
import CreateCoursePageTeacher from "./component/page/teacher page/CreateCoursePageTeacher";
import CoursePageStudent from "./component/page/student page/CoursePageStudent";



function App() {


  return (
    <div>
      <Routes>
        {/* auth */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* admin */}
        <Route path="/homeadmin" element={<HomePageadmin />} />
        <Route path="/homeadmin/listalluser" element={<AlluserFromadmin />} />
        <Route path="/homeadmin/lisstudentuser" element={<StudentFormAdmin />} />
        <Route path="/homeadmin/listteacheruser" element={<TeacherFromAdmin />} />

        {/* teacher */}
        <Route path="/hometeacher" element={<HomePageTeacher />} />

        <Route path="/teacher/quiz" element={<TeacherQuiz />} />
        <Route path="/teacher/test" element={<Test />} />
        <Route path="/teacher/test/:params" element={<Dotest />} />
        <Route path="/teacher/quiz/:params" element={<Question />} />
        <Route path="/teacher/quizdetail/:params" element={<QuizDetail />} />
       
        <Route path="/hometeacher/quiz" element={<TeacherQuiz />} />
        <Route path="/create_course_teacher" element={<CreateCoursePageTeacher />} />

 <Route path="/teacher/score" element={<Score />} />
 <Route path="/teacher/score/:params" element={<ScoreDetail />} />

        {/* student */}
        <Route path="/homestudent" element={<HomePageStudent />} />
        <Route path="/courses_student" element={<CoursesPageStudent />} />
        <Route path="/course_student/:id" element={<CoursePageStudent />} />


      </Routes>
    </div>
  );
}

export default App;
