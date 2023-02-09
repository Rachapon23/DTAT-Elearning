import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import NavStudent from "../../layout/NavStudent";

import { Link } from "react-router-dom";
import Parser from 'html-react-parser';
import './student.css'

import { Navigate, useNavigate } from 'react-router-dom'

import {
    getCourse
    , deleteMyCourse
} from "../../../function/student/funcCourse";
import Swal from "sweetalert2";



const CoursePageStudent = () => {
    // const course_id = useParams();
    const [course, setCourse] = useState("");
    const [topic, setTopic] = useState();
    const [dataQuiz, setDataQuiz] = useState([])

    const navigate = useNavigate()
    const { id } = useParams()
    const {pathname} = useLocation()

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

    const handleRemove = (id) => {
        // console.log(id)
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
                deleteMyCourse(sessionStorage.getItem("token"),
                    sessionStorage.getItem("user_id"), id).then(res => {
                        console.log(res)
                        //   loadMycourse()
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        navigate('/student/home')
                    }).catch(err => {
                        console.log(err)
                    })

            }
        })
    }

    useEffect(() => {
        fetchCourse()
    }, []);

    return (
        <div>
            <NavStudent />
            <div className="container ">
                {/* {JSON.stringify(location)} */}
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
                                                <a href={ttem.url}><i class="bi bi-link"></i>&nbsp;{ttem.name}</a>
                                            </li>

                                        )}
                                    </ul>
                                    </div>
                                }
                                {item.quiz.length > 0 &&
                                    <div className=""><ul>
                                        {item.quiz.map((ttem, tdex) =>

                                            <li key={tdex}>
                                                <Link className="text-success" to={`/student/test/` + ttem.quiz} state={{path: pathname}}>
                                                    <i className="bi bi-clipboard2-check"></i>&nbsp;{ttem.name}
                                                </Link>
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
                {course.password == ""
                    ? <></>
                    : <div className="mb-5">
                        <button className="btn btn-danger"
                            onClick={() => handleRemove(id)}
                        >อกกจากบทเรียน</button>
                    </div>
                }

            </div>
        </div>
    );
}

export default CoursePageStudent;