import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../helpers/authHelper";

const CanteenAdminroute = ({ children }) => {
    const user = isLoggedIn();
    
  return user.userId == "63f4ba9c37aab2240592b8e0" ?  children : <Navigate to="/" /> ;
};

export default CanteenAdminroute
