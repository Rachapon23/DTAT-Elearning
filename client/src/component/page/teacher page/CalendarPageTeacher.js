import { useEffect, useState } from "react";
import NavTeacher from "../../layout/NavTeacher";
import { listCourses } from "../../../function/funcFromStudent";
import Swal from "sweetalert2";

const CalendarPageTeacher = () => {

    const [value, setValue] = useState({
        course:"",
        date_time: "",
        teacher: sessionStorage.getItem("user_id"),
    })

    const [courses, setCourses] = useState([]);
    

    const month = 0;
    const date = new Date(new Date().getFullYear(), month+1, 0);
    const date_start = new Date(2023, month, 1)
    const date_end = new Date(2023, month, (new Date(2023, month, 0).getDate()))


    const dayInMonth = new Date(2023, month, 0).getDate()
    const dayArray = [];

    let counter = 0
    // dayArray.forEach((day, index) => {
        for(let i=1; i <= dayInMonth + date_start.getDay(); i++) {
            // if(counter == dayInMonth) break
            if(i <= date_start.getDay()) {
                dayArray.push("");
                // console.log(0);
            }
            else {
                counter++;
                dayArray.push(counter);
                // console.log(counter);
            }
        }
  
    // })

    // console.log(dayArray)
    
    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
        // console.log(value)
    };

    const handlechangeQuiz = (e, index,) => {
        // courseTopics[index].quiz = e.target.value
        // console.log(e.target.value)
    }

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
        fetchData();
    }, [])

    return (
        <div >
            <NavTeacher />
            <div className="container mt-5">
                <div className="border border-primary p-3">
                <h1 className="d-flex justify-content-center pb-3">{date.toLocaleString('default',{month: 'long'})}</h1>
                {/* {new Date(2023, 1, 0).getDate()} */}
                {/* {date_start.getDay()} {date_end.getDay()} */}
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th scope="col"> Sunday</th>
                                <th scope="col"> Monday</th>
                                <th scope="col"> Thursday</th>
                                <th scope="col"> Wednesday</th>
                                <th scope="col"> Thursday</th>
                                <th scope="col"> Friday</th>
                                <th scope="col"> Saturday</th>
                            </tr>
                        </thead>
                        
                        <thead>
                            <tr>
                                {
                                    dayArray.slice(0,7).map((day, index) => (
                                        <th scope="col" key={index}> {day}</th>
                                    ))
                                }
                            </tr>
                            <tr>
                                {
                                    dayArray.slice(7,14).map((day, index) => (
                                        <th scope="col" key={index}> {day}</th>
                                    ))
                                }
                            </tr>
                            <tr>
                                {
                                    dayArray.slice(14,21).map((day, index) => (
                                        <th scope="col" key={index}> {day}</th>
                                    ))
                                }
                            </tr>
                            <tr>
                                {
                                    dayArray.slice(21,28).map((day, index) => (
                                        <th scope="col" key={index}> {day}</th>
                                    ))
                                }
                            </tr>
                            <tr>
                                {
                                    dayArray.slice(28,35).map((day, index) => (
                                        <th scope="col" key={index}> {day}</th>
                                    ))
                                }
                            </tr>
                            <tr>
                                {
                                    dayArray.slice(35,42).map((day, index) => (
                                        <th scope="col" key={index}> {day}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                    </table>
                </div>

                <form className="p-5">
                    <div className="mb-3">
                        <label className="form-label">Course Name</label>
                        <select
                            className="form-select" >
                            <option disabled selected value="">เลือกวิชาที่ต้องการ</option>
                            {courses.map((item, index) => (
                                <option key={index} value={item._id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Teacher</label>
                        <input type="text" className="form-control" name="teacher" disabled value={sessionStorage.getItem("firstname")}/>
                    </div>
                
                    <button type="submit" className="btn btn-primary" >Create</button>
                </form>
            </div>
        </div>
    );
}

export default CalendarPageTeacher;