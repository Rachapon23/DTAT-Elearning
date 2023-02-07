import React from 'react'
import NavTeacher from '../../../layout/NavTeacher'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";
import { getStudentby,listquizUser } from '../../../../function/funcFromTeacher'
const ScoreDetail = () => {
    const params = useParams()



    const [data, setData] = useState([])
    const [dataCourse, setDataCourse] = useState([])
    const [dataScore, setDataScore] = useState([])
    // const Navigate = useNavigate()

    useEffect(() => {
        loadData()

    }, [])

    const loadData = () => {

        getStudentby(sessionStorage.getItem("token"), params)
            .then(res => {

                console.log(res)
                setData(res.data)
                setDataCourse(res.data.course)
            })
            .catch(err => {
                console.log(err)
            })
            listquizUser(sessionStorage.getItem("token"), params)
            .then(res => {

                console.log(res)
                setDataScore(res.data)
              
            })
            .catch(err => {
                console.log(err)
            })


    }


    return (
        <div>
            <NavTeacher />
            <div className='container'>
                <h5 className='mt-5'>Score detail</h5>
                <div className="row">
                    <div className="col-md-6">

                        <div className="row">
                            <div className="col-md-6">รหัสพนักงาน : </div>
                            <div className="col-md-6">{data.employee_ID}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">รหัสแผนก : </div>
                            <div className="col-md-6">{data.department_ID}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">ชื่อ : </div>
                            <div className="col-md-6">{data.firstname}</div>
                        </div>
                    </div>
                </div>
               <div>
               <label className='form-label mt-4'>คอร์สที่เรียน</label>
                <table className="table ">
                    <thead>
                        <tr>
                            <th scope="col">ลำดับ</th>
                            <th scope="col">รหัสวิชา</th>
                            <th scope="col">ชื่อวิชา</th>
                           
                
                        </tr>
                    </thead>
                    <tbody>
                        {dataCourse && dataCourse.map((item, index) =>
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.course_number}</td>
                                <td>{item.name}</td>
                               
                            </tr>
                        )}


                    </tbody>
                </table>
               </div>
               <div>
               <label className='form-label mt-4'>แบบทดสอบที่ทำ</label>
                <table className="table ">
                    <thead>
                        <tr>
                            <th scope="col">ลำดับ</th>
                            <th scope="col">รหัสวิชา</th>
                            <th scope="col">ชื่อวิชา</th>
                            <th scope="col">ชื่อการสอบ</th>
                            <th scope="col">คะแนน</th>
                           
                
                        </tr>
                    </thead>
                    <tbody>
                        {dataScore && dataScore.map((item, index) =>
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>-</td>
                                <td>-</td>
                                <td>{item.quiz.title}</td>
                                <td className='text-center'>{item.score} / {item.quiz.question_data.length}</td>
                               
                            </tr>
                        )}


                    </tbody>
                </table>
               </div>
            </div>

        </div>
    )
}

export default ScoreDetail