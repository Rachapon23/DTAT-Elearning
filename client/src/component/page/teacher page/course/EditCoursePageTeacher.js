import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavStudent from "../../../layout/NavStudent";
import { getCourse } from "../../../../function/funcFromStudent";
import Swal from "sweetalert2";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./course.css"
import { CreateTopic, listQuiz, UpdateTopic} from "../../../../function/funcFromTeacher";
import EditToppic from "./EditToppic";


const EditCoursePageTeacher = () => {
    const course_id = useParams();
    const [course, setCourse] = useState("");
    const quillToolbar = {
        toolbar: false,
    }
    const { id } = course_id

    const [materials, setMaterials] = useState([]);
    const [courseTopics, setCourseTopics] = useState([]);
    const [topic, setTopic] = useState();
    const [dataQuiz, setDataQuiz] = useState([])


    const handleAddCourseTopics = () => {
        setCourseTopics([...courseTopics, {
            name: "<h1> </h1>",
            description: "<h3> </h3>",
            materials: [],
            quiz: "63cf8323cc09a371b149c3d6",
            course: id
        }])
    }

    const loadData = () => {
        // setLoading(true)
        listQuiz(sessionStorage.getItem("token"))
            .then(res => {
                // console.log(res)
                setDataQuiz(res.data)
                // setLoading(false)
            })
            .catch(err => {
                console.log(err)
                // setLoading(false)
            })
    }

    const handleAddMaterial = (t_index) => {
        // console.log(courseTopics[t_index].materials[])
        courseTopics[t_index].materials.push("")
        setMaterials([...materials])
    }

    const handleDeleteMaterial = (t_index, m_index) => {
        // console.log(index)
        courseTopics[t_index].materials.splice(m_index, 1)
        setMaterials([...materials])
        // console.log(materials)
    }
    const handleDeleteTopic = (index) => {
        courseTopics.splice(index, 1)
        setMaterials([...materials])

    }

    const handleTopicNameChange = (e, index) => {
        courseTopics[index].name = e
    };

    const handleTopicDescriptionChange = (e, index) => {
        courseTopics[index].description = e
    };
    const handleMaterial = (e, index, m_index) => {
        console.log(e.target.value)
        courseTopics[index].materials[m_index] = e.target.value
    };

    const fetchCourse = () => {
        getCourse(course_id)
            .then((response) => {
                // console.log(response)
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

    const createCourseTopic = () => {
        console.log(courseTopics)
        CreateTopic(sessionStorage.getItem('token'), courseTopics)
            .then(res => {
                console.log(res)
                window.location.reload(false);
            }).catch(err => {
                console.log(err)
            })
        console.log(topic)
        // UpdateTopic(sessionStorage.getItem('token'), topic)
        //     .then(res => {
        //         console.log(res)
        //         // window.location.reload(false);
        //     }).catch(err => {
        //         console.log(err)
        //     })
    }

    // const handleAddQuiz = (index) => {
    //     console.log(index)
    // }
    const handlechangeQuiz = (e, index,) => {
        courseTopics[index].quiz = e.target.value
        // console.log(e.target.value)
    }
    useEffect(() => {
        fetchCourse()
        loadData()
    }, []);

    return (
        <div>
            <NavStudent />
            {course &&
                <div className="container ">
                    <div className="p-5 border border-primary my-3">
                        <div className="row">
                            <div className="">
                                <div className="mb-3">
                                    <label className=" form-label">Course: </label>
                                    <ReactQuill className=" " theme="snow" modules={quillToolbar} name="name" value={`<h1>${course.name}</h1>`} />
                                </div>
                                <div className="mb-3">
                                    <label className=" form-label">Description: </label>
                                    <ReactQuill className="" theme="snow" modules={quillToolbar} name="description" value={`<h2>${course.description}</h2>`} />
                                </div>
                                <div className="mb-3">
                                    <label className=" form-label">Teacher: </label>
                                    <ReactQuill className="text-muted" theme="snow" modules={quillToolbar} name="description" readOnly value={`<h2>${course.teacher.firstname}</h2>`} />

                                </div>


                            </div>
                        </div>
                    </div>



                    {topic && topic.map((item, index) => (
                        <EditToppic key={index} item={item} setTopic={setTopic} topic={topic}  index={index}/>
                    ))}

                    {
                        courseTopics && (
                            courseTopics.map((topic, index) => (
                                <div key={index} className="mb-3" >
                                    {/* <div className="p-2">{JSON.stringify(topic)}</div> */}
                                    <div className="border border-primary">
                                        <div className="d-flex justify-content-end p-2">
                                            <button type="button" className="btn"
                                                onClick={() => handleDeleteTopic(index)}
                                            >
                                                {/* <h5><i class="bi bi-x-lg"></i></h5> */}
                                                <span className="bi bi-x iconx" ></span>
                                            </button>
                                        </div>
                                        <div className="px-5">
                                            <div className="">
                                                <div className="mb-3">
                                                    <label className="form-label">Topic </label>
                                                    <ReactQuill className="" theme="snow" modules={quillToolbar} name="name" value={`<h1>${topic.name}</h1>`} onChange={(e) => handleTopicNameChange(e, index)} />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Description </label>
                                                    <ReactQuill className="" theme="snow" modules={quillToolbar} value={`${topic.description}`} onChange={(e) => handleTopicDescriptionChange(e, index)} />
                                                </div>
                                            </div>
                                            <div className="">
                                                <label className="form-label">Materials </label>
                                                {
                                                    topic.materials.map((material, m_index) => (
                                                        <div key={m_index}>

                                                            <div className="input-group mb-3">
                                                                <input type="text" className="form-control"
                                                                    onChange={(e) => handleMaterial(e, index, m_index)}
                                                                />
                                                                <button className="btn btn-outline-secondary "
                                                                    onClick={() => handleDeleteMaterial(index, m_index)}>
                                                                    <i className="bi bi-trash"></i>
                                                                </button>
                                                            </div>

                                                        </div>
                                                    ))
                                                }

                                            </div>
                                            <div className="my-2">
                                                <div className="d-flex justify-content-between ">
                                                    <button type="button" className=" btn btn-primary btn-sm" onClick={() => handleAddMaterial(index)}>add</button>
                                                    <button className="btn btn-primary btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"
                                                    // onClick={() => handleAddQuiz(index)}
                                                    >add Quiz</button>

                                                </div>
                                                <div className="my-2">
                                                    <div className="collapse" id="collapseExample">
                                                        <div className="">
                                                            <select
                                                                onChange={(e) => handlechangeQuiz(e, index)}
                                                                className="form-select" >
                                                                <option disabled selected value="">เลือกควิชที่ต้องการ</option>
                                                                {dataQuiz.map((item, index) => (
                                                                    <option key={index} value={item._id}>{item.title}</option>
                                                                ))}


                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    }
                    <div  >

                        <div className="border border-primary mt-3">
                            <div className="d-flex justify-content-end p-2">
                                <button type="button" className="btn"

                                    onClick={handleAddCourseTopics}
                                >
                                    <i className="bi bi-plus-lg iconPlus"></i>
                                </button>
                            </div>

                        </div>
                    </div>
                    {/* <div className=" my-4 fixed-bottom d-flex justify-content-center"> */}
                    <div className="d-grid p-5">
                        <button className="btn" id="back"
                            onClick={createCourseTopic}
                            
                        >save</button>
                    </div>
                    {/* </div> */}
                </div>
            }
        </div>
    );
}

export default EditCoursePageTeacher;