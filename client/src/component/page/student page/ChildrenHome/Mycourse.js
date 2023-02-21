import React from 'react'
import Swal from 'sweetalert2'
import { Navigate, useNavigate } from 'react-router-dom'
import '../student.css'



const Mycourse = ({ item, loadMycourse }) => {

  const navigate = useNavigate()

  const nextToCourse = (params) => {
    console.log(params)
    if(item.enabled){
       navigate('/student/get-course/' + params)
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'บทเรียนนี้ถูกปิดอยู่ในขณะนี้ กรุณมาเข้ามาใหม่ภายหลัง',
      })
    }
   
  }

  return (

              <div className="col-md-3" >
                {item.image
                  ? <div className="card mt-3 card-h back-public-2 shadow-sm back-public-black-2" onClick={() => nextToCourse(item._id)}>
                    <img src={`${process.env.REACT_APP_IMG}/${item.image}`} className="card-img-top resize " />
                    <div className="card-body ">
                      <h5 className="card-title">{item.name}</h5>
                      <p style={{ fontSize: '14px' }} className="card-text text-muted mb-0">รหัสวิชา : {item.course_number}</p>
                      <p style={{ fontSize: '14px' }} className="card-text text-muted">รายละเอียด : {(item.description.substring(0, 45))}...</p>
                    </div>
                  </div>
                  : <div className="card mt-3 card-h back-public-2 shadow-sm back-public-black-2" onClick={() => nextToCourse(item._id)}>
                    <div className="img-fact-2"></div>
                    <div className="card-body ">
                      <h5 className="card-title">{item.name}</h5>
                      <p style={{ fontSize: '14px' }} className="card-text text-muted mb-0">รหัสวิชา : {item.course_number}</p>
                      <p style={{ fontSize: '14px' }} className="card-text text-muted">รายละเอียด : {(item.description.substring(0, 45))}...</p>
                    </div>
                  </div>
                }
              </div>
           
  )
}

export default Mycourse