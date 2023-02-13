import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../helpers/authHelper";

const AdminRoute = ({ children }) => {
    const user = isLoggedIn();
    
  return user.userId == "63b02c400483b301cf061906" ?  children : <Navigate to="/" /> ;
};

export default AdminRoute;