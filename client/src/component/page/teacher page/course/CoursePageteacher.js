import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavTeacher from "../../../layout/NavTeacher";
import { getCourse } from "../../../../function/funcFromStudent";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const CoursePageteacher = () => {
    const course_id = useParams();
    const [course, setCourse] = useState("");
    const [topic, setTopic] = useState();

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

    useEffect(() => {
        fetchCourse()
        console.log(topic)
    }, []);

    // console.log(topic)
    return (
        <div>
             <NavTeacher />
            <div className="container ">
            {/* {JSON.stringify(course_id)} */}
            {course &&
                
                
                <div className="p-5 border border-primary mt-5">
                    <div className="row">
                        <div className="col-11">
                            <h1>{course.name}</h1>
                            <p>{course.description}</p>
                            <p className="text-muted">{course.teacher.firstname}</p>
                        </div>
                        {
                            sessionStorage.getItem("user_id") === course.teacher._id ? (
                                <div className="col-1 pt-4">
                                    <Link to={`/teacher/edit-course/${course._id}`}><button type="button" className="btn btn-primary btn-lg"> Edit </button></Link>
                                </div>
                            ): (
                                <div/>
                            )
                        }
                    </div>  
                   
                </div> 
            }
             <div>
                        {topic && topic.map((item,index)=>(
                            <div key={index} className="p-5 border border-primary mt-3">
                                <h1 className="">{item.name}</h1>
                                <p>{item.description}</p>
                                {item.materials.map((mtem,mdex)=>(
                                    <p key={mdex}>
                                        {mtem}
                                    </p>
                                ))}
                                 <a href="">{item.quiz.title}</a>
                            </div>
                        ))}
                        </div> 
            </div>
        </div>
    );
}

export default CoursePageteacher