import React from 'react'
import NavTeacher from '../../../layout/NavTeacher'
import { createQuiz, listQuiz, removeQuiz } from '../../../../function/funcFromTeacher'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';

const Test = () => {

    const navigate = useNavigate();
    const [dataQuiz, setDataQuiz] = useState()
    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        listQuiz(sessionStorage.getItem("token"))
            .then(res => {
                console.log(res)
                setDataQuiz(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div>
            <NavTeacher />
            <div className="container">
                <div className='mt-5'>
                    <label className="form-label">แบบทดสอบทั้งหมด</label>
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">ลำดับ</th>
                                    <th scope="col">ชื่อแบบทดสอบ</th>
                                    <th scope="col">จำนวนข้อ</th>
                                    <th scope="col">ผู้สร้าง</th>
                                    <th scope="col">ลบ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataQuiz && dataQuiz.map((item, index) =>
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.title}</td>
                                        <td className='text-center'>{item.question_data.length}</td>
                                        <td>{item.teacher.firstname}</td>
                                        <td><Link to={`/teacher/test/${item._id}`}>ทำแบบทดสอบ</Link></td>
                                    </tr>
                                )}


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Test