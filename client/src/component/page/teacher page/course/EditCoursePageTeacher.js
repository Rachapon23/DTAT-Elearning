import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import NavStudent from "../../../layout/NavStudent";
// import { getCourse } from "../../../../function/funcFromStudent";
import Swal from "sweetalert2";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./course.css"
// import { CreateTopic, listQuiz, UpdateTopic } from "../../../../function/funcFromTeacher";
import EditToppic from "./EditToppic";
import NavTeacher from "../../../layout/NavTeacher";
import Topic from "./Topic";



const EditCoursePageTeacher = () => {
    const course_id = useParams();
    const [course, setCourse] = useState("");
    // const [value, setValue] = useState('');
    const quillToolbar = {
        toolbar: false,
    }
    const { id } = course_id

    const [materials, setMaterials] = useState([]);
    const [courseTopics, setCourseTopics] = useState([]);
    const [topic, setTopic] = useState();
    const [dataQuiz, setDataQuiz] = useState([])

    const [content, setContent] = useState({
        type: "",
        content: ""
    })

    const handleAddCourseTopics = () => {
        setCourseTopics([...courseTopics, {
            name: "",
            description: "",
            materials: [],
            quiz: "63cf8323cc09a371b149c3d6",
            course: id
        }])
    }

    const loadData = () => {
        // listQuiz(sessionStorage.getItem("token"))
        //     .then(res => {
        //         setDataQuiz(res.data)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
    }


    const handleDeleteTopic = (index) => {
        courseTopics.splice(index, 1)
        setCourseTopics([...courseTopics])
        // setMaterials([...materials])

    }

    const handleTopicNameChange = (e, index) => {
        courseTopics[index].name = e.target.value
        // console.log(e)
    };

    const handleTopicDescriptionChange = (e, index) => {
        courseTopics[index].description = e
    };

    const handleMaterial = (e, index, m_index) => {
        console.log(e.target.value)
        courseTopics[index].materials[m_index] = e.target.value
    };

    const fetchCourse = () => {
        // getCourse(course_id)
        //     .then((response) => {
        //         console.log(response)
        //         setCourse(response.data)
        //         setTopic(response.data.topic)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //         Swal.fire(
        //             "Alert!",
        //             "Cannot fetch course data",
        //             "error"
        //         )
        //     })
    }

    const createCourseTopic = () => {
        // UpdateTopic(sessionStorage.getItem('token'), topic)
        //     .then(res => {
        //         console.log(res)
        //         window.location.reload(false);
        //     }).catch(err => {
        //         console.log(err)
        //     })

        // if (courseTopics.length != 0) {
        //     CreateTopic(sessionStorage.getItem('token'), courseTopics)

        //         .then(res => {
        //             console.log(res)
        //             window.location.reload(false);
        //         }).catch(err => {
        //             console.log(err)
        //         })
        // }

    }

    useEffect(() => {
        fetchCourse()
        loadData()
    }, []);

    // console.log(courseTopics)

    return (
        <div>
            <NavTeacher />
            {course &&
                <div className="container">
                    <div className="px-5 py-3 border bg-white  mt-3">
                        <div className="row">
                            <div className="">
                                <div className="mb-3">
                                    <label className=" form-label">Course: </label>
                                    {/* <ReactQuill className=" " theme="snow" modules={quillToolbar} name="name" value={course.name}/> */}
                                    <input type="text" value={course.name} className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className=" form-label">Description: </label>
                                    {/* <ReactQuill className="" theme="snow" modules={quillToolbar} name="description" value={course.description} /> */}
                                    <ReactQuill theme="snow" value={course.description}
                                    // onChange={setValue} 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className=" form-label">Teacher: </label>
                                    <input type="text" value={course.teacher.firstname} disabled className="form-control" />
                                    {/* <ReactQuill className="text-muted" theme="snow" modules={quillToolbar} name="description" readOnly value={course.teacher.firstname} /> */}

                                </div>


                            </div>
                        </div>
                    </div>



                    {topic && topic.map((item, index) => (
                        <EditToppic key={index} item={item} setTopic={setTopic} topic={topic} index={index} />
                    ))}

                    {
                        courseTopics && (
                            courseTopics.map((topic, index) => (
                                <div key={index} className="mb-3" >
                                    <div className="position-relative">
                                        <button type="button" className="btn position-absolute top-0 end-0 "
                                            onClick={() => handleDeleteTopic(index)}
                                        >
                                            <span className="bi bi-x iconx" ></span>
                                        </button>
                                    </div>
                                    <div className="py-3 border bg-white  mt-3">
                                        <div className="px-5">
                                            <div className="">
                                                <div className="mb-3">
                                                    <label className="form-label">Topic </label>
                                                    {/* <ReactQuill className="" theme="snow" modules={quillToolbar} name="name" value={`${topic.name}`}
                                                        onChange={(e) => handleTopicNameChange(e, index)} /> */}
                                                        <input type="text" className="form-control"
                                                         onChange={(e) => handleTopicNameChange(e, index)}
                                                        />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Description </label>
                                                    {/* <ReactQuill className="" theme="snow" modules={quillToolbar} value={`${topic.description}`}
                                                        onChange={(e) => handleTopicDescriptionChange(e, index)} /> */}
                                                    <ReactQuill theme="snow" value={topic.description}
                                                        onChange={(e) => handleTopicDescriptionChange(e, index)}
                                                    />
                                                </div>
                                            </div>
                                            <Topic dataQuiz={dataQuiz} topic={topic} index={index} courseTopics={courseTopics} setMaterials={setMaterials} materials={materials} />


                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    }
                    <div  >

                        <div className=" py-3 border bg-white  mt-3">
                            <div className="d-flex justify-content-end p-2">
                                <button type="button" className="btn"

                                    onClick={handleAddCourseTopics}
                                >
                                    <i className="bi bi-folder-plus h5"></i>
                                </button>
                            </div>

                        </div>
                    </div>

                    <div className="d-grid p-5">
                        <button className="btn btn-outline-success"
                            onClick={createCourseTopic}

                        >save</button>
                    </div>

                </div>
            }
        </div>
    );
}

export default EditCoursePageTeacher;


