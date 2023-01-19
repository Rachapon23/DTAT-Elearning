import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavStudent from "../../layout/NavStudent";
import { getCourse } from "../../../function/funcFromStudent";
import Swal from "sweetalert2";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditCoursePageTeacher = () => {
    const course_id = useParams();
    const [course, setCourse] = useState("");
    const quillToolbar = {
        toolbar: false,
    }
    
    const [materials, setMaterials] = useState([]);
    const [courseTopics, setCourseTopics] = useState([]);
    

    const handleAddCourseTopics = () => {
        setCourseTopics([...courseTopics, {
            name: "<h1> </h1>",
            description: "<h3> </h3>",
            materials: [""]
        }])
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

    const handleTopicNameChange = (e, index) => {
        console.log(index,courseTopics[index])
        courseTopics[index].name = e
        // console.log(...courseTopics)
        // setCourseTopics(...courseTopics)
        
    };

    const handleTopicDescriptionChange = (e, index) => {
        console.log(index,courseTopics[index])
        courseTopics[index].description = e
        // console.log(...courseTopics)
        // setCourseTopics(...courseTopics)
        
    };

    const fetchCourse = () => {
        getCourse(course_id)
        .then((response) => {
            console.log(response)
            setCourse(response.data)
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

    }

    useEffect(() => {
        fetchCourse()
    }, []);

    // useEffect(() => {
    //     ReactQuill()
    // }, [courseTopics])
    
    return (
        <div>
            <NavStudent/>
            {/* {JSON.stringify(course)} */}
            {course &&
                
                
                <div>
                    <div className="container p-5 border border-primary">
                        <div className="row">
                            <div className="col-11">
                                <div className="row"> 
                                    <h4 className="col-2 pt-3">Course: </h4>
                                    <ReactQuill className="col-10 " theme="snow" modules={quillToolbar} name="name" value={`<h1>${course.name}</h1>`}/>
                                </div>
                                <div className="row">
                                    <h4 className="col-2 pt-4">Description: </h4>
                                    <ReactQuill className="col-10 pt-3" theme="snow" modules={quillToolbar} name="description" value={`<h2>${course.description}</h2>`}/>
                                </div>
                                <div className="row">
                                    <h4 className="col-2 pt-4">Teacher: </h4>
                                    <ReactQuill className="text-muted col-10 pt-3" theme="snow" modules={quillToolbar} name="description" readOnly value={`<h2>${course.teacher.firstname}</h2>`}/>
                                    {/* <input type="text" id="disabledTextInput" className="form-control" value={`<h2>${course.teacher.firstname}</h2>`} disabled/> */}
                                </div>
                                
                                
                            </div>
                        </div> 
                    </div> 

                    <div className="container p-1"/>
                        {
                            courseTopics && (
                                courseTopics.map((topic, index) => (
                                    <div key={index} >
                                        {JSON.stringify(topic)}
                                        <div className="container pb-2 pt-2   border border-primary">
                                            <h4 className="col-2 pt-3">Topic </h4>
                                            <ReactQuill className="pt-1" theme="snow" modules={quillToolbar} name="name" value={`<h1>${course.name}</h1>`} onChange={(e) => handleTopicNameChange(e, index)}/>
                                            <h4 className="col-2 pt-3">Description </h4>
                                            <ReactQuill className="pt-1" theme="snow" modules={quillToolbar} value={`${topic.description}`} onChange={(e) => handleTopicDescriptionChange(e, index)} />
                                            <h4 className="col-2 pt-3">Materials </h4>
                                            {
                                                topic.materials.map((material, m_index) => (
                                                    <div key={m_index}>
                                                        <ReactQuill  className="pt-1" theme="snow" modules={quillToolbar} value={material} />
                                                        <button type="button" className=" btn btn-primary btn-sm" onClick={() => handleDeleteMaterial(index, m_index)}>delete</button>    
                                                    </div>
                                                ))
                                            }
                                            <div className="d-flex justify-content-end">
                                                <button type="button" className=" btn btn-primary btn-sm" onClick={() => handleAddMaterial(index)}>add</button>
                                            </div>  
                                    </div>
                                        <div className="container p-1"/>
                                    </div>
                                ))
                            )
                        }
                    

                    <div className="container pb-2 pt-2 ps-5  border border-primary">
                        <button type="button" className="btn btn-primary btn-sm" onClick={handleAddCourseTopics}>add</button>
                    </div>  
                </div> 
            }
        </div>
    );
}

export default EditCoursePageTeacher;