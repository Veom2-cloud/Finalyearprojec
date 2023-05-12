import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import FilesList from "./Filelist";
import Additem from "./Additem";
import Edititem from "./Edititem";
import Orderslist from "./Orderslist";
import Itemslist from "./Itemslist";
import Userslist from "./Userslist";
import "./css/Navbar1.css"

export default function Navbar1() {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { user } = userstate;
  const dispatch = useDispatch();

  return (
    <div>
        <div className="col-md-12 head">
          <h2 >Stationary Admin Panel</h2>

          <ul className="adminfunctions" id="navMenu">
            <li>
            <Link to={"/"} style={{ color: "white" }}>
              Ustar
            </Link>
            </li>
            
            <li>
              <Link to={"/admin"} style={{ color: "white" }}>
                Item List
              </Link>
            </li>
            <li>
              <Link to={"/admin/additem"} style={{ color: "white" }}>
                Add Item
              </Link>
            </li>
            <li>
              <Link to={"/admin/orderslist"} style={{ color: "white" }}>
                Orders List
              </Link>
            </li>
            <li>
              <Link to={"/admin/list"} style={{ color: "white" }}>
                File List
              </Link>
            </li>
          </ul>

        </div>
      </div>
  );
}
