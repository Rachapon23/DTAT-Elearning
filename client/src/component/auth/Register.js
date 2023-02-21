import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../../function/auth";
import Swal from 'sweetalert2'
import './auth.css'
const Register = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    employee_ID: "",
    department_ID: "",
    password: "",
    repassword: "",
    firstname: "",
    lastname: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(value); 
    if (value.password != value.repassword) {
      Swal.fire(
        'รหัสผ่านไม่ตรงกัน',
        'รหัสผ่านไม่ตรงกัน',
        'error'
      )
    } else {
      register(value)
        .then((res) => {
          console.log(res);
          Swal.fire(
            'สำเร้จ',
            'สมัครสมาชิกสำเร็จ',
            'success'
          )
          navigate("/");
        })
        .catch((err) => {
          Swal.fire(
            'erroe',
            err.response.data,
            'error'
          )
        });

    }
  };
  return (
    <div>
      <nav className="navbar navbar-light  bg-nav">
        <div className="container">
          <a className="navbar-brand text-white brand" href="/">E-learning</a>
        </div>

      </nav>
      <div className="black-g">
        <div className="container mt-5">
          <div className="d-flex justify-content-center">
            <div className="container">
              <div className="card">
                <div className="card-body p-5">
                  <h3 className="text-center">สมัครสมาชิก</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="form-group col-md-6 mt-3">
                        <label className="form-label">รหัสพนักงาน</label>
                        <input
                          className="form-control"
                          type="text"
                          name="employee_ID"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group col-md-6 mt-3">
                        <label className="form-label">รหัสแผนก</label>
                        <input
                          className="form-control"
                          type="text"
                          name="department_ID"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6 mt-3">
                        <label className="form-label">รหัสผ่าน</label>
                        <input
                          className="form-control"
                          type="text"
                          name="password"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group col-md-6 mt-3">
                        <label className="form-label">ยืนยันรหัสผ่าน</label>
                        <input
                          className="form-control"
                          type="text"
                          name="repassword"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6 mt-3">
                        <label className="form-label">ชื่อ</label>
                        <input
                          className="form-control"
                          type="text"
                          name="firstname"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group col-md-6 mt-3">
                        <label className="form-label">นามสกุล</label>
                        <input
                          className="form-control"
                          type="text"
                          name="lastname"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <br />
                    <div className="d-flex justify-content-center mt-4">
                      <button type="submit" className="btn btn-outline-success">
                        สมัครสมาชิก
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
