import axios from "axios";

export const createTeachTime  = async(authtoken, teachTime) => 
    await axios.post(process.env.REACT_APP_API+'/create_teach_time', teachTime,
    {
    headers:{
        authtoken,
    }
});

export const listTeachTimes  = async(authtoken) => 
    await axios.get(process.env.REACT_APP_API+'/list_teach_times',
    {
    headers:{
        authtoken,
    }
});

export const listCoursesInTeachTime  = async(authtoken, data) => 
    await axios.post(process.env.REACT_APP_API+'/list_courses_in_teach_time', data,
    {
    headers:{
        authtoken,
    }
});

export const getTeacherByCourseId  = async(data) => {
    return await axios.post(process.env.REACT_APP_API+'/get_teacher_by_course_id', data)
}