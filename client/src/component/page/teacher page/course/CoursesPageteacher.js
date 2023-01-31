import React from 'react'
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import {listCourses} from "../../../../function/funcFromStudent";
import NavTeacher from "../../../layout/NavTeacher";
import { getCourseByFilter } from '../../../../function/funcFromTeacher';

const CoursesPageteacher = () => {
    const [courses, setCourses] = useState([]);
    const [filter, setFilter] = useState("all");

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

    const handlechange = (e) => {
        console.log(e.target.value)
        setFilter(e.target.value)
    }

    const fetchCourseByFilter = () => {
        getCourseByFilter({filter: filter,user_id: sessionStorage.getItem("user_id")})
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

    useEffect(() => {
        fetchCourseByFilter()
    }, [filter])

    return (
        <div>
            <NavTeacher />
            {/* {JSON.stringify(filter)} */}

            <div className="container p-3 bg-white border mt-3">
                <div>
                    <select
                        onChange={handlechange}
                        className="form-select" 
                    >
                      <option selected value="all"> All</option>
                      <option value="my_course">My course</option>

                    </select>
                </div>
            </div>

            <div className="container p-5 bg-white border mt-3">
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

export default CoursesPageteacher;