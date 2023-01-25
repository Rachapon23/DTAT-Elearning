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
import CoursesPageteacher from "./component/page/teacher page/course/CoursesPageteacher";
import CoursePageteacher from "./component/page/teacher page/course/CoursePageteacher";



//student
import HomePageStudent from "./component/page/student page/HomePageStudent";
import Dotest from "./component/page/student page/Dotest";

import CoursesPageStudent from "./component/page/student page/CoursesPageStudent";
import CreateCoursePageTeacher from "./component/page/teacher page/course/CreateCoursePageTeacher";
import CoursePageStudent from "./component/page/student page/CoursePageStudent";
import EditCoursePageTeacher from "./component/page/teacher page/course/EditCoursePageTeacher";
import CalendarPageTeacher from "./component/page/teacher page/CalendarPageTeacher";
import UserRoute from "./route/UserRoute";



function App() {

  return (
    <div>
      <Routes>
        {/* auth */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* admin */}
        <Route path="/admin/home" element={<HomePageadmin />} />
        <Route path="/admin/list-users" element={<AlluserFromadmin />} />
        <Route path="/admin/list-students" element={<StudentFormAdmin />} />
        <Route path="/admin/list-teachers" element={<TeacherFromAdmin />} />

        {/* teacher */}
        <Route path="/teacher/home" element={<HomePageTeacher />} />
        <Route path="/teacher/create-quiz" element={<TeacherQuiz />} />
        <Route path="/teacher/create-quiz/create-question/:params" element={<Question />} />
        <Route path="/teacher/detail-quiz/:params" element={<QuizDetail />} />

        <Route path="/teacher/create-course" element={<CreateCoursePageTeacher />} />
        <Route path="/teacher/list-courses" element={<CoursesPageteacher />} />
        <Route path="/teacher/edit-course/:id" element={<EditCoursePageTeacher />} />
        <Route path="/teacher/get-course/:id" element={<CoursePageteacher />} />

        <Route path="/teacher/list-score" element={<Score />} />
        <Route path="/teacher/get-score/:params" element={<ScoreDetail />} />
        <Route path="/teacher/calendar" element={<CalendarPageTeacher />} />

        {/* student */}
        <Route path="/student/home" element={<HomePageStudent />} />
        <Route path="/student/list-courses" element={<CoursesPageStudent />} />
        <Route path="/student/get-course/:id" element={<CoursePageStudent />} />
        <Route path="/student/test/:params" element={<Dotest />} />


      </Routes>
    </div>
  );
}

export default App;
