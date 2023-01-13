import React, { useState, useEffect } from "react";
import Redirec from "./Redirec";
import {  useSelector } from "react-redux";
import { currentAdmin } from "../function/auth";

const AdminRoute = ({children}) => {

    const {user} = useSelector((state)=>({...state}))
    const [ok,setOk] = useState(false)

    useEffect(()=>{
      
        if( user && user.token){
            currentAdmin(user.token).then(
                res =>{
                             
                    setOk(true)
                }
            ).catch(
                err=>{
                    console.log(err)
                    setOk(false)
                }
            )
        }
    
    },[user])

   return ok ? children : <Redirec/> 
}

export default AdminRoute