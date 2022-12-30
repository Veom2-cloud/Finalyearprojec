import React,{useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { placeOrder, getAllOrders  } from "../../actions/orderActions";
import Error from "./Error";
import Loading from "./Loading";
import Success from "./Success";
import { deleteFromCart } from "../../actions/cartActions";


export default function Checkout({ subtotal }) {
  const orderstate = useSelector((state) => state.placeOrderReducer);
  const { loading, error, success  } = orderstate;
  
 
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllOrders());
  }, []);
  
  function tokenHander(token) {
    dispatch(placeOrder(token, subtotal));
    alert("Order can be collected after 10 mins")

  }
  
  function abc() {
    if (localStorage.getItem("user")) {
      const currentUser = JSON.parse(localStorage.getItem("user"));

    } else {
      alert("Please Login to buy the Item");
      window.location.href = "/login";
    }
  }

  return (
    <div className="text-center">
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}

      <StripeCheckout
        amount={subtotal * 100}
        token={tokenHander}
        stripeKey="pk_test_51JXN8ASGX65UtClKQM1qR2CE17v2qSIK3mvU2Mt2nG04vFt2s32pxb7Vj5I8W278pXK92l3D5rZV45XFa1JYgKO900q1RZSIe3"
        currency="INR"
      >
        <button className="btn" onClick={abc}>Pay Now</button>
      </StripeCheckout>
    </div>
  );
}
