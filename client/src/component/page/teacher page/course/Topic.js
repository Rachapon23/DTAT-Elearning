


import React from 'react'

const Topic = ({ topic, index, courseTopics, dataQuiz, materials, setMaterials }) => {


    const handleAddMaterial = (t_index) => {
        courseTopics[t_index].materials.push(
            {
                type: "text",
                content: "",
                url:'',
                quiz:''
            })
        setMaterials([...materials])

    }

    const handleDeleteMaterial = (t_index, m_index) => {
        courseTopics[t_index].materials.splice(m_index, 1)
        setMaterials([...materials])
    }
    const handleMaterial = (e, index, m_index) => {
   
        courseTopics[index].materials[m_index].content = e.target.value
        courseTopics[index].materials[m_index].quiz = e.target.title
        setMaterials([...materials])

        // console.log(e.target.name)

        
    };
    const handleMaterialURL = (e, index, m_index) => {
        courseTopics[index].materials[m_index].url = e.target.value
        setMaterials([...materials])
    };
    const handleType = (e, index, m_index) => {
        courseTopics[index].materials[m_index].type = e.target.value
        setMaterials([...materials])
    };
    // const handleQuiz = (title, index, m_index) => {
    //     // courseTopics[index].materials[m_index].quiz = title
    //     // setMaterials([...materials])
    //     console.log(title)
    // };

    return (
        <div className="mt-5">
            <div className="d-flex justify-content-between mb-0" >
                <p className="">Materials</p>
                <h4 onClick={() => handleAddMaterial(index)}
                    className="text-primary mb-0 " data-bs-toggle="dropdown" aria-expanded="false">+</h4>
            </div>
            
            {
                topic.materials.map((material, m_index) => (
                    <div key={m_index}>


                        {
                            material.type == 'quiz'
                                ? <>
                                    <div className="input-group mb-3">
                                        <select className="form-select" id="select"
                                            onChange={(e) => handleType(e, index, m_index)}
                                        value={material.type}
                                        >
                                            <option value="text">text</option>
                                            <option value="link">link</option>
                                            <option value="quiz">quiz</option>
                                        </select>
                                        <select 
                                            onChange={(e) => handleMaterial(e, index, m_index)}
                               
                                            className="form-select" >
                                            <option disabled selected value="">เลือกควิชที่ต้องการ</option>
                                            {dataQuiz.map((item, index) => (
                                                <option key={index} value={item._id}
                                               
                                                 >{item.title}</option>
                                            ))}


                                        </select>
                                        </div></>
                                :
                                <>{material.type == 'link'
                                    ? <>
                                        <div className="input-group mb-3">
                                            <select className="form-select" id="select"
                                                onChange={(e) => handleType(e, index, m_index)}
                                                value={material.type}
                                            >
                                                <option value="text">text</option>
                                                <option value="link">link</option>
                                                <option value="quiz">quiz</option>
                                            </select>
                                            <input type="text" className="form-control"
                                                onChange={(e) => handleMaterial(e, index, m_index)}
                                                placeholder='title'
                                            />
                                            <button className="btn btn-outline-secondary "
                                                onClick={() => handleDeleteMaterial(index, m_index)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                           </div>
                                            <input type="text" className="form-control mb-3"
                                                onChange={(e) => handleMaterialURL(e, index, m_index)}
                                                placeholder='url'
                                            />
                                    </>
                                    : <>
                                        <div className="input-group mb-3">
                                            <select className="form-select" id="select"
                                                onChange={(e) => handleType(e, index, m_index)}
                                                value={material.type}
                                            >
                                                <option value="text">text</option>
                                                <option value="link">link</option>
                                                <option value="quiz">quiz</option>
                                            </select>
                                            <input type="text" className="form-control"
                                                onChange={(e) => handleMaterial(e, index, m_index)}
                                                placeholder={material.type}
                                            />
                                            <button className="btn btn-outline-secondary "
                                                onClick={() => handleDeleteMaterial(index, m_index)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button></div></>
                                }

                                </>
                        }




                    </div>
                ))
            }


        </div>
    )
}

export default Topic