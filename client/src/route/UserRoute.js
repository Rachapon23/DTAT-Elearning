import React from "react";
import Redirec from "./Redirec";
import {  useSelector } from "react-redux";

const UserRoute = ({children}) => {


    const {user} = useSelector((state)=>({...state}))
    console.log(user)

    return user 
    ? children
    : <Redirec/> 
  

}

export default UserRoute