import React from 'react'
import NavTeacher from '../../layout/NavTeacher'
import { adminCH,teacherCH,studentCH } from '../../../function/auth'
import { useSelector } from "react-redux";


const HomePageTeacher = () => {

  const { user } = useSelector((state) => ({ ...state }));

const handleA = (e) => {
  e.preventDefault();
  adminCH(user.token)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
     
        console.log(err.response.data);
        
      })

};
const handleT = (e) => {
  e.preventDefault();
  teacherCH(user.token)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
     
        console.log(err.response.data);
        
      })

};
const handleS = (e) => {
  e.preventDefault();
  studentCH(user.token)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
     
        console.log(err.response.data);
        
      })

};

  return (
    <div>
      <NavTeacher/>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <div className="justify-content-center">
                  <button className="btn btn-danger"
                  onClick={handleA}>
                    ADMIN CHEECK
                  </button>
                </div>
              </div>
              <div className="col-md-4">
                <div className="justify-content-center">
                  <button className="btn btn-primary"
                  onClick={handleT}>>
                    TEACHER CHEECK
                  </button>
                </div>
              </div>
              <div className="col-md-4">
                <div className="justify-content-center">
                  <button className="btn btn-success"
                  onClick={handleS}>>
                   STUDENT CHEECK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePageTeacher