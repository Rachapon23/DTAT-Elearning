import React from 'react'
import { publicCourses } from '../../../../function/funcFromStudent'
import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'


const PublicCourse = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])

    const loadData = () => {
        publicCourses().then(res => {
            console.log(res)
            setData(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        loadData()
    }, [])

    const nextToCourse = (params) => {
        console.log(params)
        navigate('/student/get-course/' + params)
    }

    return (
        <div className='row'>
            <div className="row">
                <div className="">
                    {data.map((item, index) => (
                        <div className="col-md-12" key={index}>
                        <div className="card"
                          onClick={()=>nextToCourse(item._id)}
                         >
                          {/* <img style={{ height: "225px" ,width:"100%" }}
                           src="https://cdn.pixabay.com/photo/2016/04/04/14/12/monitor-1307227_960_720.jpg" className="card-img-top" alt="..." /> */}
                          <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">รหัสวิชา : {item.course_number}</p>
                            <p className="card-text">รายละเอียด : {item.description}</p>
                            {/* <div className='d-flex justify-content-between'>
                              <button className="btn btn-success btn-sm"
                              onClick={()=>nextToCourse(item._id)}
                              >เข้าเรียน</button>
                 
                            </div> */}
        
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PublicCourse