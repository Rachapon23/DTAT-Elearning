import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const UserRoute = () => {
    return sessionStorage.getItem("token") ? <Outlet/> : <Navigate to="/"/> 
  
}

export default UserRoute