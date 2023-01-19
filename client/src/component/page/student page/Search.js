import React from 'react'
import { useState, useEffect } from 'react'
import { Searchcourse } from '../../../function/funcFromStudent'

const Search = () => {

    const [query, SetQuery] = useState({
        query: ""
    })
    const [data, setData] = useState()
    const handleChange = (e) => {
        SetQuery({ ...query, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(query)
        Searchcourse(query).then(res => {
            console.log(res)
            setData(res.data)
        }).catch(err => {
            console.log(err)
        })
    };


    return (
        <div>
            <div className="row mt-5">
                <div className="col-md-4">
                    <label className="form-label">ค้นหาคอร์สเรียน</label>
                    <div className="input-group">
                        <input type="text" name='query' className="form-control" onChange={handleChange} />
                        <button onClick={handleSubmit}
                            className="btn btn-outline-secondary" type="button">ค้นหา</button>
                    </div>
                </div>
            </div>
            <div>
                {data && <div>
                    <h5 className='mt-5 mb-3'>วิชา : {data.name}</h5>
                    <div className="row">
                        <div className="col-md-6">
        
                            <div className="row">
                                <div className="col-md-6">รายละเอียด : </div>
                                <div className="col-md-6">{data.description}</div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">ผู้สอน : </div>
                                <div className="col-md-6">{data.teacher}</div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <button className="btn btn-primary btn-sm">เข้าเรียน</button>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default Search