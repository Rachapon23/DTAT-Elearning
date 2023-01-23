import React from 'react'
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import {listCourses} from "../../../../function/funcFromStudent";
import NavTeacher from "../../../layout/NavTeacher";

const CoursesPageteacher = () => {
    const [courses, setCourses] = useState([]);

    const fetchData = () => {
        listCourses()
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
        fetchData()
      }, [])

    return (
        <div>
            <NavTeacher />
            {/* {JSON.stringify(courses)} */}
            <div className="container p-5">
                {
                    courses.map((course, index) => (
                        <div className="row" key={index}>
                            <div className="col pt-3 pb-2">
                                <Link to={`/teacher/get-course/${course._id}`}><h2>{course.name}</h2></Link>
                                <p>{course.description}</p>
                                <p className="text-muted">ผู้สอน {course.teacher.firstname}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CoursesPageteacher