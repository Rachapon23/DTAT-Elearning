import axios from 'axios';

export const createCourse  = async(data) => {
    return await axios.post(process.env.REACT_APP_API+'/create_course', data);
}

export const createQuiz  = async(authtoken,value) => 
    await axios.post(process.env.REACT_APP_API+'/quiz/create',value,
    {
    headers:{
        authtoken,
    }
});

export const createQusetion  = async(authtoken,params,value) => 
    await axios.put(process.env.REACT_APP_API+'/quiz/createqusetion/'+params,{value},
    {
    headers:{
        authtoken,
    }
});
export const createExaminer = async(authtoken,params,value) => 
    await axios.put(process.env.REACT_APP_API+'/quiz/createexaminer/'+params,{value},
    {
    headers:{
        authtoken,
    }
});

export const listQuizby  = async(authtoken,params) => 
    await axios.get(process.env.REACT_APP_API+'/quiz/listquizby/'+params,
    {
    headers:{
        authtoken,
    }
});
export const listquizUser  = async(authtoken,{params}) => 
    await axios.get(process.env.REACT_APP_API+'/quiz/listquizuser/'+params,
    {
    headers:{
        authtoken,
    }
});
export const removeQuiz  = async(authtoken,params) => 
    await axios.delete(process.env.REACT_APP_API+'/quiz/removequiz/'+params,
    {
    headers:{
        authtoken,
    }
});
export const listQuiz  = async(authtoken) => 
    await axios.get(process.env.REACT_APP_API+'/quiz/listquiz/',
    {
    headers:{
        authtoken,
    }
});

export const getStudentby  = async(authtoken,{params}) => 
    await axios.get(process.env.REACT_APP_API+'/listudentby/'+params,
    {
    headers:{
        authtoken,
    }
});

// export const listQuizbyUser  = async(authtoken,params) => 
//     await axios.get(process.env.REACT_APP_API+'/quiz/listquizbyuser/'+params,
//     {
//     headers:{
//         authtoken,
//     }
// });
export const CreateTopic  = async(authtoken,courseTopics) => 
    await axios.post(process.env.REACT_APP_API+'/create_course_topic',courseTopics,
    {
    headers:{
        authtoken,
    }
});

export const UpdateTopic  = async(authtoken,topic) => 
    await axios.put(process.env.REACT_APP_API+'/update_course_topic',topic,
    {
    headers:{
        authtoken,
    }
});

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

export const getCourseByFilter  = async( data) => {
    return await axios.post(process.env.REACT_APP_API+'/get_course_filter', data)
}