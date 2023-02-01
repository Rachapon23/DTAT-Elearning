import { useState } from "react";
import { createCourse, getCurrentTeacher } from "../../../../function/funcFromTeacher";
import NavTeacher from "../../../layout/NavTeacher";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateCoursePageTeacher = () => {

    const navigate = useNavigate()
    const [value, setValue] = useState({
        course_number:"",
        name: "",
        teacher: sessionStorage.getItem("user_id"),
        description: "",
        password:""
    })

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    };

    const submit = (e) => {
        e.preventDefault();
        createCourse(value)
        .then(res => {
            console.log(res)
            Swal.fire(
                'Create Success',
                'Create Success',
                'success'
              )
            //   window.location.reload(false);
            navigate('/teacher/edit-course/'+res.data._id)
        })
        
        .catch(err => {
            Swal.fire(
                'Fail to Create Success',
                'Fail to Create Success',
                'error'
              )
        })
    }

    return (
        <div >
            <NavTeacher/>
            <div className="border bg-white m-5">
                <form className="p-5">
                    <div className="mb-3">
                        <label className="form-label">Course Number</label>
                        <input type="text" className="form-control" name="course_number" onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Course Password</label>
                        <input type="text" className="form-control" name="password" onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Course Name</label>
                        <input type="text" className="form-control" name="name" onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Course Description</label>
                        <input type="text" className="form-control" name="description" onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Teacher</label>
                        <input type="text" className="form-control" name="teacher" disabled value={sessionStorage.getItem("firstname")}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={submit}>Create</button>
                </form>
            </div>
            
        </div>
    );
}

export default CreateCoursePageTeacher;