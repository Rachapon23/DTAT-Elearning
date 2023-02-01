import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavTeacher from "../../../layout/NavTeacher";
import { getCourse } from "../../../../function/funcFromStudent";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Parser from 'html-react-parser';
import { listQuiz, } from "../../../../function/funcFromTeacher";


const CoursePageteacher = () => {
    const course_id = useParams();
    const [course, setCourse] = useState("");
    const [topic, setTopic] = useState([]);
    const [dataQuiz, setDataQuiz] = useState([])
    const fetchCourse = () => {
        // console.log("p--")

        getCourse(course_id)
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

    const loadData = () => {
        listQuiz(sessionStorage.getItem("token"))
            .then(res => {
                setDataQuiz(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchCourse()
        loadData()
    }, []);

    // console.log(topic)
    return (
        <div>
            <NavTeacher />

            <div className="container">
                {course &&
                    <div className="px-5 py-3 border bg-white  mt-3">
                        <div className="row">
                            <div className="col-11">
                                <h3>{course.name}</h3>
                                <p className="text-muted mb-0 mt-3" >รายละเอียด : {course.description}</p>
                                <p className="text-muted">ผู้สอน : {course.teacher.firstname}</p>
                            </div>
                        </div>


                        <div className="d-flex justify-content-end">
                            {
                                sessionStorage.getItem("user_id") === course.teacher._id ? (
                                    <div className="">
                                        <Link to={`/teacher/edit-course/${course._id}`}><button type="button" className="btn btn-warning px-3 btn-sm">แก้ไข</button></Link>
                                    </div>
                                ) : (
                                    <div />
                                )
                            }
                        </div>
                    </div>
                }
                <div>
                    {topic && topic.map((item, index) => (
                        <div key={index} className="px-5 py-3 border bg-white  mt-3">
                            <h1 className="">{item.name}</h1>
                            <p className="">{Parser(item.description)}</p>
                            {item.materials.map((mtem, mdex) => (
                                  <div className="row mt-1">
                                  {
                                      mtem.type == 'link'
                                      ? <a href={mtem.url}>
                                          <i class="bi bi-link"></i>&nbsp;{mtem.content}</a>
                                      : <>
                                      {mtem.type == 'quiz'
                                      ?<>
                                      {dataQuiz.map((qtem,qdex)=>(
                                          <>
                                          {mtem.content == qtem._id
                                          
                                          ? <a href={`/student/test/`+qtem._id} className="text-danger mb-2">
                                             
                                              <i className="bi bi-clipboard2-check"></i>&nbsp;
                                              {qtem.title}</a>
                                      
                                      : <></>
                                      
                                      }
                                          </>
                                      ))}
                                      </>
                                  :<>
                                <li>{mtem.content}</li>
                                  </>}
                                      </>
                                  }
                              </div>
                            ))}


                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CoursePageteacher