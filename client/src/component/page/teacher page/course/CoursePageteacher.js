import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavTeacher from "../../../layout/NavTeacher";

import Swal from "sweetalert2";
// import { Link } from "react-router-dom";
// import Parser from 'html-react-parser';
import { useNavigate } from 'react-router-dom'
import { getCourse,removeCourse } from "../../../../function/teacher/funcCourse";

const CoursePageteacher = () => {
    const { id } = useParams();
    const [course, setCourse] = useState("");
    const [topic, setTopic] = useState();
    const [dataQuiz, setDataQuiz] = useState([])
    const navigate = useNavigate()

    const fetchCourse = () => {
        getCourse(sessionStorage.getItem("token"), id)
            .then((response) => {
                console.log(response)
                setCourse(response.data)
                setTopic(response.data.topic)
            })
            .catch((err) => {
                console.log(err)
                Swal.fire(
                    "Alert!",
                    "Cannot fetch course data",
                    "error"
                )
            })
    }


    useEffect(() => {
        fetchCourse()
    }, []);
    
    const nextToCourse = (params) => {
        console.log(params)
        navigate('/teacher/edit-course/' + params)
    }
    
    const remove = (params) => {

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
        removeCourse(sessionStorage.getItem("token"), params)
        .then(res => {
            console.log(res)
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            navigate('/teacher/list-courses')
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
    return (
        <div>
            <NavTeacher />

            <div className="container ">
                {/* {JSON.stringify(course_id)} */}
                {course &&


                    <div className="px-5 py-3 border   mt-3 body-card">
                        <div className="row">
                            <div className="col-11">
                                <h3>{course.name}</h3>
                                <p className="text-muted mb-0 mt-3">รายละเอียด : {course.description}</p>
                                <p className="text-muted">ผู้สอน : {course.teacher.firstname}</p>
                            </div>

                        </div>

                    </div>
                }
                <div className="border bg-white my-3 ">
                    {topic && topic.map((item, index) => (
                        <div key={index} className="px-5 mt-3">
                            <h3 id="titleTopic">{item.title}</h3>
                            <div className="px-3">
                                <p className="">{item.description}</p>

                                {item.text.length > 0 &&
                                    <div className=""><ul>
                                        {item.text.map((ttem, tdex) =>

                                            <li key={tdex}>
                                                {ttem.content}
                                            </li>

                                        )}
                                    </ul>
                                    </div>
                                }
                                {item.link.length > 0 &&
                                    <div className=""><ul>
                                        {item.link.map((ttem, tdex) =>

                                            <li key={tdex}>
                                                <a href={ttem.url}><i className="bi bi-link"></i>&nbsp;{ttem.name}</a>
                                            </li>

                                        )}
                                    </ul>
                                    </div>
                                }
                                {item.quiz.length > 0 &&
                                    <div className=""><ul>
                                        {item.quiz.map((ttem, tdex) =>

                                            <li key={tdex}>
                                                <a className="text-success" href={`/student/test/` + ttem.quiz}>
                                                    <i className="bi bi-clipboard2-check"></i>&nbsp;{ttem.name}</a>
                                            </li>

                                        )}
                                    </ul>
                                    </div>
                                }
                            </div>


                            <hr className="mt-4" />
                        </div>


                    ))}
                </div>
                <div className="d-flex justify-content-between mb-4">
                            <button  onClick={()=>nextToCourse(course._id)} className="btn btn-warning w-25">แก้ไข</button>
                            <button  onClick={()=>remove(course._id)} className="btn btn-danger w-25">ลบ</button>
                        </div>


            </div>
        </div>
    );
}

export default CoursePageteacher