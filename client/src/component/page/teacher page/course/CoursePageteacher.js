import React from 'react'
import { useEffect, useState } from "react";
<<<<<<< HEAD
import { useParams, useLocation, Link } from "react-router-dom";
import NavTeacher from "../../../layout/NavTeacher";
import './course.css'
import Swal from "sweetalert2";
import { Switch } from 'antd';
// import { Link } from "react-router-dom";
// import Parser from 'html-react-parser';
import { useNavigate } from 'react-router-dom'
import { getCourse, removeCourse,enablecourse } from "../../../../function/teacher/funcCourse";

=======
import { useParams, useLocation, Link} from "react-router-dom";
import NavTeacher from "../../../layout/NavTeacher";
import './course.css'
import Swal from "sweetalert2";
// import { Link } from "react-router-dom";
// import Parser from 'html-react-parser';
import { useNavigate } from 'react-router-dom'
import { getCourse, removeCourse } from "../../../../function/teacher/funcCourse";
>>>>>>> 7ba2869915dc0d2479dc6c0ff64a31449b89fd8a

const CoursePageteacher = () => {
    const { id } = useParams();
    const [course, setCourse] = useState("");
    const [topic, setTopic] = useState();
    const [dataQuiz, setDataQuiz] = useState([])
    const navigate = useNavigate()
<<<<<<< HEAD
    const { pathname } = useLocation()
=======
    const {pathname} = useLocation()
>>>>>>> 7ba2869915dc0d2479dc6c0ff64a31449b89fd8a

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
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    const remove = (params) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            //   cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                removeCourse(sessionStorage.getItem("token"), params)
                    .then(res => {
                        console.log(res)
                        Toast.fire({
                            icon: 'success',
                            title: 'Your file has been deleted successfully'
                        })

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
<<<<<<< HEAD

    const onChangeEnable = (checked) => {
        console.log(`switch to ${checked}`);
        enablecourse(sessionStorage.getItem("token"),
        {   id:id,
            enable:checked
        })
        .then((response) => {
            console.log(response)
            fetchCourse()
        })
        .catch((err) => {
            console.log(err)
        })
    };

=======
>>>>>>> 7ba2869915dc0d2479dc6c0ff64a31449b89fd8a
    return (
        <div>
            <NavTeacher />

            <div className="container ">
                {/* {JSON.stringify(course_id)} */}
                {course &&
<<<<<<< HEAD
                    <>
                        <div className="d-flex justify-content-end mt-4">
                            <label className='form-label me-3'>สถานะเปิดใช้งาน</label>
                            <Switch defaultChecked={course.enabled} onChange={onChangeEnable} />
                        </div>
                        {course.image
                            ? <div className="card mt-3">
                                <img src={`${process.env.REACT_APP_IMG}/${course.image}`} width="100%" className="img-size-student card-img-top" />
                                <div className="card-body">
                                    <div className="mt-3 px-2">
                                        <h3 className="card-title mb-3 fw-bold">{course.name}</h3>
                                        <p className="card-text fs-6">รายละเอียด : {course.description}</p>
                                        {course.status !== "public" ?
                                            <p className="text-muted ">ผู้สอน : {course.teacher.firstname}</p>
                                            : <div></div>
                                        }
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="card mt-3">
                                <div className="card-body alert-primary">
                                    <div className="mt-3 px-2 text-dark">
                                        <h3 className="card-title mb-3 fw-bold">{course.name}</h3>
                                        <p className="card-text fs-6">รายละเอียด : {course.description}</p>
                                        {course.status !== "public" ?
                                            <p className="text-muted ">ผู้สอน : {course.teacher.firstname}</p>
                                            : <div></div>
                                        }
                                    </div>
                                </div>
=======

                    <>
                        {course.image
                            ? <div className="card text-white mt-3">
                                <img src={`${process.env.REACT_APP_IMG}/${course.image}`} width="100%" className="card-img" />
                                <div className="card-img-overlay bg-body-course-t p-5">
                                    <h3 className="card-title">{course.name}</h3>
                                    <p className="card-text">รายละเอียด : {course.description}</p>
                                    <p className="card-text">ผู้สอน : {course.teacher.firstname}</p>
                                </div>
                            </div>
                            :
                            <div className="card mt-3 p-5 alert-primary text-dark">
                                <h3 className="card-title">{course.name}</h3>
                                <p className="card-text">รายละเอียด : {course.description}</p>
                                <p className="card-text">ผู้สอน : {course.teacher.firstname}</p>
>>>>>>> 7ba2869915dc0d2479dc6c0ff64a31449b89fd8a
                            </div>
                        }
                    </>
                }
                <div className="border bg-white my-3 ">
                    {topic && topic.map((item, index) => (
                        <div key={index} className="px-5 mt-3">
<<<<<<< HEAD
                            <h5 id="titleTopic" className="fw-bold">{item.title}</h5>
                            <div className="">
                                <p className="fs-6">{item.description}</p>
=======
                            <h3 id="titleTopic">{item.title}</h3>
                            <div className="px-3">
                                <p className="">{item.description}</p>
>>>>>>> 7ba2869915dc0d2479dc6c0ff64a31449b89fd8a

                                {item.text.length > 0 &&
                                    <div className=""><ul>
                                        {item.text.map((ttem, tdex) =>

<<<<<<< HEAD
                                            <li className="fs-6" key={tdex}>
=======
                                            <li key={tdex}>
>>>>>>> 7ba2869915dc0d2479dc6c0ff64a31449b89fd8a
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
<<<<<<< HEAD
                                                <a className='text-info' href={ttem.url}><i className="bi bi-link"></i>&nbsp;{ttem.name}</a>
=======
                                                <a href={ttem.url}><i className="bi bi-link"></i>&nbsp;{ttem.name}</a>
>>>>>>> 7ba2869915dc0d2479dc6c0ff64a31449b89fd8a
                                            </li>

                                        )}
                                    </ul>
                                    </div>
                                }
<<<<<<< HEAD
                                {item.file.length > 0 &&
                                    <div className="">


                                        {item.file.map((ttem, tdex) =>

                                            <div key={tdex} className="mb-2">
                                                {ttem.filetype === 'image/jpeg'
                                                    ? <div className="container"><img src={`${process.env.REACT_APP_IMG}/${ttem.filename}`} className="w-100" /></div>
                                                    :
                                                    <>
                                                        {ttem.filetype === 'application/pdf'
                                                            ? <div>
                                                                <a href={`${process.env.REACT_APP_IMG}/${ttem.filename}`} className="text-danger size-pdf">
                                                                    <i className="bi bi-file-earmark-pdf"></i> {ttem.name}</a>
                                                            </div>
                                                            :
                                                            <>
                                                                {ttem.filetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                                    ? <div>
                                                                        <a href={`${process.env.REACT_APP_IMG}/${ttem.filename}`} className="text-primary">
                                                                            <i className="bi bi-file-earmark-word"></i> {ttem.name}</a>
                                                                    </div>
                                                                    :
                                                                    <>
                                                                        {ttem.filetype === "image/png"
                                                                            ? <div className="container">
                                                                                <img src={`${process.env.REACT_APP_IMG}/${ttem.filename}`} className="w-100" />
                                                                            </div>
                                                                            : <>
                                                                                {ttem.filetype == "image/webp"
                                                                                    ? <div className="container">
                                                                                        <img src={`${process.env.REACT_APP_IMG}/${ttem.filename}`} className="w-100" />
                                                                                    </div>
                                                                                    :

                                                                                    <>
                                                                                        {ttem.filetype == "video/mp4"
                                                                                            ? <div className="container">
                                                                                                <p>{(ttem.name).split('.')[0]}</p>
                                                                                                <video className="w-100" controls>
                                                                                                    <source src={`${process.env.REACT_APP_IMG}/${ttem.filename}`}
                                                                                                        type={ttem.filetype} />
                                                                                                    Your browser does not support the video tag.
                                                                                                </video>
                                                                                            </div>
                                                                                            :
                                                                                            <>
                                                                                                <p>ไม่สามารถอ่านไฟลได้</p>
                                                                                            </>
                                                                                        }
                                                                                    </>
                                                                                }
                                                                            </>
                                                                        }
                                                                    </>
                                                                }
                                                            </>
                                                        }
                                                    </>
                                                }

                                            </div>

                                        )}

                                    </div>
                                }
=======
>>>>>>> 7ba2869915dc0d2479dc6c0ff64a31449b89fd8a
                                {item.quiz.length > 0 &&
                                    <div className=""><ul>
                                        {item.quiz.map((ttem, tdex) =>

                                            <li key={tdex}>
<<<<<<< HEAD
                                                <Link className="text-success" to={`/student/test/` + ttem.quiz} state={{ path: pathname }}>
=======
                                                <Link className="text-success" to={`/student/test/` + ttem.quiz} state={{path: pathname}}>
>>>>>>> 7ba2869915dc0d2479dc6c0ff64a31449b89fd8a
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
                <div className="d-flex justify-content-between mb-4">
                    <button onClick={() => nextToCourse(course._id)} className="btn btn-warning w-25">แก้ไข</button>
                    <button onClick={() => remove(course._id)} className="btn btn-danger w-25">ลบ</button>
                </div>


            </div>
        </div>
    );
}

export default CoursePageteacher