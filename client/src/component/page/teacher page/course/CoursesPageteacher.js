import React from 'react'
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
// import { Link } from "react-router-dom";
import { listCourses } from "../../../../function/teacher/funcCourse";
import NavTeacher from "../../../layout/NavTeacher";
import { getCourseByFilter } from '../../../../function/teacher/funcCourse';
import {  useNavigate } from 'react-router-dom'

const CoursesPageteacher = () => {
    const [courses, setCourses] = useState([]);
    const [filter, setFilter] = useState("all");
    const navigate = useNavigate()

    const fetchData = () => {
        listCourses(sessionStorage.getItem("token"))
            .then((response) => {
                // console.log(response)
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
        getCourseByFilter(sessionStorage.getItem("token"),
            { filter: filter, user_id: sessionStorage.getItem("user_id") })
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

    const nextToCourse = (params) => {
        console.log(params)
        navigate('/teacher/get-course/' + params)
    }

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

            <div className="container ">
                {
                    courses.map((course, index) => (
                        <div className="row p-3 bg-white border mt-3" key={index}
                        onClick={()=>nextToCourse(course._id)}
                        >
                            <div className="col pt-3 pb-2">
                               <h3 id='titleTopic'>{course.name}</h3>
                                <p>{(course.description.substring(0, 200))}...</p>
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