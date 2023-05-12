import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCanteenItems } from "../../actions/Canteenitemactions";
import Error from "../../components/buypart/Error";
import Loading from "../../components/buypart/Loading";
import Canteenitems from "../../components/buypart/Canteenitems";
import Checkout1 from "../../components/buypart/Checkout1"
import { deleteFromCart } from "../../actions/cartActions";


const Canteenitem = (props) => {
  const cartstate = useSelector((state) => state.cartCanteenReducer);
  const cartItems = cartstate.cartcanteenItems;
  var subtotal = cartItems.reduce((x, item) => x + item.prices, 0);
  const dispatch = useDispatch();

  const itemsstate = useSelector((state) => state.getAllCanteenitemsReducer);

  const { canteenitems, error, loading } = itemsstate;

  useEffect(() => {
    dispatch(getAllCanteenItems());
  }, []);

  return (
    <div>
       <div className="row justify-content-center text-center">
       
       {loading ? (
         <Loading/>
       ) : error ? (
         <Error error='Something went wrong'/>
       ) : (
         canteenitems.map((canteenitem) => {
           return (
             <div className="row-md-6" key={canteenitem._id}>
               <div>
                 <Canteenitems canteenitem={canteenitem} />
               </div>
             </div>
           );
         })
       )}
     </div>
    
     <h2 style={{fontSize:"15px" , color: "black", marginRight:"15px", textAlign:"center"}}>Cart Item = {cartstate.cartcanteenItems.length}</h2>
     <h2 style={{ fontSize: "15px", textAlign:"center" }}>SubTotal : {subtotal} /-</h2>
     <Checkout1 subtotal={subtotal} />

    </div>
  )
}

export default Canteenitem
