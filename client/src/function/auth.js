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
// export const currentTeacher = async(authtoken) =>
// await axios.post(process.env.REACT_APP_API+'/current-teacher',{},
//     {
//     headers:{
//         authtoken,
//     }
// });
// export const currentAdmin = async(authtoken) =>
// await axios.post(process.env.REACT_APP_API+'/current-admin',{},
//     {
//     headers:{
//         authtoken,
//     }
// });
//--------------------------
