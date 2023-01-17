import axios from "axios";
import { useEffect, useState } from "react";
import { createCourse, getCurrentTeacher } from "../../../function/FromTeacher";
import NavTeacher from "../../layout/NavTeacher";
import Swal from "sweetalert2";
import { currentTeacher } from "../../../function/auth";

const CreateCoursePageTeacher = () => {

    const [value, setValue] = useState({
        name: "",
        teacher: sessionStorage.getItem("user_id"),
        description: "",
    })

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
        console.log(value)
    };

    const submit = (e) => {
        e.preventDefault();
        createCourse(value)
        .then(res => {
            Swal.fire(
                'Create Success',
                'Create Success',
                'success'
              )
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
                <div class="mb-3">
                    <label className="form-label">Course Name</label>
                    <input type="text" className="form-control" name="name" onChange={handleChange}/>
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div class="mb-3">
                    <label className="form-label">Course Description</label>
                    <input type="text" className="form-control" name="description" onChange={handleChange}/>
                </div>
                <div class="mb-3">
                    <label className="form-label">Teacher</label>
                    <input type="text" className="form-control" name="teacher" disabled value={sessionStorage.getItem("firstname")}/>
                </div>
                <button type="submit" class="btn btn-primary" onClick={submit}>Create</button>
            </form>
        </div>
    );
}

export default CreateCoursePageTeacher;