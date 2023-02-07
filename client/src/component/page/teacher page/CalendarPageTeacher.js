import { useEffect, useState } from "react";
import NavTeacher from "../../layout/NavTeacher";
// import { listCourses } from "../../../function/funcFromStudent";
import Swal from "sweetalert2";
import { createTeachTime, listCoursesInTeachTime, listTeachTimes } from "../../../function/funcFromTeacher";
import { Link } from "react-router-dom";
import "./teacher.css";

const CalendarPageTeacher = () => {
    const [value, setValue] = useState({
        course:"",
        start: undefined,
        end: undefined,
        teacher: sessionStorage.getItem("user_id"),
    })

    const [courses, setCourses] = useState([]);
    const [teachTime, setTeachTime] = useState([]);

    const [displayData, setDisplayData] = useState([]);

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
                // console.log(0);
            }
            else {
                
                day_counter++;
                dayArrayTemp.push(day_counter);
                // console.log(counter);
            }
            day_of_week_counter++;
            // console.log(i)

        }
        // console.log(day_of_week_counter)
        for(let i=0; i < 8-day_of_week_counter ; i++) {
            dayArrayTemp.push("");
        }
        setDayArray(dayArrayTemp)
    }
    
    const handleChange = (e) => {
        console.log(e.target.name, e.target.value)
        setValue({ ...value, [e.target.name]: e.target.value });
        // console.log(value)
    };

    const fetchCourse = () => {
        // listCourses()
        // .then((response) => {
        //     // console.log(response)
        //     setCourses(response.data)
        // })
        // .catch((err) => {
        //     console.log(err)
        //     Swal.fire(
        //         "Alert!",
        //         "Cannot fetch blogs data",
        //         "error"
        //     )
        // })
    }

    const fetchTeachTime = () => {
        listTeachTimes(sessionStorage.getItem("token"))
        .then((response) => {
            // console.log(response)
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
        console.log(value)
        createTeachTime(sessionStorage.getItem("token"), value)
        .then((response) => {
            // console.log(response)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const dispalyCourse = (time) => {
        let data = {
            time: new Date(time),
            user_id: sessionStorage.getItem("user_id"),
        }
        console.log(data)
        listCoursesInTeachTime(sessionStorage.getItem("token"), data)
        .then((response) => {
            console.log(response)
            setDisplayData(response.data)
        })
        .catch((err) => {
            console.log(err)
            Swal.fire(
                "Alert!",
                "Cannot fetch blogs data",
                "error"
            )
        })
        // teachTime.forEach((time, i) => {
        //     if(index >= new Date(time.start).getDate() && index <= new Date(time.end).getDate()) {
        //         console.log(index ,new Date(time.start).getDate() , index , new Date(time.end).getDate())
        //         console.log(time.course)
        //         setDisplayData(time.course)
        //         setDisplayData(...displayData)
                
                
        //     }
        //     else {
        //         console.log(index ,new Date(time.start).getDate() , index , new Date(time.end).getDate())
        //         setDisplayData([]);
        //     }
            
        // })
    }

    const dispalyCourseFirstLoad = () => {
        // console.log(time)
        let data = {
            time: new Date(),
            user_id: sessionStorage.getItem("user_id"),
        }
        listCoursesInTeachTime(sessionStorage.getItem("token"), data)
        .then((response) => {
            console.log(response)
            setDisplayData(response.data)
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

    useEffect(() => {
        fetchCourse();
        fetchTeachTime();
        dispalyCourseFirstLoad();
    }, [])

    useEffect(() => {
        renderCalendar()
    }, [])

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
                
                {/* {new Date(2023, 1, 0).getDate()} */}
                {/* {date_start.getDay()} {date_end.getDay()} */}
                {/* {month}{year} */}
                {/* {JSON.stringify(displayData)} */}
                    <table className="table text-center table-bordered" >
                        <thead>
                            <tr >
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
                                                    onClick={() => dispalyCourse(new Date(year, month, day))}
                                                    className="table-primary"
                                                > 
                                                    {day}
                                                </th>
                                            ) :
                                            (
                                                <th 
                                                    scope="col" 
                                                    key={index} 
                                                    onClick={() => dispalyCourse(new Date(year, month, day))}
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
                                                    onClick={() => dispalyCourse(new Date(year, month, day))}
                                                    className="table-primary"
                                                > 
                                                    {day}
                                                </th>
                                            ) :
                                            (
                                                <th 
                                                    scope="col" 
                                                    key={index} 
                                                    onClick={() => dispalyCourse(new Date(year, month, day))}
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
                                                    onClick={() => dispalyCourse(new Date(year, month, day))}
                                                    className="table-primary"
                                                > 
                                                    {day}
                                                </th>
                                            ) :
                                            (
                                                <th 
                                                    scope="col" 
                                                    key={index} 
                                                    onClick={() => dispalyCourse(new Date(year, month, day))}
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
                                                    onClick={() => dispalyCourse(new Date(year, month, day))}
                                                    className="table-primary"
                                                > 
                                                    {day}
                                                </th>
                                            ) :
                                            (
                                                <th 
                                                    scope="col" 
                                                    key={index} 
                                                    onClick={() => dispalyCourse(new Date(year, month, day))}
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
                                                    onClick={() => dispalyCourse(new Date(year, month, day))}
                                                    className="table-primary"
                                                > 
                                                    {day}
                                                </th>
                                            ) :
                                            (
                                                <th 
                                                    scope="col" 
                                                    key={index} 
                                                    onClick={() => dispalyCourse(new Date(year, month, day))}
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
                                                    onClick={() => dispalyCourse(new Date(year, month, day))}
                                                    className="table-primary"
                                                > 
                                                    {day}
                                                </th>
                                            ) :
                                            (
                                                <th 
                                                    scope="col" 
                                                    key={index} 
                                                    onClick={() => dispalyCourse(new Date(year, month, day))}
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
                        <Link to="/teacher/create-teach-time"> <button className="btn btn-primary" type="button" > create time table</button></Link>
                    </div>
                
                </div>
                


                <div className="p-4 mt-3 border border-primary">
                    {
                        
                        displayData.length !== 0 ? (
                            displayData.map((data, index) => (
                                <div className="p-1">
                                    <Link to={`/teacher/get-course/${data.course._id}`}><h3>{data.course.name}</h3></Link>
                                    <p className="pt-2">เวลาสอน: {new Date(data.start).toLocaleDateString()} to {new Date(data.end).toLocaleDateString()}</p>
                                    <p>ผู้สอน: {data.teacher.firstname}</p>
                                </div>
                            ))
                        ):(
                            <h3 className="p-1">
                                No Courses Available on This Day
                            </h3>
                        )
                        
                    
                    }
                </div>

                {/* <form className="p-2">
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
                        <input type="date" className="form-control" name="start" onChange={handleChange}/>
                    </div>
                    
                    <div className="mb-2">
                        <label className="form-label">End</label>
                        <input type="date" className="form-control" name="end" onChange={handleChange}/>
                    </div>
                    
                    <div className="mb-2">
                        <label className="form-label">Teacher</label>
                        <input type="text" className="form-control" name="teacher" disabled value={sessionStorage.getItem("firstname")} onChange={handleChange}/>
                    </div>
                
                    <button type="button" className="btn btn-primary" onClick={submit}>Create</button>
                </form> */}
                {/* {JSON.stringify(displayData)} */}
            </div>
        </div>
    );
}

export default CalendarPageTeacher;