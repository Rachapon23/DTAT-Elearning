import React from 'react'
import NavTeacher from '../../../layout/NavTeacher'
import { useState, useEffect } from 'react'
import { listQuiz,removeQuiz } from "../../../../function/teacher/funcQuiz";
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";

const Listquiz = () => {

  const [dataquiz, setDataQuiz] = useState([]);
  const navigate = useNavigate()

  const loadQuiz = () => {
    listQuiz(
      sessionStorage.getItem("token"),
      sessionStorage.getItem('user_id')
    )
      .then(res => {
        // console.log(res.data)
        setDataQuiz(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const createQuiz = () => {
    navigate('/teacher/quiz')
}

  useEffect(() => {
    loadQuiz()
  }, [])

  const handleRemoveQuiz = (id) =>{
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
        removeQuiz(sessionStorage.getItem("token"), id)
        .then(res => {
            console.log(res)
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            loadQuiz()
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
  const handleEditQuiz = (id) =>{
    navigate('/teacher/edit-quiz/'+id)
  }

  return (
    <div>
      <NavTeacher />
      <div className="container">
        <div className="mt-5">
          <div className="card">
            <div className="card-body">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">ลำดับ</th>
                    <th scope="col">ชื่อแบบทดสอบ</th>
                    <th scope="col">จำนวนข้อ</th>
                    <th scope="col">แก้ไข</th>
                    <th scope="col">ลบ</th>
                  </tr>
                </thead>
                <tbody>
                  {dataquiz.map((item, index) =>
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.question.length}</td>
                      <td><i onClick={()=>handleEditQuiz(item._id)}
                       className="bi bi-pencil-square text-warning"></i></td>
                      <td><i onClick={()=>handleRemoveQuiz(item._id)}
                      className="bi bi-trash text-danger"></i></td>
                    </tr>
                  )}


                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="d-grid mt-3">
          <button onClick={createQuiz} className="btn btn-success">สร้างแบบทดสอบ</button>
        </div>
      </div>
    </div>
  )
}

export default Listquiz