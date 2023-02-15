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
            {/* {data.map((item, index) => (
                <div className="col-md-6 mb-2" key={index}>
                    <div className="card back-public"
                        onClick={() => nextToCourse(item._id)}
                    >
                        <div className="h-100 w-100">  </div>
                        <div className="card-body  back-public-black ">
                            <h5 id='text-p-1' className="card-title">{item.name}</h5>

                            <p id='text-p-2' className="card-text ">รายละเอียด : {item.description}</p>
                            <img src={`${process.env.REACT_APP_IMG}/${item.image}`} width="100%" />
                            <p id='text-p-3' className="card-text mt-2 "><i className="bi bi-hand-index"></i>&nbsp;คลิกเพื่อเข้าเรียน </p>
                        </div>
                    </div>

                </div>
            ))} */}

            {data.map((item, index) => (
                <div className="col-md-6 mb-2 " key={index}>
                    {item.image
                        ? <div className="card back-public-2 shadow-sm back-public-black-2" onClick={() => nextToCourse(item._id)}>
                            <img src={`${process.env.REACT_APP_IMG}/${item.image}`} width="100%" className="card-img-top size-150" />
                            <div className="card-body ">
                                <p id='text-p-4' className="card-title mb-0">{item.name}</p>
                                <p id='text-p-5' className="card-text my-0">รายละเอียด : {item.description}</p>
                                <p id='text-p-6' className="card-text mt-1 "><i className="bi bi-hand-index"></i>&nbsp;คลิกเพื่อเข้าเรียน </p>
                            </div>
                        </div>
                        : <div className="card back-public-2 shadow-sm back-public-black-2" onClick={() => nextToCourse(item._id)}>
                            <div className="img-fact"></div>
                            <div className="card-body ">
                                <p id='text-p-4' className="card-title mb-0">{item.name}</p>
                                <p id='text-p-5' className="card-text my-0">รายละเอียด : {item.description}</p>
                                <p id='text-p-6' className="card-text mt-1 "><i className="bi bi-hand-index"></i>&nbsp;คลิกเพื่อเข้าเรียน </p>
                            </div>
                        </div>

                    }

                </div>
            ))}

        </div>
    )
}

export default PublicCourse