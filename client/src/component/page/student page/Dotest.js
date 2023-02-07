import React from 'react'
import NavStudent from "../../layout/NavStudent"
import { listQuizby,
//  createExaminer 
} from '../../../function/student/funcCourse'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'

import Parser from 'html-react-parser';

const Dotest = () => {

    const navigate = useNavigate();
    const [dataQuiz, setDataQuiz] = useState()
    const [qusetion, setQusetion] = useState([])
    const { params } = useParams()
    useEffect(() => {
        loadData()
    }, [])

    const [value, setValue] = useState([])
    // const value = []

    const loadData = () => {
        listQuizby(sessionStorage.getItem("token"), params)
            .then(res => {
                console.log(res)
                setDataQuiz(res.data)
                setQusetion(res.data.question)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const send = () => {  
        console.log(value)
        // createExaminer(sessionStorage.getItem("token"),
        //     params, value)
        //     .then(res => {
        //         console.log(res)
        //         navigate('/teacher/test')

        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
     
    }
    const handleChange = (index, ch) => {

        // setValue({ ...value, [index.target.name]: ch });
        // let ind = [index.target.name]
        value.push([index.target.name,ch])

    };


    return (
        <div>
            <NavStudent />
            <div className="container">
                <div className='mt-5'>
                    {dataQuiz &&
                        <h3>หัวข้อการทดสอบ : {dataQuiz.name}</h3>}
                </div>
                {qusetion.map((item, index) =>
                    <div
                        key={index} className="border rounded-2 border-secondary mt-3 p-3">
                        <p>ข้อที่ {index + 1}</p>
                       
                      <p>{item.title}</p>

                        <div className="form-check">
                            <input className="form-check-input" type="radio" name={index} 
                            // onChange={(name) => handleChange(name, "0")} 
                            />
                            <p>1. {item.q1}</p>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name={index} 
                            // onChange={(name) => handleChange(name, "0")} 
                            />
                            <p>2. {item.q2}</p>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name={index} 
                            // onChange={(name) => handleChange(name, "0")} 
                            />
                            <p>3. {item.q3}</p>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name={index} 
                            // onChange={(name) => handleChange(name, "0")} 
                            />
                            <p>4. {item.q4}</p>
                        </div>

                    </div>
                )}


                <div className="d-flex justify-content-end mt-3 mb-5">
                    <button className="btn btn-success w-25"
                        onClick={send}>ส่ง</button>
                </div>
            </div>
        </div>
    )
}

export default Dotest