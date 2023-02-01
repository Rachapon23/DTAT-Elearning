import React from 'react'

const Allpage = () => {
  return (
    <>
    <div className='allpage'>
        <button className="btn btn-warning btn-lg shadow"
        data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"
        >ทางลัด</button>
    </div>


   
<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasExampleLabel">ทางลัด</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
<div>
    <h3>admin</h3>
    <ul>
        <li><a href="/admin/home">หน้าแรก</a></li>
        <li><a href="/admin/list-users">สมาชิกทั้งหมด</a></li>
        <li><a  href="/admin/list-teachers">จัดการผู้สอน </a></li>
        <li><a href="/admin/list-students">จัดการผู้เรียน</a></li>

    </ul>
</div>
<div>
    <h3>teacher</h3>
    <ul>
        <li><a href="/teacher/home">หน้าแรก </a></li>
        <li><a href="/teacher/list-courses">คอร์สทั้งหมด</a></li>
        <li><a href="/teacher/create-course">สร้างบทเรียน</a></li>
        <li><a href="/teacher/create-quiz">สร้างแบบทดสอบ</a></li>
        <li><a href="/teacher/list-score">ดูคะแนน </a></li>
        <li><a href="/teacher/calendar">ตารางสอน</a></li>
    </ul>
</div>
<div>
    <h3>student</h3>
    <ul>
        <li><a href="/student/home">หน้าแรก </a></li>
        <li><a href="/student/list-courses">คอร์สทั้งหมด </a></li>

    </ul>
</div>
  </div>
</div>
</>
  )
}

export default Allpage