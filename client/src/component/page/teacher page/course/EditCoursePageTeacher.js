import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import NavStudent from "../../../layout/NavStudent";
import { getCourse } from "../../../../function/funcFromStudent";
import Swal from "sweetalert2";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./course.css"
import { CreateTopic, listQuiz, UpdateTopic } from "../../../../function/funcFromTeacher";
import EditToppic from "./EditToppic";
import NavTeacher from "../../../layout/NavTeacher";
import Topic from "./Topic";



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
        listQuiz(sessionStorage.getItem("token"))
            .then(res => {
                setDataQuiz(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }


    const handleDeleteTopic = (index) => {
        courseTopics.splice(index, 1)
        setCourseTopics([...courseTopics])
        // setMaterials([...materials])

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

    const createCourseTopic = () => {

        //quiz ห้ามว่าง create
        console.log(courseTopics.length)
        UpdateTopic(sessionStorage.getItem('token'), topic)
            .then(res => {
                console.log(res)
                window.location.reload(false);
            }).catch(err => {
                console.log(err)
            })

        if (courseTopics.length != 0) {
            CreateTopic(sessionStorage.getItem('token'), courseTopics)

                .then(res => {
                    console.log(res)
                    window.location.reload(false);
                }).catch(err => {
                    console.log(err)
                })
        }

    }
    // const handlechangeQuiz = (e, index,) => {
    //     courseTopics[index].quiz = e.target.value
    // }
    useEffect(() => {
        fetchCourse()
        loadData()
    }, []);

    return (
        <div>
            <NavTeacher />
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
                        <EditToppic key={index} item={item} setTopic={setTopic} topic={topic} index={index} />
                    ))}
                    <div className="p-2">
                        <button className="btn btn-info" onClick={handleshowTopic}>Show CourseTopic</button>
                    </div>

                    {
                        courseTopics && (
                            courseTopics.map((topic, index) => (
                                <div key={index} className="mb-3" >
                                    <div className="border border-primary">
                                        <div className="d-flex justify-content-end p-2">
                                            <button type="button" className="btn"
                                                onClick={() => handleDeleteTopic(index)}
                                            >
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
                                            <Topic dataQuiz={dataQuiz} topic={topic} index={index} courseTopics={courseTopics} setMaterials={setMaterials} materials={materials}/>
 

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
                                    <i className="bi bi-folder-plus h5"></i>
                                </button>
                            </div>

                        </div>
                    </div>
        
                    <div className="d-grid p-5">
                        <button className="btn" id="back"
                            onClick={createCourseTopic}
                            
                        >save</button>
                    </div>
    
                </div>
            }
        </div>
    );
}

export default EditCoursePageTeacher;


