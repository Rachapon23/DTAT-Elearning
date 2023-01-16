import React from "react";
import { login } from "../../function/auth";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate, location } from "react-router-dom";

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
        Swal.fire("erroe", err.response.data, "error");
      });
  };

  //ไปที่ page ตาม role
  const roleBaseRedirect = (role) => {
    if (role === "admin") {
      navigate("/homeadmin");
    } else if (role === "teacher") {
      navigate("/hometeacher");
    } else {
      navigate("/homestudent");
    }
  };

  useEffect(() => {

    if (sessionStorage.length != 0) {
      if (sessionStorage.getItem("role") === "admin") {
        navigate("/homeadmin");
      } else if (sessionStorage.getItem("role") === "teacher") {
        navigate("/hometeacher");
      } else {
        navigate("/homestudent");
      }
    }
  }, [])

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
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
        <div className="col-md-8"></div>
      </div>
    </div>
  );
};

export default Login;
