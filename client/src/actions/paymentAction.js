import axios from "axios";


export const payment=(token , subtotal , fileid)=>async (dispatch , getState)=>{

  const currentUser = getState().loginUserReducer.user

      dispatch({type:'PLACE_PAYMENT_REQUEST'})
      
      try {

         const response = await axios.post('/api/payment' , {token , subtotal , fileid, currentUser})
         dispatch({type:'PLACE_PAYMENT_SUCCESS'})
         console.log(response);
          
      } catch (error) {
        dispatch({type:'PLACE_PAYMENT_FAILED'})
          console.log(error);
          
      }

}


export const getpaymentuser=()=>async (dispatch,getState)=>{
  const currentUser = getState().loginUserReducer.user

  dispatch({type:'GET_USER_PAYMENT_REQUEST'})
  
  try {
      const response = await axios.post('/api/getpaymentuser' , {userid : currentUser.userId})

      
      console.log(response);
      
      dispatch({type:'GET_USER_PAYMENT_SUCCESS' , payload : response.data})
  } catch (error) {
      dispatch({type:'GET_USER_PAYMENT_FAILED' , payload : error})
  }

}

export const getAllpayment=()=>async (dispatch,getState)=>{

  const currentUser = getState().loginUserReducer.user
  dispatch({type:'GET_ALLPAYMENT_REQUEST'})
  
  try {
      const response = await axios.get('/api/getallpayment')
      console.log(response);
      
      dispatch({type:'GET_ALLPAYMENT_SUCCESS' , payload : response.data})
  } catch (error) {
      dispatch({type:'GET_ALLPAYMENT_FAILED' , payload : error})
  }

}