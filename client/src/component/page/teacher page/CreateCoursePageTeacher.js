import { useState } from "react";
import NavTeacher from "../../layout/NavTeacher";

const CreateCoursePageTeacher = () => {

    const [value, setValue] = useState({})

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
        console.log(value)
    };

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
                    <input type="text" className="form-control" name="teacher" onChange={handleChange}/>
                </div>
                <button type="submit" class="btn btn-primary">Create</button>
            </form>
        </div>
    );
}

export default CreateCoursePageTeacher;