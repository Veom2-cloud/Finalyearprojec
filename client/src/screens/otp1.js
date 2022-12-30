import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deliverFile } from "../actions/fileaction";
import axios from "axios";
import { API_URL } from "../components/util/constants";

export default function Otp1 () {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

    const [state, setState] = useState({
      otp: "",
    });
    const [msg, setmsg] = useState("");
  
    const handleInputChange = (event) => {
      setState({
        ...state,
        [event.target.name]: event.target.value,
      });
    };
  
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
    
  
  
  
    const otpp = async (event) => {
      event.preventDefault();
  
      const { otp } = state;
      {
        filesList &&
          filesList.map((file) => {
            { return(
              file.otp == otp ? dispatch(deliverFile(file._id)) 
                : "" )
            }
          });
      }
  
      setmsg("Thank you");
    };
  return (
    <div>
      <div>
      <div>
        {msg && <p style={{ color: "red", textAlign:"center" }}>{msg}</p>}

        <form onSubmit={otpp} className="text-center">
          <input
            type="text"
            name="otp"
            value={state.otp || ""}
            placeholder="Enter otp"
            onChange={handleInputChange}
          />

          <button type="submit" className="btn mt-3 mb-3 ">
            Send
          </button>
          <br />
        </form>
      </div>
    </div>
    </div>
  )
}
