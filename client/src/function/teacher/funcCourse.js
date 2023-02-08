import axios from 'axios';

export const createCourse  = async(authtoken,value) => 
await axios.post(process.env.REACT_APP_API+'/create-course',value,
{
headers:{
    authtoken,
}
});
export const updateCourse  = async(authtoken,value) => 
await axios.put(process.env.REACT_APP_API+'/update-course',value,
{
headers:{
    authtoken,
}
});

export const listCourses  = async(authtoken) => 
await axios.get(process.env.REACT_APP_API+'/list-courses',
{
headers:{
    authtoken,
}
});

export const getCourseByFilter  = async(authtoken, data) =>
await axios.post(process.env.REACT_APP_API+'/get-course-filter', data,
{
headers:{
    authtoken,
}
});

export const getCourse  = async(authtoken,id) =>
await axios.post(process.env.REACT_APP_API+'/get-course/'+id,
{
headers:{
    authtoken,
}
});

