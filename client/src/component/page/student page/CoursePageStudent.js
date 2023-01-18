import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavStudent from "../../layout/NavStudent";
import { getCourse } from "../../../function/funcFromStudent";
import Swal from "sweetalert2";


const CoursePageStudent = () => {
    const course_id = useParams();
    const [course, setCourse] = useState("");

    const fetchCourse = () => {
        getCourse(course_id)
        .then((response) => {
            console.log(response)
            setCourse(response.data)
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

    
    return (
        <div>
            <NavStudent/>
            {JSON.stringify(course_id)}
            {course &&
                
                
                <div className="container p-5 border border-primary">
                    <div className="row">
                        <div className="col-11">
                            <h1>{course.name}</h1>
                            <p>{course.description}</p>
                            <p className="text-muted">{course.teacher.firstname}</p>
                        </div>
                        <div className="col-1 pt-4">
                            <button type="button" class="btn btn-primary btn-lg"> Edit </button>
                        </div>
                    </div>   
                </div> 
            }
            
        </div>
    );
}

export default CoursePageStudent;