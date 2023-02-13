import Loading from "../components/buypart/Loading";
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import Navbar2 from "./Navbar2"
import { getRandomUsers, getAllUsers, deletes} from "../api/users";
import { useDispatch, useSelector } from "react-redux";

import "./css/Navmenu.css"

const FindUsers = () => {
  const dispatch = useDispatch();


  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await getAllUsers()
    setLoading(false);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handledelete = async (id)=>{
    deletes(id) 
    alert("deleted")
    window.location.href="/admin"
  }


  return (
    <div className="adminPage">
      <Navbar2/>
      <h1 className="text-center">Users list</h1>
      {loading && <Loading />}
      <table className="table table-stripedtable-bordered table-responsive-sm">
        <thead className="text-white bg-dark">
          <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users &&
            users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td> 
                  <td>
                    <i
                      className="fa fa-trash m-1"
                      onClick={() => {
                        handledelete(user._id);
                      }}
                    ></i>
                   <Link to={`/superadmin/edituser/${user._id}`}>
                      <i className="fa fa-edit m-1"></i>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default FindUsers;
