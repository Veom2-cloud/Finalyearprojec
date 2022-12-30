import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems } from "../../actions/itemActions";
import Error from "./Error";
import Loading from "./Loading";
import Item from "./item";
import Checkout from "./Checkout"
import { deleteFromCart } from "../../actions/cartActions";


const Buyitems = (props) => {
  const cartstate = useSelector((state) => state.cartReducer);
  const cartItems = cartstate.cartItems;
  var subtotal = cartItems.reduce((x, item) => x + item.prices, 0);
  const dispatch = useDispatch();

  const itemsstate = useSelector((state) => state.getAllItemsReducer);

  const { items, error, loading } = itemsstate;

  useEffect(() => {
    dispatch(getAllItems());
  }, []);
  return (
    <div>
       <div className="row justify-content-center text-center">
       
       {loading ? (
         <Loading/>
       ) : error ? (
         <Error error='Something went wrong'/>
       ) : (
         items.map((item) => {
           return (
             <div className="row-md-12" key={item._id}>
               <div>
                 <Item item={item} />
               </div>
             </div>
           );
         })
       )}
     </div>
    
     <h2 style={{fontSize:"15px" , color: "black", marginRight:"15px", textAlign:"center"}}>Cart Item = {cartstate.cartItems.length}</h2>
     <h2 style={{ fontSize: "15px", textAlign:"center" }}>SubTotal : {subtotal} /-</h2>
     <Checkout subtotal={subtotal} />

    </div>
  )
}

export default Buyitems
