import React from 'react'
import { useState, useEffect } from 'react'
import { Searchcourse, Addchcourse } from '../../../../function/funcFromStudent'
import Swal from 'sweetalert2'
import '../student.css'

const Search = ({ loadMycourse }) => {

    const [query, SetQuery] = useState({
        query: ""
    })
    const [data, setData] = useState([])
    const [dataload, setDataload] = useState(false)
    const handleChange = (e) => {
        SetQuery({ ...query, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(query)
        Searchcourse(query).then(res => {
            console.log(res)
            setData(res.data)
            setDataload(true)
        }).catch(err => {
            console.log(err)
            setDataload(true)
        })
    };
    const handleAddcourse = (id) => {
        // e.preventDefault();

        Swal.fire({
            title: 'ป้อนรหัสเข้าเรียน',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'enroll',
            showLoaderOnConfirm: true,
            preConfirm: (password) => {
                const course_id = {
                    id: id,
                    id_user: sessionStorage.getItem('user_id'),
                    password: password
                }
                return (

                    Addchcourse(course_id)
                        .then(res => {
                            console.log(res)

                            loadMycourse()
                            Swal.fire(
                                'Add course Success!',
                                'Your work has been saved',
                                'success'
                            )
                        }).catch(err => {
                            if (err.response.data == "Password Invalid!!!"
                            ) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'รหัสผ่านไม่ถูกต้อง',
                                    // footer: '<a href="">Why do I have this issue?</a>'
                                })
                            }

                        }))
            },

        })
    };
    // console.log(data)

    return (
        <div>
            <div className="row">
                <div className="col-md-8">
                 
                    <div className="input-group">
                        <input type="text" name='query' className="form-control" onChange={handleChange} />
                        <button onClick={handleSubmit}
                            className="btn" id='search' type="button"><i className="bi bi-search"></i></button>
                    </div>
                </div>
            </div>
            <div>

                {data.length == 0
                    ? <>
                        {dataload &&
                            <p className='mt-2'>ไม่พบคอร์สเรียนที่ค้นหา</p>
                        }
                    </>
                    : <> <div className="row">
                        {data && data.map((course, index) => (

                            <div key={index} className="col-md-4">

                                <h5 className='mt-5 mb-3'>วิชา : {course.name}</h5>
                                <div className="row">
                                    <div className="col-md-6">

                                        <div className="row">
                                            <div className="col-md-6">รหัสวิชา : </div>
                                            <div className="col-md-6">{course.course_number}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">รายละเอียด : </div>
                                            <div className="col-md-6">{course.description}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">ผู้สอน : </div>
                                            <div className="col-md-6">{course.teacher.firstname}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <button className="btn btn-primary btn-sm"
                                        onClick={() => handleAddcourse(course._id)}
                                    >ลงทะเบียน</button>
                                </div>

                            </div>
                        ))
                        }</div>
                    </>
                }
            </div>
        </div>
    )
}

export default Search