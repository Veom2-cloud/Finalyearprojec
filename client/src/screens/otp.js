import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deliverOrder, getUserOrders } from "../actions/orderActions";



export default function Otp() {
  const [state, setState] = useState({
    otp: "",
  });
  const [msg,setmsg] = useState("")

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    dispatch(getUserOrders())


  }, []);

  const dispatch = useDispatch();
  const orderstate = useSelector(state=>state.getUserOrdersReducer)
  const {orders} = orderstate

  const otpp = async (event) => {
    event.preventDefault();

    const { otp } = state;
    {orders && orders.map(order=>{
      return(order.otp==otp ? (dispatch(deliverOrder(order._id))) : (''))
    })}

    setmsg("Thanks");

  };

  return (
    <div>
     
          <div>
          {msg && <p style={{color:"red"}}>{msg}</p>}

            <form onSubmit={otpp} className="text-center">
              <input
                type="text"
                name="otp"
                value={state.otp || ""}
                placeholder="Enter otp"
                onChange={handleInputChange}
              />

              <button type="submit " className="btn mt-3 mb-3">
                Send
              </button>
              <br />
            </form>
          </div>
       
    </div>
  );
}
