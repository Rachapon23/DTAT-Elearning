import React from 'react'
import NavTeacher from '../../../layout/NavTeacher'
// import { listQuiz, } from "../../../../function/teacher/funcQuiz";
// import { createCourse } from '../../../../function/teacher/funcCourse';
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { getCourse } from "../../../../function/teacher/funcCourse";
import Swal from "sweetalert2";

const EditCourse = () => {

    const [valuetopic, SetValueTopic] = useState([])
    const { id } = useParams();
    const [course, setCourse] = useState();
    const [topic, setTopic] = useState();
    const [dataQuiz, setDataQuiz] = useState([])

    const fetchCourse = () => {
        getCourse(sessionStorage.getItem("token"), id)
            .then((response) => {
                console.log(response)
                setCourse(response.data)
                setTopic(response.data.topic)
            })
            .catch((err) => {
                console.log(err)
                Swal.fire(
                    "Alert!",
                    "Cannot fetch course data",
                    "error"
                )
            })
    }
    useEffect(() => {
        fetchCourse()
    }, []);

  return (

    <div>
          <NavTeacher />
          <div className="container">
                <div className="mt-5">
                    {course &&
                    <form 
                    // onSubmit={handdleSubmit}
                    >
                        <div className="card">
                            <div className="bg-primary head-form"></div>
                            <div className="card-body p-5">
                                <label className="form-label">ชื่อบทเรียน</label>
                                <input type="text" className="form-control" name='name'
                                    // onChange={handAddName}
                                    value={course.name}
                                />

                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <label className="form-label">รหัสบทเรียน</label>
                                        <input type="text" className="form-control" name='course_number'
                                    // onChange={handAddName}
                                    value={course.course_number}
                                    />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">รหัสผ่าน</label>
                                        <input type="text" className="form-control" name='password'
                                    // onChange={handAddName}
                                    value={course.password}
                                    />
                                    </div>
                                </div>

                                <label className="form-label  mt-3">รายละเอียด</label>
                                <textarea type="text" className="form-control" name='description'
                                    // onChange={handAddName}
                                    value={course.description}
                                />
                            </div>
                        </div>

                        {valuetopic.map((item, index) =>
                            <div key={index} className="card mt-2">
                                <div className="position-relative">
                                    <button type="button" className="btn position-absolute top-0 end-0 "
                                        // onClick={() => handleRemoveTopic(index)}
                                    >
                                        <span className="bi bi-x iconx" ></span>
                                    </button>
                                </div>
                                <div className="card-body p-5">
                                    <p>หัวเรื่อง</p>
                                    <input type="text" className="form-control" name='title'
                                        // onChange={(e) => {
                                        //     item.title = e.target.value
                                        //     SetValueTopic([...valuetopic])
                                        // }}
                                    />
                                    <label className="form-label  mt-3">รายละเอียด</label>
                                    <textarea type="text" className="form-control"
                                        // onChange={(e) => {
                                        //     item.description = e.target.value
                                        //     SetValueTopic([...valuetopic])
                                        // }}
                                    />

                                    <div className="d-flex justify-content-between mb-0 mt-5" >
                                        <p className="">เนื้อหาย่อย</p>
                                        <button className="btn h4 text-primary mb-0"
                                            type='Button'
                                            //  onClick={(e) => handdleAddtext(e, index)}
                                        >+</button>
                                    </div>
                                    <hr className="mt-0" />

                                    <div className="mt-2">
                                        <ul>

                                            {item.text.map((ttem, tdex) =>
                                                <li key={tdex} className="mt-3">
                                                    <div className="input-group">
                                                        <textarea type="text" className="form-control"
                                                            // onChange={(e) => {
                                                            //     ttem.content = e.target.value
                                                            //     SetValueTopic([...valuetopic])
                                                            // }}
                                                        />
                                                        <button className="btn btn-outline-secondary"
                                                            // onClick={(e) => handleRemoveText(e, index, tdex)}
                                                             type='Button'
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
                                            type='Button' 
                                            // onClick={(e) => handdleAddlink(e, index)}
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
                                                                // onChange={(e) => {
                                                                //     ttem.name = e.target.value
                                                                //     SetValueTopic([...valuetopic])
                                                                // }}
                                                            />
                                                            <button className="btn btn-outline-secondary"
                                                                // onClick={(e) => handleRemoveLink(e, index, tdex)} type='Button'
                                                            >
                                                                <i className="bi bi-trash"></i>
                                                            </button>
                                                        </div>
                                                        <input type="text" className="form-control" placeholder="url"
                                                            // onChange={(e) => {
                                                            //     ttem.url = e.target.value
                                                            //     SetValueTopic([...valuetopic])
                                                            // }}
                                                        />
                                                    </div>
                                                </li>
                                            )}
                                        </ul>
                                    </div>

                                    <div className="d-flex justify-content-between mb-0 mt-3" >
                                        <p className="">แบบทดสอบ</p>
                                        <button className="btn h4 text-primary mb-0"
                                            type='Button' 
                                            // onClick={(e) => handdleAddquiz(e, index)}
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
                                                                    // onChange={(e) => {
                                                                    //     ttem.quiz = JSON.parse(e.target.value)._id
                                                                    //     ttem.name = JSON.parse(e.target.value).name

                                                                    //     SetValueTopic([...valuetopic])
                                                                    // }}

                                                                    className="form-select" defaultValue={'DEFAULT'}>
                                                                    <option value="DEFAULT" disabled>เลือกแบบทดสอบ</option>
                                                                    {/* {dataquiz.map((dtem, ddex) => (
                                                                        <option key={ddex} value={JSON.stringify(dtem)} >{dtem.name}</option>
                                                                    ))} */}


                                                                </select>
                                                                <button className="btn btn-outline-secondary"
                                                                    // onClick={(e) => handleRemoveQuiz(e, index, tdex)}
                                                                     type='Button'
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
                                            // onClick={handleAddTopic}
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
                    }
                </div>
            </div>
    </div>
  )
}

export default EditCourse