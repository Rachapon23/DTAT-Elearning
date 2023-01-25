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
        // console.log(value)
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

    // const getCurrentTeacher = () => {
    //     currentTeacher(sessionStorage.getItem("token"))
    //     .then(res => {
    //         console.log("get current teacher success");
    //         console.log(res.data)
    //     })
    //     .catch(err => {
    //         console.log("fail to get current teacher");
    //     })
    // }

    // useEffect(() => {
    //     getCurrentTeacher();
    // }, [])

    return (
        <div >
            <NavTeacher/>
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
    );
}

export default CreateCoursePageTeacher;