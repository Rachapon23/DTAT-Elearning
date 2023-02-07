import React from 'react'
import NavTeacher from '../../../layout/NavTeacher'
import { useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css"
// import { listQuizby, createQusetion } from '../../../../function/funcFromTeacher'
import { useParams } from 'react-router-dom'

const Question = () => {

    const { params } = useParams()


    const [content, setContent] = useState({
        qusetion: "",
        choice: {
            ch1:"",
            ch2:"",
            ch3:"",
            ch4:""
        },
        ans: ""
    })
    const [choice,setChoice] = useState({
        ch1:"",
        ch2:"",
        ch3:"",
        ch4:""
    })

    const [dataQuiz, setDataQuiz] = useState()
    const handdleSubmit = (e) => {
        e.preventDefault();
        const value = {
            qusetion: content.qusetion,
            choice: choice,
            ans: content.ans
        }
        // createQusetion(sessionStorage.getItem("token"),
        //     params, value)
        //     .then(res => {
        //         console.log(res)
        //         window.location.reload(false);

        //     }).catch(err => {
        //         console.log(err)
        //     })

    }
    const handdleFinish = (e) => {
        e.preventDefault();
       
        console.log(content)
        // console.log(ta)

    }
    const handleChange = (e) => {
        setContent({ ...content, [e.target.name] : e.target.value });
    };
    const handleChange_2 = (e) => {
        setChoice({ ...choice, [e.target.name]:e.target.value });
        
        
    };
    const handleQuill = (e) => {
        setContent({ ...content, qusetion: e });
    };

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        // listQuizby(sessionStorage.getItem("token"),
        //     params
        // ).then(res => {
        //     // console.log(res)
        //     setDataQuiz(res.data)
        // }).catch(err => {
        //     console.log(err)
        // })
    }


    return (
        <div>
            <NavTeacher />
            <div className='container'>
                <div className='mt-5 '>
                    {!dataQuiz ? <h2>กำลังโหลด...</h2>
                        : <h2>หัวข้อการสอบ : {dataQuiz.title}</h2>}

                </div>
                <form onSubmit={handdleSubmit} >
                    <div className='mt-3'>
                    {!dataQuiz ?  <label className='form-label'>โจทย์ข้อที่ : ....</label>
                        :  <label className='form-label'>โจทย์ข้อที่ : {dataQuiz.question_data.length+1}</label>}

                       


                        <ReactQuill
                            // value={content.qusetion}
                            onChange={handleQuill}

                            theme="snow"
                            className=''
                            placeholder='เขียนคำถามของคุณ' />
                    </div>

                    <div className='mt-4'>
                        <div className="input-group mb-3">
                            <span className="input-group-text">ตัวเลือกที่ 1</span>
                            <input type="text" name='ch1' className="form-control"
                                onChange={handleChange_2} />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">ตัวเลือกที่ 2</span>
                            <input type="text" name='ch2' className="form-control"
                                onChange={handleChange_2} />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">ตัวเลือกที่ 3</span>
                            <input type="text" name='ch3' className="form-control"
                                onChange={handleChange_2} />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">ตัวเลือกที่ 4</span>
                            <input type="text" name='ch4' className="form-control"
                                onChange={handleChange_2} />
                        </div>
                        <select className="form-select mb-3"
                            onChange={handleChange}
                            name='ans'>
                            <option value="" disabled selected>เลือกคำตอบที่ถูกต้อง</option>
                            <option value="0">ตัวเลือกที่ 1</option>
                            <option value="1">ตัวเลือกที่ 2</option>
                            <option value="2">ตัวเลือกที่ 3</option>
                            <option value="3">ตัวเลือกที่ 4</option>
                        </select>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className="d-grid">
                                <a href='/teacher/create-quiz'  className='btn btn-primary'>จบการสร้างแบบทดสอบ</a>
                                {/* <a onClick={handdleFinish} className='btn btn-primary'>จบการสร้างแบบทดสอบ</a> */}
                            </div>

                        </div>
                        <div className='col'>
                            <div className="d-grid">
                                <button type='submit' className='btn btn-success'>ข้อต่อไป</button>
                            </div>

                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Question