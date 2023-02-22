import axios from "axios";
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
today.setMinutes(today.getMinutes()+10)
var updatedTime = today.getHours() + ":" +  today.getMinutes() + ":" + today.getSeconds();
export const placeOrder=(token , subtotal)=>async (dispatch , getState)=>{


      dispatch({type:'PLACE_ORDER_REQUEST'})
      const currentUser = getState().loginUserReducer.user
      const cartItems = getState().cartReducer.cartItems
      
      try {

         const response = await axios.post('/api/orders/placeorder' , {token , subtotal , currentUser , cartItems,date,time,updatedTime})

         dispatch({type:'PLACE_ORDER_SUCCESS'})
         console.log(response);
          
      } catch (error) {
        dispatch({type:'PLACE_ORDER_FAILED'})
          console.log(error);
          
      }

}


export const getUserOrders=()=>async (dispatch,getState)=>{

  const currentUser = getState().loginUserReducer.user
  dispatch({type:'GET_USER_ORDERS_REQUEST'})
  
  try {
      const response = await axios.post('/api/orders/getuserorders' , {username : currentUser.username})

      console.log(response)
      
      dispatch({type:'GET_USER_ORDERS_SUCCESS' , payload : response.data})
  } catch (error) {
      dispatch({type:'GET_USER_ORDERS_FAILED' , payload : error})
  }

}

export const getAllOrders=()=>async (dispatch,getState)=>{

  const currentUser = getState().loginUserReducer.user
  dispatch({type:'GET_ALLORDERS_REQUEST'})
  
  try {
      const response = await axios.get('/api/orders/getallorders')

      
      console.log(response);
      
      dispatch({type:'GET_ALLORDERS_SUCCESS' , payload : response.data})
  } catch (error) {
      dispatch({type:'GET_ALLORDERS_FAILED' , payload : error})
  }

}

export const deliverOrder=(orderid)=>async dispatch=>{



    try {
      const response = await axios.post('/api/orders/deliverorder' , {orderid})
      console.log(response);
      alert('Order Delivered')
      const orders = await axios.get('/api/orders/getallorders')
      dispatch({type:'GET_ALLORDERS_SUCCESS' , payload:orders.data})
    } catch (error) {
      console.log(error);
    }


}

export const filterorder=(searchkey)=>async dispatch=>{

  console.log(searchkey)
  dispatch({type:'GET_FILTERORDERS_REQUEST'})

  try {
      var filteredorders ;
      const response = await axios.get('/api/orders/getallorders')
      console.log(response)
      filteredorders = response.data.filter(order=>order.otp.includes(searchkey))
       console.log(filteredorders)
      
      dispatch({type:'GET_FILTERORDERS_SUCCESS' , payload : filteredorders})
  } catch (error) {
      dispatch({type:'GET_FILTERORDERS_FAILED' , payload : error})
  }

}

export const deleteOrder = (orderid) => async (dispatch) => {
  try {
    const response = await axios.post("/api/orders/deleteorder", { orderid });
    alert("order Deleted Successfully");
    console.log(response);
    window.location.reload();
  } catch (error) {
    alert("Something went wrong");
    console.log(error);
  }
};
