import React from 'react'
import { useState, useEffect } from 'react'
import { Searchcourse, Addchcourse } from '../../../../function/student/funcCourse'
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
        // e.preventDefault();
        // console.log(query)
        if (!!!query.query) {
            Swal.fire(
                {
                    title: 'ต้องการหาคอร์สเรียนหรือไม่?',
                    text: "กรุณากรอกรหัสประจำวิชา",
                    icon: 'question',
                    confirmButtonColor: '#0d6efd',
                    confirmButtonText: 'try again'
                }
            )
        } else {
            Searchcourse(sessionStorage.getItem("token"), query)
                .then(res => {
                    console.log(res)
                    setData(res.data)
                    setDataload(true)
                }).catch(err => {
                    console.log(err)
                    setDataload(true)
                })
        }

    };

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
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
            confirmButtonColor: '#28a745',
            showLoaderOnConfirm: true,
            preConfirm: (password) => {
                const course_id = {
                    id: id,
                    id_user: sessionStorage.getItem('user_id'),
                    password: password
                }
                return (

                    Addchcourse(sessionStorage.getItem("token"), course_id)
                        .then(res => {
                            console.log(res)

                            loadMycourse()
                            Toast.fire({
                                icon: 'success',
                                title: 'Signed in successfully'
                              })
                        }).catch(err => {
                            if (err.response.data == "Password Invalid!!!"
                            ) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'รหัสผ่านไม่ถูกต้อง',
                                    confirmButtonColor: '#0d6efd',
                                    confirmButtonText: 'try again'
                                })
                            }else if(err.response.data == "course already exist"){
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'มีวิชานี้อยู่แล้ว',
                                    confirmButtonColor: '#0d6efd',
                                    confirmButtonText: 'try again'
                                })
                            }else{
                                console.log(err)
                            }

                        }))
            },

        })
    };
    // console.log(data)

    const entertext = (e) => {
        if (e.key === 'Enter') {
            handleSubmit()
        }
    }

    return (
        <div>

            <div className="row">
                <div className="col-md-8">

                    <div className="input-group">
                        <input type="text" name='query' onKeyDown={entertext}
                            className="form-control" onChange={handleChange} />
                        <button onClick={handleSubmit}
                            className="btn btn-danger" type="button"><i className="bi bi-search"></i></button>
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
                            <div key={index} className="search mt-2 p-3">
                                <h5 className='mb-2'>วิชา : {course.name}</h5>
                                <div className="" >
                                    <p className=" text-muted mb-0">รหัสวิชา :  {course.course_number} </p>
                                    <p className=" text-muted">ผู้สอน : {course.teacher.firstname}</p>
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