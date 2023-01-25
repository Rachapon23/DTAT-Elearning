import React from 'react'
import NavStudent from '../../layout/NavStudent'
import Mycourse from './ChildrenHome/Mycourse'
import Search from './ChildrenHome/Search'
import PublicCourse from './ChildrenHome/PublicCourse'

import { getMycourse } from '../../../function/funcFromStudent'
import { useState, useEffect } from 'react'


const HomePageStudent = () => {

  const [data, setData] = useState()

  useEffect(() => {
    loadMycourse()
  }, [])

  const loadMycourse = () => {
    const user_id = sessionStorage.getItem("user_id")
    getMycourse(user_id)
      .then(res => {
        // console.log(res)
        setData(res.data.course)
      }).catch(err => {
        console.log(err)
      })

  }


  return (
    <div>
      <NavStudent />
      <div className='mx-4'>
        <div className="row mb-4 ">
          <div className="col-md-9">
            <div className="bg-white p-4 mt-3 border">
              <label className="form-label mb-2">Public คอร์ส</label>
              <div className="">
                <PublicCourse />
              </div>
            </div>


            <div className="bg-white p-4 borderl mt-3">
              <label className="form-labe">Course overview</label>
              <div className="">
                <Mycourse data={data} loadMycourse={loadMycourse} />
              </div>
            </div>

          </div>
          <div className="col-md-3">
            <div className="bg-white p-4 border mt-3">
              <label className="form-label mb-2">Search courses</label>
              <div className="">
                <Search loadMycourse={loadMycourse} />
              </div>
            </div>
            <div className="bg-white p-4 border mt-3">
              <label className="form-label mb-3">Add a new course for teacher</label>
              <div className="d-flex justify-content-center">
                
                <img src="https://elearning2.sut.ac.th/pluginfile.php/7319498/block_html/content/createnewcourse64.png?time=1617337458174"
                 alt="" />
              </div>
            </div>
            <div className="bg-white p-4 border mt-3">
              <label className="form-label mb-3">Reset course for teacher</label>
              <div className="d-flex justify-content-center">
                <img src="https://elearning2.sut.ac.th/pluginfile.php/7319501/block_html/content/resetCourse_btn2.png"
                 alt="" style={{ width: "12rem" }}/>
              </div>
              <p className='mt-3'>
              เป็นวิธีการลบข้อมูลของนักศึกษาที่เคยเข้าใช้งานในรายวิชา โดยไฟล์เนื้อหา การบ้าน แบบทดสอบ ที่ผู้สอนสร้างจะยังอยู่เหมือนเดิม
              </p>
            </div>
            <div className="bg-white p-4 border mt-3">
              <label className="form-label mb-3">ติดต่อ Line@</label>
              <div className="d-flex justify-content-center">
                <img src="https://elearning2.sut.ac.th/pluginfile.php/7319500/block_html/content/S__8544268.jpg"
                 alt="" style={{ width: "12rem" }}/>
              </div>
              <h4 className='mt-3 text-center'>
              LINE: @sutelearning
              </h4>
            </div>
          </div>
        </div>




      </div>
    </div>
  )
}

export default HomePageStudent