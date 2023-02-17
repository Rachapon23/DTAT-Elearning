import { useEffect, useState } from "react";
import NavTeacher from "../../layout/NavTeacher";
import { listCourses } from "../../../function/teacher/funcCourse";
import Swal from "sweetalert2";
import { createTeachTime, getTeacherByCourseId, listCoursesInTeachTime, listTeachTimes } from "../../../function/teacher/funcCalendar";
import { Link } from "react-router-dom";
import "./teacher.css";

const CalendarPageTeacher = () => {
    const [value, setValue] = useState({
        course:"",
        start: undefined,
        end: undefined,
        floor: 0,
        teacher: "",
    })

    const [courses, setCourses] = useState([]);
    const [teachTime, setTeachTime] = useState([]);
    const [teacher, setTeacher] = useState({_id: "", firstname: "no teacher for this course", lastname: ""});

    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());

    const date = new Date(new Date().getFullYear(), month+1, 0);
    const date_start = new Date(year, month, 1)

    const today = new Date().getDate()
    const thisMonth = new Date().getMonth()
    const thisYear = new Date().getFullYear()
    const finalDayInMonth = new Date(year, month+1, 0).getDate()
    const [dayArray, setDayArray] = useState([]);

    const renderCalendar = () => {
        let day_counter = 0
        let day_of_week_counter = 1
        let dayArrayTemp = []
        for(let i=1; i <= finalDayInMonth + date_start.getDay(); i++) {
            if(day_of_week_counter %8 == 0) day_of_week_counter = 1; 
            if(i <= date_start.getDay()) {
                dayArrayTemp.push("");
            }
            else {
                
                day_counter++;
                dayArrayTemp.push(day_counter);
            }
            day_of_week_counter++;

        }
        for(let i=0; i < 8-day_of_week_counter ; i++) {
            dayArrayTemp.push("");
        }
        setDayArray(dayArrayTemp)
    }

    
    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
        
    };

    const fetchTeacherByCourseId = () => {
        if(value.course === "") return;
        getTeacherByCourseId({course_id: value.course})
        .then((response) => {
            // setCourses(response.data)
            // console.log(response.data)
            setTeacher(response.data)
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

    const fetchCourseByTeacherId = () => {
        listCourses()
        .then((response) => {
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

    const fetchTeachTime = () => {
        listTeachTimes(sessionStorage.getItem("token"))
        .then((response) => {
            console.log(response)
            setTeachTime(response.data)
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

    const submit = () => {
        const {
            course,
            start,
            end,
            floor,
        } = value
        let data = {
            course: course,
            start: start,
            end: end,
            floor: floor,
            teacher: teacher._id
        }
        console.log(teacher)
        createTeachTime(sessionStorage.getItem("token"), data)
        .then((response) => {
            console.log(response)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const [backgroundTableColor, setBackgroundTableColor] = useState("table-secondary")
    const [mouseHover, setMouseHover] = useState(false)
    const [mouseOn, setMouseOn] = useState(0)

    const changeBackgroundColor = (index) => {
        setBackgroundTableColor("table-secondary")
        setMouseHover(true);
        setMouseOn(index)
    }

    const changeBackgroundColorBack = () => {
        setBackgroundTableColor("")
        setMouseHover(false);
        setMouseOn(0)
    }

    const changeMonthUp = () => {
        let newMonth = month + 1;
        if(newMonth === 12) {
            newMonth = 0
            setYear(year + 1)
        }
        setMonth(newMonth)
    }
    
    const changeMonthDown = () => {
        let newMonth = month - 1;
        if(newMonth === -1) {
            newMonth = 11
            setYear(year - 1)
        }
        setMonth(newMonth)
    }

    const handleSelect = (index) => {
        console.log("teacher",index)
        // setTeacher(courses[index].teacher.firstname)
        // console.log(teacher)
    }

    useEffect(() => {
        fetchCourseByTeacherId();
        fetchTeachTime();
        renderCalendar()
    }, [])

    useEffect(() => {
        fetchTeacherByCourseId()
    }, [value])

    return (
        <div >
            <NavTeacher />
            <div className="container mt-5">
                <div className="border border-primary p-3">
                <div className="d-flex justify-content-between pb-3">
                    <Link><h2 className="bi bi-arrow-left-circle pt-3 ms-4" onClick={changeMonthDown}></h2></Link>
                    <h1 >{date.toLocaleString('default',{month: 'long'})}</h1>
                    <Link><h2 className="bi bi-arrow-right-circle pt-3 me-4" onClick={changeMonthUp}></h2></Link>
                </div>
                
                    <table className="table text-center table-bordered">
                        <thead>
                            <tr>
                                <th scope="col" id="table_header"> Sunday</th>
                                <th scope="col" id="table_header"> Monday</th>
                                <th scope="col" id="table_header"> Thursday</th>
                                <th scope="col" id="table_header"> Wednesday</th>
                                <th scope="col" id="table_header"> Thursday</th>
                                <th scope="col" id="table_header"> Friday</th>
                                <th scope="col" id="table_header"> Saturday</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr>
                                {
                                    dayArray.slice(0,7).map((day, index) => (
                                        day === today && month === thisMonth && year === thisYear ?
                                            (
                                                <th 
                                                    scope="col" 
                                                    key={index} 
                                                    className="table-primary"
                                                > 
                                                    {day}
                                                </th>
                                            ) :
                                            (
                                                <th 
                                                    scope="col" 
                                                    key={index} 
                                                    onMouseEnter={() => changeBackgroundColor(index)}
                                                    onMouseOut={() => changeBackgroundColorBack()}
                                                    className={`${mouseHover && index === mouseOn ? backgroundTableColor:""}`}
                                                > 
                                                    {day}
                                                </th>
                                            )
                                    ))
                                }
                            </tr>
                            <tr>
                                {
                                    dayArray.slice(7,14).map((day, index) => (
                                        day === today && month === thisMonth && year === thisYear ?
                                            (
                                                <th 
                                                    scope="col" 
                                                    key={index} 
                                                    className="table-primary"
                                                > 
                                                    {day}
                                                </th>
                                            ) :
                                            (
                                                <th 
                                                    scope="col" 
                                                    key={index} 
                                                    onMouseEnter={() => changeBackgroundColor(index+7)}
                                                    onMouseOut={() => changeBackgroundColorBack()}
                                                    className={`${mouseHover && index+7 === mouseOn ? backgroundTableColor:""}`}
                                                > 
                                                    {day}
                                                </th>
                                            )
                                    ))
                                }
                            </tr>
                            <tr>
                                {
                                    dayArray.slice(14,21).map((day, index) => (
                                        day === today && month === thisMonth && year === thisYear ?
                                            (
                                                <th 
                                                    scope="col" 
                                                    key={index}
                                                    className="table-primary"
                                                > 
                                                    {day}
                                                </th>
                                            ) :
                                            (
                                                <th 
                                                    scope="col" 
                                                    key={index} 
                                                    onMouseEnter={() => changeBackgroundColor(index+14)}
                                                    onMouseOut={() => changeBackgroundColorBack()}
                                                    className={`${mouseHover && index+14 === mouseOn ? backgroundTableColor:""}`}
                                                > 
                                                    {day}
                                                </th>
                                            )
                                    ))
                                }
                            </tr>
                            <tr className="col">
                                {
                                    dayArray.slice(21,28).map((day, index) => (
                                        day === today && month === thisMonth && year === thisYear ?
                                            (
                                                <th 
                                                    scope="col" 
                                                    key={index} 
                                                    className="table-primary"
                                                > 
                                                    {day}
                                                </th>
                                            ) :
                                            (
                                                <th 
                                                    scope="col" 
                                                    key={index} 
                                                    onMouseEnter={() => changeBackgroundColor(index+21)}
                                                    onMouseOut={() => changeBackgroundColorBack()}
                                                    className={`${mouseHover && index+21 === mouseOn ? backgroundTableColor:""}`}
                                                > 
                                                    {day}
                                                </th>
                                            )
                                    ))
                                }
                            </tr>
                            <tr>
                                {
                                    dayArray.slice(28,35).map((day, index) => (
                                        day === today && month === thisMonth && year === thisYear ?
                                            (
                                                <th 
                                                    scope="col" 
                                                    key={index} 
                                                    className="table-primary"
                                                > 
                                                    {day}
                                                </th>
                                            ) :
                                            (
                                                <th 
                                                    scope="col" 
                                                    key={index} 
                                                    onMouseEnter={() => changeBackgroundColor(index+28)}
                                                    onMouseOut={() => changeBackgroundColorBack()}
                                                    className={`${mouseHover && index+28 === mouseOn ? backgroundTableColor:""}`}
                                                > 
                                                    {day}
                                                </th>
                                            )
                                    ))
                                }
                            </tr>
                            <tr>
                                {
                                    dayArray.slice(35,42).map((day, index) => (
                                        day === today && month === thisMonth && year === thisYear ?
                                            (
                                                <th 
                                                    scope="col" 
                                                    key={index} 
                                                    className="table-primary"
                                                > 
                                                    {day}
                                                </th>
                                            ) :
                                            (
                                                <th 
                                                    scope="col" 
                                                    key={index} 
                                                    onMouseEnter={() => changeBackgroundColor(index+5)}
                                                    onMouseOut={() => changeBackgroundColorBack(index)}
                                                    className={`${mouseHover && index+5 === mouseOn ? backgroundTableColor:""}`}
                                                > 
                                                    {day}
                                                </th>
                                            )
                                    ))
                                }
                            </tr>
                        </tbody>
                    </table>
                    <div className="pe-4 d-flex justify-content-end">
                        <Link to="/teacher/calendar"><button className="btn btn-primary" type="button" > back</button></Link>
                    </div>
                </div>
                
                <form className="p-2">
                    <div className="mb-2">
                        <label className="form-label">Course Name</label>
                        <select
                            className="form-select" 
                            onChange={handleChange}
                            name="course"
                        >
                            <option disabled selected value="">เลือกวิชาที่ต้องการ</option>
                            {courses.map((item, index) => (
                                <option key={index} value={item._id}>{item.name}</option>
                                
                            ))}
                        </select>
                    </div>
                    <div className="mb-2">
                        <label className="form-label mb-2">Start</label>
                        <input type="date" className="form-control" name="start" onSelect={handleChange}/>
                    </div>
                    
                    <div className="mb-2">
                        <label className="form-label">End</label>
                        <input type="date" className="form-control" name="end" onChange={handleChange}/>
                    </div>

                    <div className="mb-2">
                        <label className="form-label">Floor</label>
                        <input type="number" className="form-control" name="floor" onChange={handleChange}/>
                    </div>
                    
                    <div className="mb-2">
                        <label className="form-label">Teacher</label>
                        <input type="text" className="form-control" name="teacher" disabled value={teacher.firstname+" "+teacher.lastname} onChange={handleChange}/>
                    </div>
                
                    <button type="button" className="btn btn-primary" onClick={submit}>Create</button>
                </form>
                {/* {JSON.stringify(displayData)} */}
            </div>
        </div>
    );
}

export default CalendarPageTeacher;