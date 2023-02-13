import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../helpers/authHelper";

const SuperadminRoute = ({ children }) => {
    const user = isLoggedIn();
    
  return user.userId == "63b024b920f227754490c428" ?  children : <Navigate to="/" /> ;
};

export default SuperadminRoute;
