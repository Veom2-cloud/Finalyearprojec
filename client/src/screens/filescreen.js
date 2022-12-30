import React, { useState, useEffect } from "react";
import download from "downloadjs";
import axios from "axios";
import { API_URL } from "../components/util/constants";
import { useDispatch, useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Filescreen() {
  AOS.init();

  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const loginstate = useSelector((state) => state.loginUserReducer);
  const { user } = loginstate;

  //
  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.post(`${API_URL}/getuserfile`, {
          userid: user.userId,
        });
        setErrorMsg("");
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };
    getFilesList();
  }, []);

  //
  return (
    <div>
      <h2 style={{ fontSize: "20px", textAlign:"center" }}>Files</h2>
      <hr />
      <div className="row justify-content-center m-1">
        { filesList.filter(
              function (file) 
            {
              return file.isDelivered == false
            }).map((file) => {
          return (
            <div
              className="p-2 m-2"
              style={{ backgroundColor: "#f2aa4cff", color: "#101820ff" }}
              key={file._id}
            >
              <div className="flex-container">
                <div className="text-left w-100">
                  <p>Name : {file.username}</p>
                  <p>Instruction : {file.instruction}</p>
                  <p>Pages: {file.pages}</p>
                  <p>Copies: {file.copies}</p>
                  <p>Paid: {file.ispaid == true ? "paid" : "unpaid"}</p>
                  <p>Date: {file.date}</p>
                  <p>Time: {file.time}</p>
                  <p>Time for Delivery: {file.updatedTime}</p>
                  <p>
                    Delivered:
                    {file.isDelivered == true ? " Recieved" : " Not Recieved"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
