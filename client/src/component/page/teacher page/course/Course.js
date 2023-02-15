import React from 'react'
import NavTeacher from '../../../layout/NavTeacher'
import { listQuiz, } from "../../../../function/teacher/funcQuiz";
import { createCourse, } from '../../../../function/teacher/funcCourse';
import { listRoom, uploadImg , uploadfile } from '../../../../function/teacher/funcMiscellaneous'
import { useState, useEffect } from 'react'
import './course.css'
import Swal from "sweetalert2";
import Resizer from "react-image-file-resizer";

const Course = () => {

    const [valuetopic, SetValueTopic] = useState([])
    const [nextState, setNextState] = useState([]);
    const [dataquiz, setDataQuiz] = useState([]);
    const [room, setRoom] = useState([]);
    const [file, setFile] = useState('');


    const [nameCourse, setNameCourse] = useState
        ({
            name: "",
            description: "",
            course_number: "",
            password: "",
            room: "",
            teacher: sessionStorage.getItem('user_id')
        })

    const handleAddTopic = () => {
        SetValueTopic([...valuetopic,
        {
            title: "",
            description: "",
            text: [],
            link: [],
            quiz: [],
            file: [],
        }
        ])
    }
    const handleRemoveTopic = (index) => {
        valuetopic.splice(index, 1)
        setNextState([...nextState])
    }

    const handAddName = (e) => {
        setNameCourse({ ...nameCourse, [e.target.name]: e.target.value });
    }

    const handdleAddtext = (e, index) => {
        e.preventDefault();
        valuetopic[index].text.push(
            {
                type: "text",
                content: "",
            }
        )
        setNextState([...nextState])
    }
    const handdleAddlink = (e, index) => {
        e.preventDefault();
        valuetopic[index].link.push(
            {
                type: "link",
                name: "",
                url: '',
            }
        )
        setNextState([...nextState])
    }

    const handdleAddquiz = (e, index) => {
        e.preventDefault();
        valuetopic[index].quiz.push(
            {
                type: "quiz",
                name: "",
                quiz: ''
            }
        )
        setNextState([...nextState])
    }


    const handleRemoveText = (e, index, tdex) => {
        e.preventDefault();
        valuetopic[index].text.splice(tdex, 1)
        setNextState([...nextState])
    }
    const handleRemoveLink = (e, index, tdex) => {
        e.preventDefault();
        valuetopic[index].link.splice(tdex, 1)
        setNextState([...nextState])
    }
    const handleRemoveQuiz = (e, index, tdex) => {
        e.preventDefault();
        valuetopic[index].quiz.splice(tdex, 1)
        setNextState([...nextState])
    }
 

    const loadQuiz = () => {
        listQuiz(
            sessionStorage.getItem("token"),
            sessionStorage.getItem('user_id')
        )
            .then(res => {
                // console.log(res.data)
                setDataQuiz(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const loadRoom = () => {
        listRoom()
            .then(res => {
                // console.log(res.data)
                setRoom(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

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

    useEffect(() => {
        loadQuiz()
        loadRoom()
    }, [])

    const handdleSubmit = (e) => {
        e.preventDefault();
        console.log(valuetopic[0].file)
        if (!!!nameCourse.name) {
            document.getElementById("nameCourse").focus({ focusVisible: true });
        }
        else if (!!!nameCourse.course_number) {
            document.getElementById("course_number").focus({ focusVisible: true });
        }
        else if (!!!nameCourse.description) {
            document.getElementById("description").focus({ focusVisible: true });
        }
        else if (!!!nameCourse.room) {
            document.getElementById("room").focus({ focusVisible: true });
        }
        else if (valuetopic.length > 0) {
            // console.log("for")
            for (let i = 0; i < valuetopic.length; i++) {
                // console.log("for 2")
                if (!!!valuetopic[i].title) {
                    document.getElementById(`title${i}`).focus({ focusVisible: true });
                }
                else if (!!!valuetopic[i].description) {
                    document.getElementById(`description${i}`).focus({ focusVisible: true });
                }
                else if (valuetopic[i].link.length > 0) {
                    for (let j = 0; j < valuetopic[i].link.length; j++) {
                        if (!!!valuetopic[i].link[j].name) {
                            document.getElementById(`linkname${i}${j}`).focus({ focusVisible: true });
                        } else if (!!!valuetopic[i].link[j].url) {
                            document.getElementById(`linkurl${i}${j}`).focus({ focusVisible: true });
                        }
                    }
                }
                else if (valuetopic[i].text.length > 0) {
                    for (let j = 0; j < valuetopic[i].text.length; j++) {
                        if (!!!valuetopic[i].text[j].content) {
                            document.getElementById(`text${i}${j}`).focus({ focusVisible: true });
                        }
                    }
                }
                else if (valuetopic[i].quiz.length > 0) {
                    for (let j = 0; j < valuetopic[i].quiz.length; j++) {
                        if (!!!valuetopic[i].quiz[j].quiz) {
                            document.getElementById(`quiz${i}${j}`).focus({ focusVisible: true });
                        }
                    }
                }

            }
        }
        else {

            createCourse(sessionStorage.getItem("token")
                ,
                {
                    head: nameCourse,
                    body: valuetopic,
                }
            ).then(res => {
                console.log(res.data)
                const formData = new FormData();
                formData.append('id', res.data._id)
                formData.append('file', file)
                if(file != ''){
                    uploadImg(sessionStorage.getItem("token"),formData).then(res => {
                        console.log(res)
                        Toast.fire({
                            icon: 'success',
                            title: 'Your file has been deleted successfully'
                        })
                        // window.location.reload(false);
                    }).catch(err => {
                        console.log(err)
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const handleImg = (e) => {
        setFile(e.target.files[0])
    }

    return (
        <div>
            <NavTeacher />
            <div className="container">
                <div className="mt-5">
                    <form onSubmit={handdleSubmit}>
                        <div className="card">
                            <div className="bg-primary head-form"></div>
                            <div className="card-body p-5">
                                <label className="form-label">ชื่อบทเรียน</label>
                                <input type="text" className="form-control" name='name' id='nameCourse'
                                    onChange={handAddName}
                                />

                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <label className="form-label">รหัสบทเรียน</label>
                                        <input type="text" className="form-control" name='course_number' id='course_number'
                                            onChange={handAddName} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">รหัสผ่าน</label>
                                        <input type="text" className="form-control" name='password'
                                            onChange={handAddName} />
                                    </div>
                                </div>

                                <label className="form-label  mt-3">รายละเอียด</label>
                                <textarea type="text" className="form-control" name='description' id='description'
                                    onChange={handAddName}
                                />
                                <label className="form-label  mt-3">ห้องเรียน</label>
                                <div className="">
                                    <select name="room" id="room" className='form-select ' onChange={handAddName}>
                                        <option value="">เลือกห้อง</option>
                                        {room.map((item, index) =>
                                            <option key={index} value={item._id}>{item.room}</option>
                                        )}
                                    </select>

                                </div>
                                <label className="form-label  mt-3">รูปหน้าปก</label>
                                <div className="">
                                    <input type="file" className="form-control" onChange={handleImg} />
                                    <p className='text-end mt-2' style={{ fontSize: "12px" }}>ขนาดที่แนะนำ 123px * 456px</p>
                                </div>
                            </div>
                        </div>

                        {valuetopic.map((item, index) =>
                            <div key={index} className="card mt-2">
                                <div className="position-relative">
                                    <button type="button" className="btn position-absolute top-0 end-0 "
                                        onClick={() => handleRemoveTopic(index)}
                                    >
                                        <span className="bi bi-x iconx" ></span>
                                    </button>
                                </div>
                                <div className="card-body p-5">
                                    <p>หัวเรื่อง</p>
                                    <input type="text" className="form-control" name='title' id={`title${index}`}
                                        onChange={(e) => {
                                            item.title = e.target.value
                                            SetValueTopic([...valuetopic])
                                        }}
                                    />
                                    <label className="form-label  mt-3">รายละเอียด</label>
                                    <textarea type="text" className="form-control" id={`description${index}`}
                                        onChange={(e) => {
                                            item.description = e.target.value
                                            SetValueTopic([...valuetopic])
                                        }}
                                    />

                                    <div className="d-flex justify-content-between mb-0 mt-5" >
                                        <p className="">เนื้อหาย่อย</p>
                                        <button className="btn h4 text-primary mb-0"
                                            type='Button' onClick={(e) => handdleAddtext(e, index)}
                                        >+</button>
                                    </div>
                                    <hr className="mt-0" />

                                    <div className="mt-2">
                                        <ul>

                                            {item.text.map((ttem, tdex) =>
                                                <li key={tdex} className="mt-3">
                                                    <div className="input-group">
                                                        <textarea type="text" className="form-control"
                                                            id={`text${index}${tdex}`}
                                                            onChange={(e) => {
                                                                ttem.content = e.target.value
                                                                SetValueTopic([...valuetopic])
                                                            }}
                                                        />
                                                        <button className="btn btn-outline-secondary"
                                                            onClick={(e) => handleRemoveText(e, index, tdex)} type='Button'
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </div>
                                                </li>
                                            )}
                                        </ul>
                                    </div>

                                    <div className="d-flex justify-content-between mb-0 mt-3" >
                                        <p className="">Link</p>
                                        <button className="btn h4 text-primary mb-0"
                                            type='Button' onClick={(e) => handdleAddlink(e, index)}
                                        >+</button>
                                    </div>
                                    <hr className="mt-0" />

                                    <div className="mt-2">
                                        <ul>

                                            {item.link.map((ttem, tdex) =>
                                                <li key={tdex} className="mt-3">
                                                    <div className="">
                                                        <div className="input-group mb-2">
                                                            <input type="text" className="form-control" placeholder="name"
                                                                id={`linkname${index}${tdex}`}
                                                                onChange={(e) => {
                                                                    ttem.name = e.target.value
                                                                    SetValueTopic([...valuetopic])
                                                                }}
                                                            />
                                                            <button className="btn btn-outline-secondary"
                                                                onClick={(e) => handleRemoveLink(e, index, tdex)} type='Button'
                                                            >
                                                                <i className="bi bi-trash"></i>
                                                            </button>
                                                        </div>
                                                        <input type="text" className="form-control" placeholder="url"
                                                            id={`linkurl${index}${tdex}`}
                                                            onChange={(e) => {
                                                                ttem.url = e.target.value
                                                                SetValueTopic([...valuetopic])
                                                            }}
                                                        />
                                                    </div>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
            
                                    <div className="d-flex justify-content-between mb-0 mt-3" >
                                        <p className="">แบบทดสอบ</p>
                                        <button className="btn h4 text-primary mb-0"
                                            type='Button' onClick={(e) => handdleAddquiz(e, index)}
                                        >+</button>
                                    </div>
                                    <hr className="mt-0" />
                                    <div>

                                        {item.quiz.length > 0 &&
                                            <div className="d-grid">
                                                <button className="btn btn-outline-secondary">สร้างแบบทดสอบใหม่</button>
                                            </div>
                                        }
                                        <ul>
                                            {item.quiz.map((ttem, tdex) =>
                                                <div key={tdex} className="mt-2">
                                                    <div>
                                                        <li>
                                                            <div className="input-group mb-2">

                                                                <select
                                                                    id={`quiz${index}${tdex}`}
                                                                    onChange={(e) => {
                                                                        ttem.quiz = JSON.parse(e.target.value)._id
                                                                        ttem.name = JSON.parse(e.target.value).name

                                                                        SetValueTopic([...valuetopic])
                                                                    }}

                                                                    className="form-select" defaultValue={'DEFAULT'}>
                                                                    <option value="DEFAULT" disabled>เลือกแบบทดสอบ</option>
                                                                    {dataquiz.map((dtem, ddex) => (
                                                                        <option key={ddex} value={JSON.stringify(dtem)} >{dtem.name}</option>
                                                                    ))}


                                                                </select>
                                                                <button className="btn btn-outline-secondary"
                                                                    onClick={(e) => handleRemoveQuiz(e, index, tdex)} type='Button'
                                                                >
                                                                    <i className="bi bi-trash"></i>
                                                                </button>
                                                            </div>
                                                        </li>
                                                    </div>
                                                </div>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}


                        <div className="mt-2">
                            <div className="card">
                                <div className="card-body p-0 ">
                                    <div className="d-flex justify-content-end">
                                        <button type="button" className="btn"
                                            onClick={handleAddTopic}
                                        >
                                            <i className="bi bi-folder-plus h5"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-grid my-3">
                            <button type='submit' className="btn btn-primary">บันทึก</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Course