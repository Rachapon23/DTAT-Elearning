import NavStudent from "../../layout/NavStudent"
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CoursePageStudent = () => {

    const [courses, setCourses] = useState([]);

    const fetchData = () => {
        axios
        .get(process.env.REACT_APP_API+'/list_courses')
        .then((response) => {
            console.log(response)
            setCourses(response.data)
        })
        .catch((err) => {
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
            <NavStudent/>
            {/* {JSON.stringify(courses)} */}
            <div className="container p-5">
                {
                    courses.map((course, index) => (
                        <div className="row" key={index}>
                            <div className="col pt-3 pb-2">
                                <h2>{course.name}</h2>
                                <p>
                                {
                                    course.teacher.map((teacher, index) => (
                                        <div className="col" key={index}>
                                            {teacher}
                                        </div>
                                    ))
                                }
                                </p>
                                <p>{course.material.link1}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CoursePageStudent;