import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from "react";

const EditToppic = ({ item ,setTopic,topic, index}) => {
    const quillToolbar = {
        toolbar: false,
    }
    const [value, setValue] = useState(item)

    const handleChangeName = (e) => {
        // setValue({ ...value, name: e });
        topic[index].name = e
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
 


    return (
        <div>
            <div className="p-5 border border-primary my-3 ">
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
                        <ReactQuill className="" theme="snow" modules={quillToolbar}
                            value={value.name}
                            onChange={handleChangeName}
                        // onChange={(e) => handleTopicNameChange(e, index)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description </label>
                        <ReactQuill className="" theme="snow" modules={quillToolbar}
                            value={value.description}
                            onChange={handleChangeDes}
                        //  onChange={(e) => handleTopicDescriptionChange(e, index)}
                        />
                    </div>
                    <a onClick={testIndex}>{item.quiz.title}</a>
                </div>
            </div>

        </div>
    )
}

export default EditToppic
