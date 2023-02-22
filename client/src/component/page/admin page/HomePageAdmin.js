import React from 'react'
import NavAdmin from '../../layout/NavAdmin'


const HomePageAdmin = () => {


  return (
    <div>
      <NavAdmin />
      <div className="container mt-3">
        <h1>
          HOME
        </h1>
        <div className="mt-5">
          <div className="row">
            <ul>
              <li>
                <a href="/teacher/home">teacher page</a>
              </li>
              <li>
                <a href="/student/home">student page</a>
              </li>
            </ul>


          </div>
        </div>
      </div>


    </div>
  )
}

export default HomePageAdmin