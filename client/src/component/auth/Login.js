import React from "react";
import { login } from "../../function/auth";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import './auth.css'
import { sendEmail } from "../../function/auth";
import { checkRole } from "../../function/teacher/funcMiscellaneous";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState({});
  const [isModalOpen, setIsMoalOpen] = useState(false);

  const [value, setValue] = useState({
    employee_ID: "",
    password: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleEmail = (e) => {
    setEmail({...email, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login(value)
      .then((res) => {
        console.log(res.data);
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("firstname", res.data.Payload.user.fisrtname)
        sessionStorage.setItem("user_id", res.data.Payload.user.user_id)
        // sessionStorage.setItem("role", res.data.Payload.user.role)

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

    console.log(!!sessionStorage.getItem('token'))
    if(!!sessionStorage.getItem('token')){
      checkRole(sessionStorage.getItem("token"))
      .then(res => {
        console.log(res)
      if (res.data === "admin") {
        navigate("/admin/home");
      } else if (res.data === "teacher") {
        navigate("/teacher/home");
      } else {
        navigate("/student/home");
      }


      }).catch(err => {
        console.log(err)

      })
    }
    // if (sessionStorage.length != 0) {
    //   if (sessionStorage.getItem("role") === "admin") {
    //     navigate("/admin/home");
    //   } else if (sessionStorage.getItem("role") === "teacher") {
    //     navigate("/teacher/home");
    //   } else {
    //     navigate("/student/home");
    //   }
    // }
  }, [])

  const handleSendEmail = (e) => {
    e.preventDefault();
    console.log(email); 
    sendEmail(email)
      .then((res) => {
        console.log(res);
        Swal.fire(
          'Success',
          'Send Email Success',
          'success'
        )
      // navigate("/");
      })
      .catch((err) => {
        Swal.fire(
          'error',
          err.response.data,
          'error'
        )
      })
  }

  const showModal = () => {
    setIsMoalOpen(true);
  }

  const closeModal = () => {
    setIsMoalOpen(false);
  }

  return (
    <div className="">
      <nav className="navbar navbar-light  bg-nav">
        <div className="container">
          <a className="navbar-brand text-white brand" href="/">E-learning</a>
        </div>

      </nav>
      <div className="black-g">
        <div className="container">
          <div className="d-flex justify-content-center">
            <div className="card w-75  mt-5">
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

                  <a className="text-muted" onClick={showModal}>ลืมรหัสผ่าน</a>

                  <Modal title="Reset Password" open={isModalOpen} onOk={handleSendEmail} onCancel={closeModal}>
                    <div className="form-group mt-3">
                      <label className="form-label"> Email </label>
                      <input
                        className="form-control"
                        type="text"
                        name="email"
                        onChange={handleEmail}
                      />
                    </div>

                  </Modal>

                  <a className="text-muted" href="register">
                    สมัครสมาชิก
                  </a>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
