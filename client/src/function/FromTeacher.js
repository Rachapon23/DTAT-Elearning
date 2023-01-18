import axios from 'axios'


export const createCourse  = async(data) => {
    const {name, teacher, description} = data
    await axios.post(process.env.REACT_APP_API+'/create_course', data);
}

export const getCurrentTeacher  = async(authtoken) =>
    await axios.get(process.env.REACT_APP_API+'/get_current_teacher',
    {
    headers:{
        authtoken,
    }
});