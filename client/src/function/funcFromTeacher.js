

import axios from 'axios'


export const createQuiz  = async(authtoken,value) => 
    await axios.post(process.env.REACT_APP_API+'/quiz/create',value,
    {
    headers:{
        authtoken,
    }
});