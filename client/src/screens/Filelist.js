import React, { useState, useEffect } from "react";
import download from "downloadjs";
import axios from "axios";
import { API_URL } from "../components/util/constants";
import { useDispatch, useSelector } from "react-redux";
import Navbar1 from "./Navbar1"
import "./css/Navmenu.css"

const FilesList = () => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  var today = new Date();
  console.log(filesList)
  
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


//

  //
  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/getAllFiles`);
        setErrorMsg("");
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };
    getFilesList();
  }, []);

  //
  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`${API_URL}/download/${id}`, {
        responseType: "blob",
      });
      const split = path.split("/");
      const filename = split[split.length - 1];
      setErrorMsg("");
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg("Error while downloading file. Try again later");
      }
    }
  };

  //
  window.setTimeout( function() {
    window.location.reload();
  }, 30000);
  
  return (
    <div className="adminPage">
      <Navbar1/>
      <h2 className="text-center">Files List</h2>

      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <table className="table table-striped table-bordered table-responsive-sm">
        <thead className="text-white bg-dark">
          <tr>
            <th>Name</th>
            <th>Pages to print</th>
            <th>copies</th>
            <th>Instruction</th>
            <th>Price</th>
            <th>Date</th>
            <th>Time</th>
            <th>Time for delivery</th>
            <th>Download File</th>
            <th>Otp</th>
            <th>Status</th>
            <th>Paid</th>
          </tr>
        </thead>
        <tbody>
          {filesList.length >  0 ? (
            ( filesList.filter(
              function (file) 
            {
              return file.isDelivered == false
            }).map
            ((file) => ( 
              <tr key={file._id}>
                <td className="file-title">{file.username}</td>
                <td className="file-description">{file.pages}</td>
                <td>{file.copies}</td>
                <td>{file.instruction}</td>

                <td>{file.pages * file.copies * 1.5}</td>
                <td>{file.date}</td>
                <td>{file.time}</td>
                <th>{file.updatedTime}</th>
                <td>
                  <a
                    href="#/"
                    onClick={() =>
                      downloadFile(file._id, file.file_path, file.file_mimetype)
                    }
                  >
                    Download
                  </a>
                </td>
                <td>{file.otp}</td>
                <td>
                  {file.isDelivered == true ? (
                    "Done"
                  ) : (
                    "Not done"
                  )}
                </td>

                <td>{file.ispaid == false  ? "Not Paid" : "Paid"  }</td>
              
              </tr>
            )))
          ) : (
            <tr>
              <td colSpan={3} style={{ fontWeight: "300" }}>
                No files found. Please add some.
              </td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FilesList;
