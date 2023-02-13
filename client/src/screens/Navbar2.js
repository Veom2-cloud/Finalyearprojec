import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";

import Userslist from "./Userslist";
import "./css/Navbar1.css"

export default function Superadmincreen() {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { user } = userstate;
  const dispatch = useDispatch();

 

  

  return (
    <div>
        <div className="col-md-12 head">
          <h2 >SuperAdmin Panel</h2>

          <ul className="adminfunctions" id="navMenu">
            <li>
            <Link to={"/"} style={{ color: "white" }}>
              Ustar
            </Link>
            </li>
            <li>
              <Link to={"/superadmin"} style={{ color: "white" }}>
                Users List
              </Link>
            </li>
  
          </ul>

        </div>
      </div>
  );
}
