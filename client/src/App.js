//rote
import { Routes, Route } from "react-router-dom";
// import UserRoute from "./route/UserRoute";
// import TeacherRoute from "./route/TeacherRoute";
// import AdminRoute from "./route/AdminRoute";
//auth
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import { useDispatch } from "react-redux";
import { currentUser } from "../src/function/auth";
//admin
import HomePageadmin from "./component/page/admin page/HomePageAdmin";
//teacher
import HomePageTeacher from "./component/page/teacher page/HomePageTeacher";
//student
import HomePageStudent from "./component/page/student page/HomePageStudent";
import CoursesPageStudent from "./component/page/student page/CoursesPageStudent";

function App() {
  const idtoken = localStorage.token;
  const dispatch = useDispatch();
  // ตรวจสอบ user คนปัจจุบัน
  if (idtoken) {
    currentUser(idtoken)
      .then((res) => {
        console.log("in app",res)
        dispatch({
          type: "LOGIN",
          payload: {
            token: idtoken,
            firstname: res.data.firstname,
            user_id: res.data._id,
            role: res.data.role,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("not get token");
  }

  return (
    <div>
      <Routes>
        {/* auth */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* admin */}
        <Route path="/homeadmin" element={<HomePageadmin />} />

        {/* teacher */}
        <Route path="/hometeacher" element={<HomePageTeacher />} />

        {/* student */}
        <Route path="/homestudent" element={<HomePageStudent />} />
        <Route path="/courses_student" element={<CoursesPageStudent />} />
      </Routes>
    </div>
  );
}

export default App;
