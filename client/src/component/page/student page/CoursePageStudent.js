import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavStudent from "../../layout/NavStudent";
import { getCourse } from "../../../function/funcFromStudent";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Parser from 'html-react-parser';
import './student.css'
import { listQuiz, } from "../../../function/funcFromTeacher";

const CoursePageStudent = () => {
    const course_id = useParams();
    const [course, setCourse] = useState("");
    const [topic, setTopic] = useState();
    const [dataQuiz, setDataQuiz] = useState([])

    const fetchCourse = () => {
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
        // console.log(topic)
        loadData()
    }, []);

    console.log(dataQuiz)
    return (
        <div>
            <NavStudent/>
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
                        {topic && topic.map((item,index)=>(
                            <div key={index} className="px-5 mt-3">
                                <h3 id="titleTopic">{Parser(item.name)}</h3>
                                <div className="px-3">
                                <p className="">{Parser(item.description)}</p>
                                {item.materials.map((mtem,mdex)=>(
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
                                {/* <div className="d-flex">
                                    <img src="https://elearning2.sut.ac.th/theme/image.php/suranaree/quiz/1674452536/icon" alt="" />
                                    <a href={`/student/test/${item.quiz._id}`} className="">{item.quiz.title}</a>
                                </div> */}
                                 
                           <hr className="mt-4" />
                            </div>
                        ))}
                        </div> 
            </div>
        </div>
    );
}

export default CoursePageStudent;