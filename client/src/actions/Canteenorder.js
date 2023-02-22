import axios from "axios";
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
today.setMinutes(today.getMinutes()+10)
var updatedTime = today.getHours() + ":" +  today.getMinutes() + ":" + today.getSeconds();

export const placeCanteenOrder=(token , subtotal)=>async (dispatch , getState)=>{


      dispatch({type:'PLACE_CANTEENORDER_REQUEST'})
      const currentUser = getState().loginUserReducer.user
      const cartcanteenItems = getState().cartCanteenReducer.cartcanteenItems
      
      try {

         const response = await axios.post('/api/canteen/order/placecanteenorder' , {token , subtotal , currentUser , cartcanteenItems ,date,time,updatedTime})

         dispatch({type:'PLACE_CANTEENORDER_SUCCESS'})
         console.log(response);
          
      } catch (error) {
        dispatch({type:'PLACE_CANTEENORDER_FAILED'})
          console.log(error);
          
      }

}


export const getCanteenUserOrders=()=>async (dispatch,getState)=>{

  const currentUser = getState().loginUserReducer.user
  dispatch({type:'GET_USER_CANTEENORDERS_REQUEST'})
  
  try {
      const response = await axios.post('/api/canteen/order/getcanteenuserorders' , {username : currentUser.username})

      console.log(response)
      
      dispatch({type:'GET_USER_CANTEENORDERS_SUCCESS' , payload : response.data})
  } catch (error) {
      dispatch({type:'GET_USER_CANTEENORDERS_FAILED' , payload : error})
  }

}

export const getAllCanteenOrders=()=>async (dispatch,getState)=>{

  const currentUser = getState().loginUserReducer.user
  dispatch({type:'GET_ALLCANTEENORDERS_REQUEST'})
  
  try {
      const response = await axios.get('/api/canteen/order/getallcanteenorders')

      
      console.log(response);
      
      dispatch({type:'GET_ALLCANTEENORDERS_SUCCESS' , payload : response.data})
  } catch (error) {
      dispatch({type:'GET_ALLCANTEENORDERS_FAILED' , payload : error})
  }

}

export const deliverCanteenOrder=(canteenorderid)=>async dispatch=>{



    try {
      const response = await axios.post('/api/canteen/order/delivercanteenorder' , {canteenorderid})
      console.log(response);
      alert('Order Delivered')
      const orders = await axios.get('/api/canteen/order/getallcanteenorders')
      dispatch({type:'GET_ALLCANTEENORDERS_SUCCESS' , payload:orders.data})
    } catch (error) {
      console.log(error);
    }


}

export const filterCanteenorder=(searchkey)=>async dispatch=>{

  console.log(searchkey)
  dispatch({type:'GET_FILTERORDERS_REQUEST'})

  try {
      var filteredorders ;
      const response = await axios.get('/api/canteen/order/getallcanteenorders')
      console.log(response)
      filteredorders = response.data.filter(order=>order.otp.includes(searchkey))
       console.log(filteredorders)
      
      dispatch({type:'GET_FILTERORDERS_SUCCESS' , payload : filteredorders})
  } catch (error) {
      dispatch({type:'GET_FILTERORDERS_FAILED' , payload : error})
  }

}

export const deleteCanteenOrder = (orderid) => async (dispatch) => {
  try {
    const response = await axios.post("/api/canteen/order/deletecanteenorder", { orderid });
    alert("order Deleted Successfully");
    console.log(response);
    window.location.reload();
  } catch (error) {
    alert("Something went wrong");
    console.log(error);
  }
};
