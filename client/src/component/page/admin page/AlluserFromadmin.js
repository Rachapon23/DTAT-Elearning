import React from 'react'
import NavAdmin from '../../layout/NavAdmin'
import { listAlluser } from '../../../function/funcFromAdmin'
import { useState, useEffect } from "react";


const AlluserFromadmin = () => {

  const [data, setData] = useState([])


  useEffect(() => {
    loadData()

  }, [])

  const loadData = () => {

    listAlluser(localStorage.getItem("token"))
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        console.log(err)
      })


  }
      // console.log(data)

  return (
    <div>
      <NavAdmin />
<div className='container'>
    <div className='mt-5'>
    <table className="table">
        <thead>
          <tr>
            <th scope="col">ลำดับ</th>
            <th scope="col">รหัสพรักงาน</th>
            <th scope="col">รหัส</th>
            <th scope="col">ชื่อ</th>
            <th scope="col">นามกสุล</th>
            <th scope="col">สิทธิ์</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item,index)=>
      <tr key={index}>
      <th scope="row">{index}</th>
      <td>{item.employee_ID}</td>
      <td>{item.department_ID}</td>
      <td>{item.firstname}</td>
      <td>{item.lastname}</td>
      {item.role == "admin" && (<td className='text-danger'>{item.role}</td>)}
      {item.role == "teacher" && (<td className='text-primary'>{item.role}</td>)}
      {item.role == "student" && (<td className='text-success'>{item.role}</td>)}
      
   
    </tr>

    )}

        </tbody>
      </table>
    </div>
</div>


    </div>
  )
}

export default AlluserFromadmin