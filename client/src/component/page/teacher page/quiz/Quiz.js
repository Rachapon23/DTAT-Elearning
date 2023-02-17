import React from 'react'
import NavTeacher from '../../../layout/NavTeacher'
import { useState, useEffect } from 'react'
import { createQuiz } from '../../../../function/teacher/funcQuiz'

import './quiz.css'
import { useNavigate } from 'react-router-dom'
const Quiz = () => {

    const [nextState, setNextState] = useState([]);
    const [valueQuiz, setValueQuiz] = useState([])
    const navigate = useNavigate()
    const [nameQuiz, setNameQuiz] = useState
        ({
            name: "",
            explanation: "",
            attemp: 1,
            teacher: sessionStorage.getItem('user_id')
        })
    const handleAddQuiz = () => {
        setValueQuiz([...valueQuiz,
        {
            title: '',
            q1: "",
            q2: "",
            q3: "",
            q4: "",
            ans: ""
        }
        ])
    }
    const handAddName = (e) => {
        setNameQuiz({ ...nameQuiz, [e.target.name]: e.target.value });
    }
    const handSubmit = (e) => {
        e.preventDefault();
        if (!!!nameQuiz.name) {
            document.getElementById("name").focus({ focusVisible: true });
        }
        else if (!!!nameQuiz.explanation) {
            document.getElementById("explanation").focus({ focusVisible: true });
            // console.log("---")
        }
        else if (valueQuiz.length > 0) {
            for (let i = 0; i < valueQuiz.length; i++) {
                if (!!!valueQuiz[i].title) {
                    document.getElementById(`title${i}`).focus({ focusVisible: true });
                }
                else if (!!!valueQuiz[i].q1) {
                    document.getElementById(`q1${i}`).focus({ focusVisible: true });
                }
                else if (!!!valueQuiz[i].q2) {
                    document.getElementById(`q2${i}`).focus({ focusVisible: true });
                }
                else if (!!!valueQuiz[i].q3) {
                    document.getElementById(`q3${i}`).focus({ focusVisible: true });
                }
                else if (!!!valueQuiz[i].q4) {
                    document.getElementById(`q4${i}`).focus({ focusVisible: true });
                }
                else if (!!!valueQuiz[i].ans) {
                    setTimeout(function () {
                        document.getElementById(`1${i}`).focus({ focusVisible: true });
                    }, 200);
                    setTimeout(function () {
                        document.getElementById(`2${i}`).focus({ focusVisible: true });
                    }, 400);
                    setTimeout(function () {
                        document.getElementById(`3${i}`).focus({ focusVisible: true });
                    }, 600);
                    setTimeout(function () {
                        document.getElementById(`4${i}`).focus({ focusVisible: true });
                    }, 800);
                    setTimeout(function () {
                        document.getElementById(`4${i}`).blur();
                    }, 1000);
                }
                else {
                    createQuiz(sessionStorage.getItem("token"),
                        {
                            head: nameQuiz,
                            body: valueQuiz
                        }
                    )
                        .then(res => {
                            console.log(res)
                            // window.location.reload(false);
                            navigate('/teacher/list-quiz')
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            }
        }


    }
    const handleRemoveQuiz = (index) => {
        valueQuiz.splice(index, 1)
        setNextState([...nextState])
    }

    return (
        <div>
            <NavTeacher />
            {/* {JSON.stringify(nameQuiz)} */}
            <div className="container">
                <div className="mt-5">
                    <form onSubmit={handSubmit}>
                        <div className="card">
                            <div className="bg-success head-form"></div>
                            <div className="card-body p-5">

                                <div className="row">
                                    <div className="col-8">
                                        <label className="form-label">ชื่อการทดสอบ</label>
                                        <input type="text" className="form-control" name='name' onChange={handAddName} />
                                    </div>
                                    <div className="col-4">
                                        <label className="form-label">จำนวนในการเข้าทำแบบทดสอบ</label>
                                        <input type="number" defaultValue={1} min={1} className="form-control" name='attemp' onChange={handAddName} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div>
                                        <label className="form-label  mt-3">คำชี้แจง</label>
                                        <textarea type="text" className="form-control" name='explanation' onChange={handAddName} />
                                    </div>
                                </div>

                            </div>
                        </div>

                        {valueQuiz.map((item, index) => (
                            <div key={index} className="card mt-2">
                                <div className="position-relative">
                                    <button type="button" className="btn position-absolute top-0 end-0 "
                                        onClick={() => handleRemoveQuiz(index)}
                                    >
                                        <span className="bi bi-x iconx" ></span>
                                    </button>
                                </div>
                                <div className="card-body p-5">
                                    <p>ข้อที่ {index + 1}</p>
                                    <textarea type="text" placeholder='คำถาม' className="form-control" id={`title${index}`}
                                        onChange={(e) => {
                                            item.title = e.target.value
                                            setValueQuiz([...valueQuiz])
                                        }}
                                    />
                                    <div className="mt-2">

                                        <div className="d-flex mb-2">
                                            <div className="form-check d-flex align-items-center">
                                                <input className="form-check-input" type="radio" name={index} id={`1${index}`}
                                                    onChange={(e) => {
                                                        item.ans = "1"
                                                        setValueQuiz([...valueQuiz])
                                                    }}
                                                />
                                            </div>
                                            <input type="text" className="form-control"
                                                id={`q1${index}`}
                                                onChange={(e) => {
                                                    item.q1 = e.target.value
                                                    setValueQuiz([...valueQuiz])
                                                }}
                                            />
                                        </div>
                                        <div className="d-flex mb-2">
                                            <div className="form-check d-flex align-items-center">
                                                <input className="form-check-input" type="radio" name={index} id={`2${index}`}
                                                    onChange={(e) => {
                                                        item.ans = "2"
                                                        setValueQuiz([...valueQuiz])
                                                    }}
                                                />
                                            </div>
                                            <input type="text" className="form-control"
                                                id={`q2${index}`}
                                                onChange={(e) => {
                                                    item.q2 = e.target.value
                                                    setValueQuiz([...valueQuiz])
                                                }}
                                            />
                                        </div>
                                        <div className="d-flex mb-2">
                                            <div className="form-check d-flex align-items-center">
                                                <input className="form-check-input" type="radio" name={index} id={`3${index}`}
                                                    onChange={(e) => {
                                                        item.ans = "3"
                                                        setValueQuiz([...valueQuiz])
                                                    }}
                                                />
                                            </div>
                                            <input type="text" className="form-control"
                                                id={`q3${index}`}
                                                onChange={(e) => {
                                                    item.q3 = e.target.value
                                                    setValueQuiz([...valueQuiz])
                                                }}
                                            />
                                        </div>
                                        <div className="d-flex mb-2">
                                            <div className="form-check d-flex align-items-center">
                                                <input className="form-check-input" type="radio" name={index} id={`4${index}`}
                                                    onChange={(e) => {
                                                        item.ans = "4"
                                                        setValueQuiz([...valueQuiz])
                                                    }}
                                                />
                                            </div>
                                            <input type="text" className="form-control"
                                                id={`q4${index}`}
                                                onChange={(e) => {
                                                    item.q4 = e.target.value
                                                    setValueQuiz([...valueQuiz])
                                                }}
                                            />
                                        </div>

                                    </div>

                                </div>
                            </div>
                        ))}


                        <div className="mt-2">
                            <div className="card">
                                <div className="card-body p-0 ">
                                    <div className="d-flex justify-content-end">
                                        <button type="button" className="btn"

                                            onClick={handleAddQuiz}
                                        >
                                            <i className="bi bi-folder-plus h5"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-grid my-3">
                            <button type='submit' className="btn btn-success">บันทึก</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Quiz