import React from 'react'
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
<<<<<<< HEAD
import './course.css'
=======

>>>>>>> 7ba2869915dc0d2479dc6c0ff64a31449b89fd8a
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
<<<<<<< HEAD
        getmyCourseTeacher(sessionStorage.getItem("token"))
=======
        getmyCourseTeacher(sessionStorage.getItem("token"),
            sessionStorage.getItem("user_id"))
>>>>>>> 7ba2869915dc0d2479dc6c0ff64a31449b89fd8a
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

    return (
        <div>
            <NavTeacher />
            {/* {JSON.stringify(filter)} */}

            <div className="container ">
                <div className='row mt-3'>
                    {
                        courses.map((course, index) => (
<<<<<<< HEAD
                            <div className="col-md-6 p-2" key={index}>
                                 <div className="card back-public-2 shadow-sm back-public-black-2" onClick={() => nextToCourse(course._id)}>
                                     {course.image 
                                     ?<img src={`${process.env.REACT_APP_IMG}/${course.image}`} className="card-img-top w-100" />
                                        :<img src="/book-main-img-3.png" className="card-img-top w-100"/>
                                        }
                                     {/* <img src={`${process.env.REACT_APP_IMG}/${course.image}`} className="card-img-top w-100" /> */}
                                     <div className="card-body ">
                                        <div className="d-flex justify-content-between">
                                            <p className="card-title mb-0">{course.name}</p>
                                            <div className="d-flex">
                                              <p className="card-title mb-0">สถานะ :</p>  
                                              {course.enabled
                                              ?<p className="card-title text-success ms-2">เปิดใช้งาน</p>  
                                            :<p className="card-title text-danger ms-2">ปิดการใช้งาน</p>  
                                            }
                                            </div>
                                            
                                        </div>
                                         
=======
                            // <div className="row p-3 bg-white border mt-3" key={index}
                            // onClick={()=>nextToCourse(course._id)}
                            // >
                            //     <div className="col pt-3 pb-2">
                            //        <h3 id='titleTopic'>{course.name}</h3>
                            //         <p>{(course.description.substring(0, 200))}...</p>
                            //         <p className="text-muted">ผู้สอน {course.teacher.firstname}</p>
                            //     </div>
                            // </div>
                            <div className="col-md-6 p-2" key={index}>
                                {course.image
                                     ? <div className="card back-public-2 shadow-sm back-public-black-2" onClick={() => nextToCourse(course._id)}>
                                     <img src={`${process.env.REACT_APP_IMG}/${course.image}`} width="100%" className="card-img-top" />
                                     <div className="card-body ">
                                         <p id='' className="card-title mb-0">{course.name}</p>
>>>>>>> 7ba2869915dc0d2479dc6c0ff64a31449b89fd8a
                                         {/* <p id='text-p-5' className="card-text my-0">รายละเอียด : {course.description}</p> */}
                                         {/* <p id='text-p-6' className="card-text mt-1 "><i className="bi bi-hand-index"></i>&nbsp;คลิกเพื่อเข้าเรียน </p> */}
                                     </div>
                                 </div>
<<<<<<< HEAD
                                
=======
                                 : <div className="card back-public-2 shadow-sm back-public-black-2" onClick={() => nextToCourse(course._id)}>
                                     <div className="img-fact"></div>
                                     <div className="card-body ">
                                         <p id='' className="card-title mb-0">{course.name}</p>
                                         {/* <p id='text-p-5' className="card-text my-0">รายละเอียด : {course.description}</p> */}
                                         {/* <p id='text-p-6' className="card-text mt-1 "><i className="bi bi-hand-index"></i>&nbsp;คลิกเพื่อเข้าเรียน </p> */}
                                     </div>
                                 </div>

                                }
>>>>>>> 7ba2869915dc0d2479dc6c0ff64a31449b89fd8a
                            </div>))
                    } </div>
            </div>
        </div>
    )
}

export default CoursesPageteacher;