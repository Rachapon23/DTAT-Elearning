import axios from 'axios';

// export const createCourse  = async(data) => {
//     return await axios.post(process.env.REACT_APP_API+'/create_course', data);
// }

// export const createQuiz  = async(authtoken,nameQuiz,value) => 
//     await axios.post(process.env.REACT_APP_API+'/quiz/create',nameQuiz,value,
//     {
//     headers:{
//         authtoken,
//     }
// });

// export const listQuiz  = async(authtoken,id) =>  
//     await axios.get(process.env.REACT_APP_API+'/quiz/listquiz/'+id,  //parame ค่อยมาคิดว่าจะเอาอะไร
//     {
//     headers:{
//         authtoken,
//     }
// });



//----------------------------------------------------------------------------------------.



// export const listquizUser  = async(authtoken,{params}) => 
//     await axios.get(process.env.REACT_APP_API+'/quiz/listquizuser/'+params,
//     {
//     headers:{
//         authtoken,
//     }
// });
// export const removeQuiz  = async(authtoken,params) => 
//     await axios.delete(process.env.REACT_APP_API+'/quiz/removequiz/'+params,
//     {
//     headers:{
//         authtoken,
//     }
// });
// export const listQuizzz  = async(authtoken) => 
//     await axios.get(process.env.REACT_APP_API+'/quiz/listquiz/',
//     {
//     headers:{
//         authtoken,
//     }
// });

// export const getStudentby  = async(authtoken,{params}) => 
//     await axios.get(process.env.REACT_APP_API+'/listudentby/'+params,
//     {
//     headers:{
//         authtoken,
//     }
// });

//-------------------------------------------------------------------------------------.


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

