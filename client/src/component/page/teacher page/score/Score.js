import React from 'react'
import NavTeacher from '../../../layout/NavTeacher'
import { listStudentuser } from '../../../../function/funcFromAdmin'
import { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
const Score = () => {

  const [data, setData] = useState([])
// const Navigate = useNavigate()

  useEffect(() => {
    loadData()

  }, [])

  const loadData = () => {

    listStudentuser(sessionStorage.getItem("token"))
      .then(res => {

        console.log(res.data)
        setData(res.data)
      })
      .catch(err => {
        console.log(err)
      })


  }

  return (
    <div>
      <NavTeacher/>
      <div className='container'>
        <h5 className='mt-5'>Score</h5>
        <div className="">
        <table className="table">
  <thead>
    <tr>
      <th scope="col">ลำดับ</th>
      <th scope="col">รหัสพนักงาน</th>
      <th scope="col">รหัสแผนก</th>
      <th scope="col">ชื่อ</th>
      <th scope="col">ดูคะแนน</th>
    </tr>
  </thead>
  <tbody>
    {data && data.map((item,index)=>
     <tr key={index}>
     <th scope="row">{index+1}</th>
     <td>{item.employee_ID}</td>
     <td>{item.department_ID}</td>
     <td>{item.firstname}</td>
     <td><a className="bi bi-file-earmark-ruled text-primary"

    href={'/teacher/get-score/'+item._id}
     ></a></td>

   </tr>
    )}


  </tbody>
</table>
        </div>
      </div>
  
    </div>
  )
}

export default Score