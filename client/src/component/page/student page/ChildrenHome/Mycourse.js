import React from 'react'
import Swal from 'sweetalert2'
import { Navigate, useNavigate } from 'react-router-dom'
import '../student.css'



const Mycourse = ({ data, loadMycourse }) => {

  const navigate = useNavigate()

  const nextToCourse = (params) =>{
console.log(params)
navigate('/student/get-course/'+params)
  }

  return (
    <div>
      <div className="row">

        <div className="col-md-12">
          <div className="row">
            {data && data.map((item, index) =>
              <div className="col-md-3" key={index}>
                <div className="card mt-3 card-h"  onClick={()=>nextToCourse(item._id)}
                //  style={{ width: "20rem" }}
                 >
                  <img src="https://cdn.pixabay.com/photo/2015/11/15/07/47/geometry-1044090_960_720.jpg" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>

                    <p style={{fontSize:'14px'}} className="card-text text-muted mb-0">รหัสวิชา : {item.course_number}</p>
                    <p style={{fontSize:'14px'}} className="card-text text-muted">รายละเอียด : {(item.description.substring(0,45))}...</p>

                     
                      {/* <button className="btn btn-danger btn-sm"
                        onClick={() => handleRemove(item._id)}>ลบ</button> */}


                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        {/*  */}
      </div>
    </div>
  )
}

export default Mycourse