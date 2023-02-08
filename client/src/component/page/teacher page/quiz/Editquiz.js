import React from 'react'
import NavTeacher from '../../../layout/NavTeacher'
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { getQuiz, updateQuiz } from '../../../../function/teacher/funcQuiz'
import './quiz.css'
import Swal from "sweetalert2";

const Editquiz = () => {

    const [valueQuiz, setValueQuiz] = useState([])
    const [nextState, setNextState] = useState([]);
    // const navigate = useNavigate()
    const { id } = useParams();
    const [nameQuiz, setNameQuiz] = useState
        ({
            _id: "",
            name: "",
            explanation: "",
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
        updateQuiz(sessionStorage.getItem("token"),
            {
                head: nameQuiz,
                body: valueQuiz
            })
            .then((response) => {
                console.log(response)
                loadData()
                Swal.fire(
                    'Good job!',
                    `${response.data}`,
                    'success'
                  )
            })
            .catch((err) => {
                console.log(err)

            })
        // console.log()
    }

    const handleRemoveQuiz = (index) => {
        valueQuiz.splice(index, 1)
        setNextState([...nextState])
    }

    const loadData = () => {
        getQuiz(sessionStorage.getItem("token"), id)
            .then((response) => {
                console.log(response)
                setValueQuiz(response.data.question)
                setNameQuiz({ ...nameQuiz, 
                    name: response.data.name,
                     explanation: response.data.explanation,
                     _id:response.data._id
                     })
            })
            .catch((err) => {
                console.log(err)

            })
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <NavTeacher />
            <div className="container">
                <div className="mt-5">
                    <form onSubmit={handSubmit}>
                        <div className="card">
                            <div className="bg-warning head-form"></div>
                            <div className="card-body p-5">
                                <label className="form-label">ชื่อการทดสอบ</label>
                                <input type="text" className="form-control" name='name' value={nameQuiz.name} onChange={handAddName}
                                />
                                <label className="form-label  mt-3">คำชี้แจง</label>
                                <textarea type="text" className="form-control" name='explanation' value={nameQuiz.explanation} onChange={handAddName} />
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
                                    <textarea type="text" placeholder='คำถาม' className="form-control"
                                        onChange={(e) => {
                                            item.title = e.target.value
                                            setValueQuiz([...valueQuiz])
                                        }}
                                        value={item.title}
                                    />
                                    <div className="mt-2">

                                        <div className="d-flex mb-2">
                                            <div className="form-check d-flex align-items-center">
                                                {item.ans === '1'
                                                    ? <input className="form-check-input" type="radio" name={index}
                                                        onChange={(e) => {
                                                            item.ans = "1"
                                                            setValueQuiz([...valueQuiz])
                                                        }}

                                                        defaultChecked={"on"}
                                                    />
                                                    : <input className="form-check-input" type="radio" name={index}
                                                        onChange={(e) => {
                                                            item.ans = "1"
                                                            setValueQuiz([...valueQuiz])
                                                        }}
                                                    />
                                                }
                                            </div>
                                            <input type="text" className="form-control"
                                                onChange={(e) => {
                                                    item.q1 = e.target.value
                                                    setValueQuiz([...valueQuiz])
                                                }}
                                                value={item.q1}
                                            />
                                        </div>
                                        <div className="d-flex mb-2">
                                            <div className="form-check d-flex align-items-center">
                                                {item.ans === '2'
                                                    ? <input className="form-check-input" type="radio" name={index}
                                                        onChange={(e) => {
                                                            item.ans = "2"
                                                            setValueQuiz([...valueQuiz])
                                                        }}

                                                        defaultChecked={"on"}
                                                    />
                                                    : <input className="form-check-input" type="radio" name={index}
                                                        onChange={(e) => {
                                                            item.ans = "2"
                                                            setValueQuiz([...valueQuiz])
                                                        }}
                                                    />
                                                }
                                            </div>
                                            <input type="text" className="form-control"
                                                onChange={(e) => {
                                                    item.q2 = e.target.value
                                                    setValueQuiz([...valueQuiz])
                                                }}
                                                value={item.q2}
                                            />
                                        </div>
                                        <div className="d-flex mb-2">
                                            <div className="form-check d-flex align-items-center">
                                                {item.ans === '3'
                                                    ? <input className="form-check-input" type="radio" name={index}
                                                        // onChange={(e) => {
                                                        //     item.ans = "3"
                                                        //     setValueQuiz([...valueQuiz])
                                                        // }}

                                                        defaultChecked={"on"}
                                                    />
                                                    : <input className="form-check-input" type="radio" name={index}
                                                        onChange={(e) => {
                                                            item.ans = "3"
                                                            setValueQuiz([...valueQuiz])
                                                        }}
                                                    />
                                                }

                                            </div>
                                            <input type="text" className="form-control"
                                                onChange={(e) => {
                                                    item.q3 = e.target.value
                                                    setValueQuiz([...valueQuiz])
                                                }}
                                                value={item.q3}
                                            />
                                        </div>
                                        <div className="d-flex mb-2">
                                            <div className="form-check d-flex align-items-center">
                                                {item.ans === '4'
                                                    ? <input className="form-check-input" type="radio" name={index}
                                                        onChange={(e) => {
                                                            item.ans = "4"
                                                            setValueQuiz([...valueQuiz])
                                                        }}

                                                        defaultChecked={"on"}
                                                    />
                                                    : <input className="form-check-input" type="radio" name={index}
                                                        onChange={(e) => {
                                                            item.ans = "4"
                                                            setValueQuiz([...valueQuiz])
                                                        }}
                                                    />
                                                }
                                            </div>
                                            <input type="text" className="form-control"
                                                onChange={(e) => {
                                                    item.q4 = e.target.value
                                                    setValueQuiz([...valueQuiz])
                                                }}
                                                value={item.q4}
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
                            <button type='submit' className="btn btn-warning">บันทึก</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Editquiz