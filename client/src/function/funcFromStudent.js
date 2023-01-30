import axios from "axios";

export const listCourses  = async() => {
    return await axios.get(process.env.REACT_APP_API+'/list_courses');
};
export const publicCourses  = async() => {
    return await axios.get(process.env.REACT_APP_API+'/list_public_courses');
};

export const getCourse  = async(course_id) =>
{
    return await axios.post(process.env.REACT_APP_API+'/get_course', course_id);
};

export const getMycourse  = async(id) => 
{
    return await axios.post(process.env.REACT_APP_API+'/get_my_course/'+id, );
};
export const deleteMyCourse  = async(user_id,id) => 
{
    return await axios.post(process.env.REACT_APP_API+'/delete_my_course/'+id,{user_id}, );
};

export const Searchcourse  = async(query) => 
{
    return await axios.post(process.env.REACT_APP_API+'/searchcourse', query);
};
export const Addchcourse  = async(course_id) => 
{
    return await axios.post(process.env.REACT_APP_API+'/addchcourse', course_id);
};

