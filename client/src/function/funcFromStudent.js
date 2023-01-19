import axios from "axios";

export const listCourses  = async() => {
    return await axios.get(process.env.REACT_APP_API+'/list_courses');
};

export const getCourse  = async(course_id) => {
    return await axios.post(process.env.REACT_APP_API+'/get_course', course_id);
};

export const Searchcourse  = async(query) => 
{
    return await axios.post(process.env.REACT_APP_API+'/searchcourse', query);
};

