import React from 'react'
import NavStudent from '../../layout/NavStudent'
import Mycourse from './ChildrenHome/Mycourse'
import Search from './ChildrenHome/Search'

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
      <div className='container'>
        <Search loadMycourse={loadMycourse}/>
        <Mycourse data={data} loadMycourse={loadMycourse}/>

      </div>
    </div>
  )
}

export default HomePageStudent