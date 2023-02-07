import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavTeacher from "../../../layout/NavTeacher";

import Swal from "sweetalert2";
// import { Link } from "react-router-dom";
// import Parser from 'html-react-parser';
import { useNavigate } from 'react-router-dom'
import { getCourse } from "../../../../function/teacher/funcCourse";

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
                {course && <>

                    {sessionStorage.getItem("user_id") === course.teacher._id ? (
                        <div className="d-grid mb-4">
                            <button  onClick={()=>nextToCourse(course._id)} className="btn btn-warning">แก้ไข</button>
                        </div>
                    ) : (
                        <div />
                    )
                    } </>

                }


            </div>
        </div>
    );
}

export default CoursePageteacher