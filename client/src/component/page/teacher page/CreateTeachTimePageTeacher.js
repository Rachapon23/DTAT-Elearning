import { useEffect, useState } from "react";
import NavTeacher from "../../layout/NavTeacher";
import { listCourses } from "../../../function/funcFromStudent";
import Swal from "sweetalert2";
import { createTeachTime, listCoursesInTeachTime, listTeachTimes } from "../../../function/funcFromTeacher";
import { Link } from "react-router-dom";

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
    // const date_end = new Date(2023, month, (new Date(2023, month, 0).getDate()))
    const today = new Date().getDate()
    const thisMonth = new Date().getMonth()
    const thisYear = new Date().getFullYear()


    const finalDayInMonth = new Date(year, month, 0).getDate()
    const dayArray = [];

    let counter = 0
    for(let i=1; i <= finalDayInMonth + date_start.getDay(); i++) {
        // if(counter == finalDayInMonth) break
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

    
    const handleChange = (e) => {
        console.log(e.target.name, e.target.value)
        setValue({ ...value, [e.target.name]: e.target.value });
        // console.log(value)
    };

    const fetchCourse = () => {
        listCourses()
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
        // console.log(time)
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
                </form>
                {/* {JSON.stringify(displayData)} */}
            </div>
        </div>
    );
}

export default CalendarPageTeacher;