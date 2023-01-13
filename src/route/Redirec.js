import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirec = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  },[]);

  return <div></div>;
};

export default Redirec;
