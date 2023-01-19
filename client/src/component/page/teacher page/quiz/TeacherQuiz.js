import React from 'react'
import NavTeacher from '../../../layout/NavTeacher'
import { createQuiz, listQuiz, removeQuiz } from '../../../../function/funcFromTeacher'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'

const TeacherQuiz = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const [value, setValue] = useState({
    title: "",
    teacher: sessionStorage.getItem("user_id")
  });
  const [dataQuiz, setDataQuiz] = useState()

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //  console.log(value)
    createQuiz(sessionStorage.getItem("token"), value)
      .then(res => {
        console.log(res)
        navigate("/teacher/quiz/" + res.data._id);
      })
      .catch(err => {
        console.log(err)
      })
  };
  const handdleDetail = (e) => {
    // e.preventDefault();
    console.log(e)
  navigate("/teacher/quizdetail/" + e);
    
  };
  useEffect(() => {
    loadData()
  }, [])
  const loadData = () => {
    setLoading(true)
    listQuiz(sessionStorage.getItem("token"))
      .then(res => {
        console.log(res)
        setDataQuiz(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }
  const remove = (params) => {
    console.log(params)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        removeQuiz(sessionStorage.getItem("token"),
          params).then(res => {
            console.log(res)
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            loadData()
          }).catch(err => {
            console.log(err)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: '<a href="">Why do I have this issue?</a>'
            })
          })

      }
    })
  }

  return (
    <div>
      <NavTeacher />
      <div className='container'>
        <div className='mt-5'>
          <div className="row">
            <div className="col-md-6">
              <label className="form-label">แบบทดสอบทั้งหมด</label>
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">ลำดับ</th>
                      <th scope="col">ชื่อแบบทดสอบ</th>
                      <th scope="col">จำนวนข้อ</th>
                      <th scope="col">ผู้สร้าง</th>
                      <th scope="col">รายละเอียด</th>
                      <th scope="col">ลบ</th>
                    </tr>
                  </thead>
                  {!loading &&
                    <tbody>
                      {dataQuiz && dataQuiz.map((item, index) =>
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.title}</td>
                          <td className='text-center'>{item.question_data.length}</td>
                          <td>{item.teacher.firstname}</td>
                          <td><a onClick={()=>handdleDetail(item._id)} class="bi bi-card-checklist text-warning"></a></td>
                          <td><i className="bi bi-trash text-danger"
                            onClick={() => remove(item._id)}
                          ></i></td>

                        </tr>
                      )}


                    </tbody>}

                  
                </table>
                {loading &&
                    <div>
                      <div className='justify-content-center '>
                        <div class="spinner-border text-primary" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </div>

                    </div>}
              </div>
            </div>
            <div className="col-md-6">
              <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-12">
                  <label className="form-label">สร้างแบบทดสอบ</label>
                  <input type="text" className="form-control" name='title'
                    onChange={handleChange} />
                </div>
                <div className='d-grid'>
                  <button type='submit' className='btn btn-success'>สร้างแบบทดสอบ</button>
                </div>



              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default TeacherQuiz