import React from "react";
import { login } from "../../function/auth";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate, location } from "react-router-dom";
import './auth.css'
const Login = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState({
    employee_ID: "",
    password: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(value)
      .then((res) => {
        console.log(res.data);
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("firstname", res.data.Payload.user.fisrtname)
        sessionStorage.setItem("user_id", res.data.Payload.user.user_id)
        sessionStorage.setItem("role", res.data.Payload.user.role)

        roleBaseRedirect(res.data.Payload.user.role);
      })
      .catch((err) => {
        Swal.fire("error", err.response.data, "error");
      });
  };

  //ไปที่ page ตาม role
  const roleBaseRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin/home");
    } else if (role === "teacher") {
      navigate("/teacher/home");
    } else {
      navigate("/student/home");
    }
  };

  useEffect(() => {

    if (sessionStorage.length != 0) {
      if (sessionStorage.getItem("role") === "admin") {
        navigate("/admin/home");
      } else if (sessionStorage.getItem("role") === "teacher") {
        navigate("/teacher/home");
      } else {
        navigate("/student/home");
      }
    }
  }, [])

  return (
    <div className="">
      <nav class="navbar">

       <div className="arrow-d1 w-75 h-100"></div>
        <div className="arrow-d2 w-25 h-100"></div>

        <div className="container">
          <a class="navbar-brand text-white brand" href="/">E-learning</a>
        </div>

      </nav>
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <div className="card w-75">
            <div className="card-body">
              <h3 className="text-center my-4">เข้าสู่ระบบ</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">รหัสพนักงาน</label>
                  <input
                    className="form-control"
                    type="text"
                    name="employee_ID"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="form-label">รหัสผ่าน</label>
                  <input
                    className="form-control"
                    type="text"
                    name="password"
                    onChange={handleChange}
                  />
                </div>

                <br />
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-outline-primary">
                    เข้าสู่ระบบ
                  </button>
                </div>
              </form>
              <div className="d-flex justify-content-between">
                <a className="text-muted">ลืมรหัสผ่าน</a>
                <a className="text-muted" href="register">
                  สมัครสมาชิก
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
