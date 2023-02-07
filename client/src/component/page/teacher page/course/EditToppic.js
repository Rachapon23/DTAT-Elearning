import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from "react";
// import { listQuiz, } from "../../../../function/funcFromTeacher";

const EditToppic = ({ item, setTopic, topic, index }) => {
    const quillToolbar = {
        toolbar: false,
    }
    
    const [dataQuiz, setDataQuiz] = useState([])
    const [value, setValue] = useState(item)

    const handleChangeName = (e) => {
        // setValue({ ...value, name: e });
        topic[index].name = e.target.value

    };
    const handleChangeDes = (e) => {
        // setValue({ ...value, description: e });
        topic[index].description = e
    };
    const testIndex = () => {
        // console.log(index)
        console.log(topic)
        // console.log(value)
        // topic[index] = value
    };

    useEffect(() => {
        loadData()
    }, []);
    
    // console.log(value)
    const loadData = () => {
        // listQuiz(sessionStorage.getItem("token"))
        //     .then(res => {
        //         setDataQuiz(res.data)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
    }

    return (
        <div>
            <div className="px-5 py-3 border bg-white  mt-3">
                <div className="row">
                    {/* <h1 className="">{item.name}</h1>
                    <p>{item.description}</p>
                    {item.materials.map((mtem, mdex) => (
                        <p key={mdex}>
                            {mtem}
                        </p>
                    ))} */}
                    <div className="mb-3">
                        <label className="form-label">Topic </label>

                        <input type="text" defaultValue={item.name} className="form-control" 
                           onChange={(e)=>handleChangeName(e)}
                           />

                        {/* <ReactQuill className="" theme="snow" modules={quillToolbar}
                            value={value.name}
                            onChange={handleChangeName}
                        // 
                        /> */}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description </label>
                        {/* <ReactQuill className="" theme="snow" modules={quillToolbar}
                            value={value.description}
                            onChange={handleChangeDes}
                        //  onChange={(e) => handleTopicDescriptionChange(e, index)}
                        /> */}
                         <ReactQuill theme="snow" value={value.description}
                                                         onChange={handleChangeDes}
                                                    />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">material ยังแก้ไขไม่ได้</label>
                        {value.materials.map((mtem, mdex) => (
                            <div key={mdex}>
                                                   {
                                            mtem.type == 'link'
                                            ? <a href={mtem.url}>
                                                <i className="bi bi-link"></i>  {mtem.content}</a>
                                            : <>
                                            {mtem.type == 'quiz'
                                            ?<>
                                            {dataQuiz.map((qtem,qdex)=>(
                                                <span key={qdex}>
                                                {mtem.content == qtem._id
                                                
                                                ? <a  href={`/student/test/`+qtem._id} className="text-danger mb-2">
                                                    
                                                    <i className="bi bi-clipboard2-check"></i>
                                                    {qtem.title}</a>
                                            
                                            : <></>
                                            
                                            }
                                                </span>
                                            ))}
                                            </>
                                        :<>
                                        <li>{mtem.content}</li>
                                        </>}
                                            </>
                                        }
                            </div>


                        ))}
                    </div>

                </div>
            </div>

        </div>
    )
}

export default EditToppic
