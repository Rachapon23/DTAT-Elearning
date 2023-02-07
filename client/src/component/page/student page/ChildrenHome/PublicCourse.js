import React from 'react'
import { publicCourses } from '../../../../function/student/funcCourse'
import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import '../student.css'

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
                        <div className="col-md-12 mb-2" key={index}>
                        <div className="card"
                          onClick={()=>nextToCourse(item._id)}
                         >
                          <div className="card-body body-card">
                            <h5 className="card-title">{item.name}</h5>
               
                            <p className="card-text text-muted">รายละเอียด : {item.description}</p>
                            <p style={{fontSize:'12px'}} className="card-text text-muted"><i className="bi bi-hand-index"></i>&nbsp;คลิกเพื่อเข้าเรียน </p>
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