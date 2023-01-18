import React from 'react'
import NavTeacher from '../../../layout/NavTeacher'
import { listQuizby } from '../../../../function/funcFromTeacher'
// import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'
// import HtmlToReactParser from "html-to-react";
import Parser from 'html-react-parser';

const Dotest = () => {
    const [dataQuiz, setDataQuiz] = useState()
    const [qusetion, setQusetion] = useState([])
    const { params } = useParams()
    useEffect(() => {
        loadData()
    }, [])
    const [arrQuse,setArrQuse] = useState([])
    const [obj,setObj] = useState({})

    const loadData = () => {
        listQuizby(sessionStorage.getItem("token"), params)
            .then(res => {
                console.log(res)
                setDataQuiz(res.data)
                setQusetion(res.data.question_data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const send = () =>{
        // console.log(arrQuse)
        console.log(obj)
    }
    const handleChange = (e) => {
        setObj({ ...obj, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <NavTeacher />
            <div className="container">
                <div className='mt-5'>
                    {dataQuiz &&
                        <h3>หัวข้อการทดสอบ : {dataQuiz.title}</h3>}
                </div>
                {qusetion.map((item, index) => (
                    <div
                        key={index} className="border rounded-2 border-secondary mt-3 p-3">
                            <p>ข้อที่ {index+1}</p>
                        <>{Parser(item.qusetion)}</>
                        {/* {item.choice1.map((etem,edex)=>
                        <div class="form-check">
                        <input class="form-check-input" type="radio" name={index} onChange={(name)=>handleChange(name,item.choice1)}/>
                        <p>1. {item.choice1}</p>
                    </div>
                        )} */}
                        {/* <div class="form-check">
                            <input class="form-check-input" type="radio" name={index} onChange={(name)=>handleChange(name,item.choice1)}/>
                            <p>1. {item.choice1}</p>
                        </div> */}
                        {/* <div class="form-check">
                            <input class="form-check-input" type="radio" name={index} onChange={handleChange}/>
                            <p>2. {item.choice2}</p>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name={index} onChange={handleChange}/>
                            <p>3. {item.choice3}</p>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name={index} onChange={handleChange}/>
                            <p>4. {item.choice4}</p>
                        </div> */}

                    </div>
                ))}

                <div className="d-flex justify-content-end mt-3 mb-5">
                    <button className="btn btn-success w-25"
                    onClick={send}>ส่ง</button>
                </div>
            </div>
        </div>
    )
}

export default Dotest