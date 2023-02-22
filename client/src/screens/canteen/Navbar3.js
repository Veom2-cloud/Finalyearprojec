import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";

import Canteenitemlist from "./Canteenitemlist";
import "../css/Navbar1.css"

export default function Navbar3() {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { user } = userstate;
  const dispatch = useDispatch();

 

  

  return (
    <div>
        <div className="col-md-12 head">
          <h2 >Admin Panel</h2>

          <ul className="adminfunctions" id="navMenu">
            <li>
            <Link to={"/"} style={{ color: "white" }}>
              Ustar
            </Link>
            </li>
            
            <li>
              <Link to={"/canteenadmin"} style={{ color: "white" }}>
               Canteen Item List
              </Link>
            </li>
            <li>
              <Link to={"/canteenadmin/addcanteenitem"} style={{ color: "white" }}>
                Add Canteen Item
              </Link>
            </li>
            <li>
              <Link to={"/canteenadmin/canteenallorders"} style={{ color: "white" }}>
                Orders List
              </Link>
            </li>
            
          </ul>

        </div>
      </div>
  );
}
