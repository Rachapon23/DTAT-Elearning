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
        toolbar: false
    }
    
    const [materials, setMaterials] = useState({});
    const [courseTopics, setCourseTopics] = useState([]);
    

    const handleAddCourseTopics = () => {
        setCourseTopics([...courseTopics, {
            name: "",
            description: "",
            materials: {},
        }])
    }

    const handleTopicNameChange = (e, index) => {
        console.log(index,courseTopics[index])
        courseTopics[index].name = e
        console.log(...courseTopics)
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
    
    return (
        <div>
            <NavStudent/>
            {/* {JSON.stringify(course)} */}
            {course &&
                
                
                <div>
                    <div className="container p-5 border border-primary">
                        <div className="row">
                            <div className="col-11">
                                <ReactQuill theme="snow" modules={quillToolbar} name="name" value={`<h1>${course.name}</h1>`}/>
                                <ReactQuill theme="snow" modules={quillToolbar} name="description" value={`<p>${course.description}</p>`} className="pt-1"/>
                                <p className="text-muted">{course.teacher.firstname}</p>
                            </div>
                        </div> 
                    </div> 

                    <div className="container p-1"/>
                        {
                            courseTopics && (
                                courseTopics.map((topic, index) => (
                                    <div key={index}>
                                        {JSON.stringify(topic)}
                                        <div className="container pb-2 pt-2 ps-5  border border-primary">
                                            <ReactQuill theme="snow" modules={quillToolbar} value={`<h1>${topic.name}</h1>`} onChange={(e) => handleTopicNameChange(e, index)}/>
                                            <ReactQuill className="pt-1" theme="snow" modules={quillToolbar} value={`<h1>${topic.description}</h1>`} />
                                            <ReactQuill className="pt-1" theme="snow" modules={quillToolbar} value={`<h1>${topic.materials}</h1>`} />
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