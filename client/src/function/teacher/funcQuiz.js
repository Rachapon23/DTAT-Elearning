import axios from 'axios';

export const createQuiz  = async(authtoken,nameQuiz,value) => 
    await axios.post(process.env.REACT_APP_API+'/quiz/create',nameQuiz,value,
    {
    headers:{
        authtoken,
    }
});

export const listQuiz  = async(authtoken,id) =>  
    await axios.get(process.env.REACT_APP_API+'/quiz/listquiz/'+id, 
    {
    headers:{
        authtoken,
    }
});