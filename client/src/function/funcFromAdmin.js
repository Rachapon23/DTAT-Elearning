import axios from 'axios'


export const listAlluser  = async(authtoken) =>
    await axios.get(process.env.REACT_APP_API+'/listalluser',
    {
    headers:{
        authtoken,
    }
});