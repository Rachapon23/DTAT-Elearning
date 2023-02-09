import React from 'react'
import NavTeacher from '../../../layout/NavTeacher'
import { useState, useEffect } from 'react'
import './calendar.css'
import { createCalendar, listCalendar,removeEvent,updateEvent } from '../../../../function/teacher/funcCalendar'
import { getmyCourseTeacher } from '../../../../function/teacher/funcCourse';
import moment from 'moment'
import Swal from "sweetalert2";

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'
import { Modal } from 'antd';

import bootstrap5Plugin from '@fullcalendar/bootstrap5';

const Calendar = () => {
    const [courses, setCourses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [events, setEvents] = useState([])
    const [values, setValues] = useState({
        title: '',
        start: '',
        end: '',
        color: '#0288D1',
        coursee: ""
    })

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        console.log({ values })
        createCalendar(sessionStorage.getItem("token"), { values })
            .then(res => {
                console.log(res)
                setValues({
                    title: '',
                    start: '',
                    end: '',
                    color: '#0288D1',
                    coursee: ""
                })
                loadData()

            }).catch(err => {
                console.log(err)
            })
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onChangeValues = (e) => {
        // console.log(e.target.value)
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSelect = (info) => {
        // console.log(values)
        showModal();
        setValues({
            ...values,
            start: info.startStr,
            end: info.endStr
        })
    }
    const handleChange = (info) => {
        // console.log(info.event._def)
        // // console.log(info.event.startStr, info.event.endStr)
        const values = {
            id: info.event._def.extendedProps._id,
            start: info.event.startStr,
            end: info.event.endStr
        }
        updateEvent(sessionStorage.getItem("token"), values)
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
    }

    const handleClick = (info) => {
        const id = info.event._def.extendedProps._id
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                removeEvent(sessionStorage.getItem("token"), id)
              .then(res => {
                  console.log(res)
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                  loadData()
                }).catch(err => {
                  console.log(err)
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                  })
                })
              }
            })
    }

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        listCalendar(sessionStorage.getItem("token"))
            .then(res => {
                console.log(res.data)
                setEvents(res.data)
            }).catch(err => {
                console.log(err)
            })
    }

    const fetchMyCourse = () => {
        getmyCourseTeacher(sessionStorage.getItem("token"),
            sessionStorage.getItem("user_id"))
            .then((response) => {
                // console.log(response)
                setCourses(response.data)
            })
            .catch((err) => {
                console.log(err)

            })
    }

    useEffect(() => {
        fetchMyCourse()
    }, [])

    return (
        <div>
            <NavTeacher />
            <div className="container">
                <div className="mt-4">
                    <div className="">
              
  
                            <div  className="card">
                            <div className="bg-primary head-form"></div>
                                <div className="card-body p-5 ">
                                    <FullCalendar  
                                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin,bootstrap5Plugin ]}
                                        headerToolbar={{
                                            left: 'prev today',
                                            center: 'title',
                                            right: "next"
                                        }}
                                        height={700}
                                        // // contentHeight={600}
                                        // // aspectRatio={2}
                                        themeSystem= 'bootstrap5'

                                        events={events}
                                        selectable={true}
                                        select={handleSelect}
                                        // drop={handleRecieve}

                                    // datesSet={currentMonth}
                                    eventClick={handleClick}
                                    editable={true}
                                    eventChange={handleChange}

                                    />
                                </div>
                            </div>
                   
                    </div>

                </div>
            </div>

            <Modal title="สร้างตารางเรียน" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                <div className="mb-5 mt-4">
                   <div className="form-group mb-3">
                            <label className='form-label'>เลือกคอร์ส</label>
                            <select className="form-select" value={'DEFAULT'}

                                onChange={(e) => {
                                    values.coursee = JSON.parse(e.target.value)._id
                                    values.title = JSON.parse(e.target.value).name
                                }}
                                
                            >
                                <option >เลือกคอร์ส...</option>
                                {courses.map((item, index) =>
                                    <option key={index} value={JSON.stringify(item)} >{item.name}</option>
                                )}
                            </select>

                        </div>
                        



                    <div className="form-group">
                        <label className='form-label'>ธีม</label>
                        <select className="form-select" name='color' onChange={onChangeValues} value={values.color}>
                            <option value="#0288D1" className='blue'>blue</option>
                            <option value="#D32F2F" className='red'>red</option>
                            <option value="#512DA8" className='purple'>purple</option>
                            <option value="#388E3C" className='green'>green</option>
                            <option value="#FBC02D" className='yellow'>yellow</option>
                            <option value="#E64A19" className='orange'>orange</option>
                            <option value="#455A64" className='gray'>gray</option>
                        </select>
                    </div>
                </div>
            </Modal>

        </div>
    )
}

export default Calendar