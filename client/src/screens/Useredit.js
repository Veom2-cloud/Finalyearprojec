import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {update, finduserbyid} from "../api/users"
import Error from "../components/buypart/Error";
import Loading from "../components/buypart/Loading";
import {useParams} from "react-router-dom"
import Success from "../components/buypart/Success";
import Navbar2 from "./Navbar2"
import "./css/Navmenu.css"
export default function Edititem({ match }) {
  const { userId } = useParams();
  console.log(userId)

  const [username, setusername] = useState("");
 const [email, setemail] = useState()
  const [usertype, setusertype] = useState("");

  const dispatch = useDispatch();
  
  

  return (
    <div className="adminPage">
              <Navbar2/>

      <div className="text-center shadow-lg p-3 mb-5 bg-white rounded" id = "edititem">
        <h1>Edit user</h1>
       

        <form>
          <input
            className="form-control"
            type="name"
            placeholder="Name"
            value={username}
            onChange={(e) => {
              setusername(e.target.value);
            }}
          />
        
        <input
            className="form-control"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          
          <input
            className="form-control"
            type="usertype"
            placeholder="usertype"
            value={usertype}
            onChange={(e) => {
              setusertype(e.target.value);
            }}
          />
         
          
          <button className="btn mt-3" type="submit">
            Edit User
          </button>
        </form>
      </div>
    </div>
  );
}
