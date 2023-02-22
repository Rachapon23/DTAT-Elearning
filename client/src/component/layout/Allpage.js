import React from 'react'
import {
  AppstoreOutlined,
  ContainerOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuUnfoldOutlined 
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useState } from 'react';
import {  useNavigate } from 'react-router-dom'
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('หน้าแรกแอดมิน', '/admin/home', <PieChartOutlined />),
  getItem('สมาชิกทั้งหมด', '/admin/list-users', <DesktopOutlined />),
  getItem('จัดการผู้สอน', '/admin/list-teachers', <ContainerOutlined />),
  getItem('จัดการผู้เรียน', '/admin/list-students', <ContainerOutlined />),
  
  getItem('หน้าแรกครู', '/teacher/home', <ContainerOutlined />),
  getItem('คอร์สทั้งหมดของครู', '/teacher/list-courses', <ContainerOutlined />),
  getItem('สร้างบทเรียน', '/teacher/course', <ContainerOutlined />),
  getItem('สร้างแบบทดสอบ', '/teacher/quiz', <ContainerOutlined />),
  getItem('ตารางสอน', '/teacher/calendar-teacher', <ContainerOutlined />),

  getItem('หน้าแรกนักเรียน', '/student/home', <ContainerOutlined />),


];
const Allpage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onClick = (e) => {
    console.log(e.key);
    navigate(e.key)

  };
 
  return (
    <>
      {/* <div
      style={{
        width: 256,
      }}
      className="allpage"
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
       onClick={onClick}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div> */}
   
    </>
  )
}

export default Allpage