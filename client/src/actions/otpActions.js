import axios from "axios";
export const OTP = (otp) =>async (dispatch , getState)=>{


      dispatch({type:'PLACE_OTP_REQUEST'})
      const currentUser = getState().loginUserReducer.user
      
      try {

         const response = await axios.post('/api/otp/addotp' ,  {currentUser , otp})
         dispatch({type:'PLACE_OTP_SUCCESS'})
         console.log(response);
          
      } catch (error) {
        dispatch({type:'PLACE_OTP_FAILED'})
          console.log(error);
          
      }

}

export const getOtp=()=>async (dispatch,getState)=>{

  const currentUser = getState().loginUserReducer.user
  dispatch({type:'GET_otp_REQUEST'})
  
  try {
      const response = await axios.get('/api/otp/getallotp')
      console.log(response);
      dispatch({type:'GET_otp_SUCCESS' , payload : response.data})
  } catch (error) {
      dispatch({type:'GET_otp_FAILED' , payload : error})
  }

}
