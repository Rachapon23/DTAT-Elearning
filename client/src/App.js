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
//student
import HomePageStudent from "./component/page/student page/HomePageStudent";


import { useEffect } from "react";


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
        <Route path="/hometeacher/quiz" element={<TeacherQuiz />} />

        {/* student */}
        <Route path="/homestudent" element={<HomePageStudent />} />
      </Routes>
    </div>
  );
}

export default App;
