import axios from 'axios'

//สมัครสมาชิก
export const register = async(value) =>
await axios.post(process.env.REACT_APP_API+'/register',value);

//เข้าสู่ระบบ
export const login = async(value) => 
await axios.post(process.env.REACT_APP_API+'/login',value);

//ตรวจสอบผู้ใช้ปัจจุบัน
export const currentUser = async(authtoken) =>
await axios.post(process.env.REACT_APP_API+'/current-user',{},
    {
    headers:{
        authtoken,
    }
});
export const currentTeacher = async(authtoken) =>
await axios.post(process.env.REACT_APP_API+'/current-teacher',{},
    {
    headers:{
        authtoken,
    }
});
export const currentAdmin = async(authtoken) =>
await axios.post(process.env.REACT_APP_API+'/current-admin',{},
    {
    headers:{
        authtoken,
    }
});
//--------------------------

export const adminCH  = async(authtoken) =>
    await axios.get(process.env.REACT_APP_API+'/adminch',
    {
    headers:{
        authtoken,
    }
});
export const teacherCH  = async(authtoken) =>
    await axios.get(process.env.REACT_APP_API+'/teacherch',
    {
    headers:{
        authtoken,
    }
});
export const studentCH  = async(authtoken) =>
    await axios.get(process.env.REACT_APP_API+'/studench',
    {
    headers:{
        authtoken,
    }
});
