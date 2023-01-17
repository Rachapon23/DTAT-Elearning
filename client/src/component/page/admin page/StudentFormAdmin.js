import React from 'react'
import NavAdmin from '../../layout/NavAdmin'
import { listStudentuser, changeRole } from '../../../function/funcFromAdmin'
import { useState, useEffect } from "react";

const StudentFormAdmin = () => {

  const [data, setData] = useState([])


  useEffect(() => {
    loadData()

  }, [])

  const loadData = () => {

    listStudentuser(localStorage.getItem("token"))
      .then(res => {

        setData(res.data)
      })
      .catch(err => {
        console.log(err)
      })


  }
  // console.log(data)
  const handlechange = (e, id) => {
    // console.log(e.target.value,id)
    let value = {
      id: id,
      role: e.target.value
    }
    changeRole(localStorage.getItem("token"), value)
      .then(res => {
        console.log(res)
        loadData()
      })
      .catch(err => {
        console.log(err)
      })
    // console.log(value)
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
                <th scope="col">สถานะ</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) =>
                <tr key={index}>
                  <th scope="row">{index}</th>
                  <td>{item.employee_ID}</td>
                  <td>{item.department_ID}</td>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  {/* <td className='text-success'>
                    <div className="dropdown">
                      <button class="btn btn-outline-success dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {item.role}
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item">Teacher</a></li>
                      </ul>
                    </div>
                  </td> */}
                  <td>
                    <select onChange={(e) => handlechange(e, item._id)}
                      className="form-select" >
                      <option selected>{item.role}</option>
                      <option value="teacher">Teacher</option>

                    </select>
                  </td>
                  <td><div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"
                    />
                  </div></td>



                </tr>

              )}

            </tbody>
          </table>
        </div>
      </div>


    </div>
  )
}

export default StudentFormAdmin