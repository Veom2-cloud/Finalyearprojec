import axios from "axios";
import { API_URL } from "../components/util/constants";



export const deliverFile=(fileid)=>async dispatch=> {
    try {
      const response = await axios.post(`${API_URL}/deliverfile`, { fileid });
      const responses = await axios.post(`${API_URL}/ispaid`, { fileid });

      alert("file Delivered");
      const file = await axios.get(`${API_URL}/getAllFiles`);
      dispatch({ type: "GET_ALLFILES_SUCCESS", payload: file.data });
    } catch (error) {
      console.log(error);
    }
  };

  export const paidfile=(fileid)=>async dispatch=> {
    try {
      const response = await axios.post(`${API_URL}/ispaid`, { fileid });
      console.log(response);
      alert("file Delivered");
      const file = await axios.get(`${API_URL}/getAllFiles`);
      dispatch({ type: "GET_ALLFILES_SUCCESS", payload: file.data });
    } catch (error) {
      console.log(error);
    }
  };
