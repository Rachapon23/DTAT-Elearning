import React from 'react'
import NavTeacher from '../../../layout/NavTeacher'
import {createQuiz} from '../../../../function/funcFromTeacher'
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TeacherQuiz = () => {

  const [value, setValue] = useState({
    title:"",
    teacher:sessionStorage.getItem("user_id")
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  //  console.log(value)
  createQuiz(localStorage.getItem('token'),value)
  .then(res=>{
    console.log(res)
  })
  .catch(err=>{
    console.log(err)
  })
  };

  return (
    <div>
      <NavTeacher/>
      <div className='container'>
        <div className='mt-5'>
        <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-12">
    <label  className="form-label">หัวข้อการสอบ</label>
    <input type="text" className="form-control" name='title'
    onChange={handleChange}/>
  </div>
  <div className='d-grid'>
    <button type='submit' className='btn btn-success'>สร้างแบบทดสอบ</button>
  </div>


 
</form>
        </div>
      </div>
  
    </div>
  )
}

export default TeacherQuiz