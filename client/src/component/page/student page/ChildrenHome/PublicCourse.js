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
        navigate('/course_student/' + params)
    }

    return (
        <div className='row mt-5'>
            <label className="form-label">Public คอร์ส</label>
            <div className="row">
                <div className="">
                    {data.map((item, index) => (
                        <div key={index} className="border border-primary mt-3 p-4">
                            <div className="row">
                                <div className="">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">รหัสวิชา : {item.course_number}</p>
                                    <p className="card-text">รายละเอียด : {item.description}</p>
                                </div>
                                <div className="">

                                    <div className='d-flex justify-content-end'>
                                        <button className="btn btn-success btn-sm"
                                            onClick={() => nextToCourse(item._id)}
                                        >เข้าเรียน</button>
                                    </div>
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