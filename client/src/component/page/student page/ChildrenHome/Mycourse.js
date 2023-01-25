import React from 'react'
import { deleteMyCourse } from '../../../../function/funcFromStudent'
import Swal from 'sweetalert2'
import { Navigate, useNavigate } from 'react-router-dom'



const Mycourse = ({ data, loadMycourse }) => {

  const navigate = useNavigate()

  const handleRemove = (id) => {
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
        deleteMyCourse(sessionStorage.getItem("user_id"), id).then(res => {
          console.log(res)
          loadMycourse()
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }).catch(err => {
          console.log(err)
        })

      }
    })


  }
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
                <div className="card mt-3"  onClick={()=>nextToCourse(item._id)}
                //  style={{ width: "20rem" }}
                 >
                  <img src="https://cdn.pixabay.com/photo/2015/11/15/07/47/geometry-1044090_960_720.jpg" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">รหัสวิชา : {item.course_number}</p>
                   
                    <div className='d-flex justify-content-between'>
                      {/* <button className="btn btn-success btn-sm"
                      onClick={()=>nextToCourse(item._id)}
                      >เข้าเรียน</button> */} 
                      <p className="card-text">รายละเอียด : {item.description}</p>
                      <button className="btn btn-danger btn-sm"
                        onClick={() => handleRemove(item._id)}>ลบ</button>
                    </div>

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