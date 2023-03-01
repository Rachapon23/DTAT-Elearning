import React from 'react'
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import './course.css'
import NavTeacher from "../../../layout/NavTeacher";
import { getmyCourseTeacher } from '../../../../function/teacher/funcCourse';
import { useNavigate } from 'react-router-dom'

const CoursesPageteacher = () => {
    const [courses, setCourses] = useState([]);
    const [filter, setFilter] = useState("all");
    const navigate = useNavigate()

    const handlechange = (e) => {
        console.log(e.target.value)
        setFilter(e.target.value)
    }

    const fetchMyCourse = () => {
        getmyCourseTeacher(sessionStorage.getItem("token"))

            .then((response) => {
                console.log(response)
                setCourses(response.data)
            })
            .catch((err) => {
                console.log(err)
                Swal.fire(
                    "Alert!",
                    "Cannot fetch blogs data",
                    "error"
                )
            })
    }

    useEffect(() => {
        fetchMyCourse()
    }, [])



    const nextToCourse = (params) => {
        console.log(params)
        navigate('/teacher/get-course/' + params)
    }

    const createCourse = () => {
        navigate('/teacher/course')
      }

    return (
        <div>
            <NavTeacher />
            {/* {JSON.stringify(filter)} */}

            <div className="container ">
                <div className="row p-2">
                    <div className="d-flex justify-content-end mt-4 bg-addcouse p-3  shadow-sm">
                        {/* <label className='form-label'>สร้างบทเรียน +</label> */}
                        <button type='button' className='btn btn-outline-primary' onClick={createCourse}
                        >เพิ่มบทเรียน &nbsp; <i className="bi bi-folder-plus"></i>
                        </button>
                    </div>
                </div>

                <div className='row'>

                    {
                        courses.map((course, index) => (
                            <div className="col-md-6 p-2" key={index}>
                                <div className="card back-public-2 shadow-sm back-public-black-2" onClick={() => nextToCourse(course._id)}>
                                    {course.image
                                        ? <img src={`${process.env.REACT_APP_IMG}/${course.image}`} className="card-img-top w-100" />
                                        : <img src="/book-main-img-3.png" className="card-img-top w-100" />
                                    }
                                    {/* <img src={`${process.env.REACT_APP_IMG}/${course.image}`} className="card-img-top w-100" /> */}
                                    <div className="card-body ">
                                        <div className="d-flex justify-content-between">
                                            <p className="card-title mb-0">{course.name}</p>
                                            <div className="d-flex">
                                                <p className="card-title mb-0">สถานะ :</p>
                                                {course.enabled
                                                    ? <p className="card-title text-success ms-2">เปิดใช้งาน</p>
                                                    : <p className="card-title text-danger ms-2">ปิดการใช้งาน</p>
                                                }
                                            </div>

                                        </div>
                                        {/* <p id='text-p-5' className="card-text my-0">รายละเอียด : {course.description}</p> */}
                                        {/* <p id='text-p-6' className="card-text mt-1 "><i className="bi bi-hand-index"></i>&nbsp;คลิกเพื่อเข้าเรียน </p> */}
                                    </div>
                                </div>
                            </div>))
                    } </div>
            </div>
        </div>
    )
}

export default CoursesPageteacher;