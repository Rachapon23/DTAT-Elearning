import React from 'react'
import NavTeacher from '../../../layout/NavTeacher'
import { listQuizby, } from '../../../../function/funcFromTeacher'
// import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'

const QuizDetail = () => {
    const [loading, setLoading] = useState(false)
    const [dataQuiz, setDataQuiz] = useState()
    const [examiner, setExaminer] = useState()
    const { params } = useParams()
    useEffect(() => {
        loadData()
    }, [])
    const loadData = () => {
        setLoading(true)
        listQuizby(sessionStorage.getItem("token"),
            params
        )
            .then(res => {
                console.log(res.data)
                setDataQuiz(res.data)
                setExaminer(res.data.examiner_data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }
    return (
        <div>
            <NavTeacher />
            <div className="container">
                <div>
                    {dataQuiz &&
                    <div>
                     <h5 className='mt-5 mb-3'>แบบทดสอบเรื่อง : {dataQuiz.title}</h5>
                     <div className="row">
                        <div className="col-md-6">
                            <p>รายละเอียด</p>
                            <div className="row">
                                <div className="col-md-6">จำนวนข้อ</div>
                                <div className="col-md-6">{dataQuiz.question_data.length} ข้อ</div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">ผู้เข้าสอบ</div>
                                <div className="col-md-6">{dataQuiz.examiner_data.length} คน</div>
                            </div>
                        </div>
                     </div>
                    </div>
                    }
                    <table className="table mt-3">
                        <thead>
                            <tr>
                                <th scope="col">ลำดับ</th>
                                <th scope="col">ชื่อผู้ทดสอบ</th>
                                <th scope="col">คะแนน</th>
                            </tr>
                        </thead>
                        {!loading &&
                            <tbody>

                                {examiner && examiner.map((item, index) =>
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.examiner_name}</td>
                                        <td className=''>{item.score}</td>
                                    </tr>
                                )}
                            </tbody>}
                    </table>
                    {loading &&
                        <div>
                            <div className='justify-content-center '>
                                <div class="spinner-border text-primary" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>

                        </div>}
                </div>
            </div>
        </div>
    )
}

export default QuizDetail