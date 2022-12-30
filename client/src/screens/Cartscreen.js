import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { deleteFromCart } from "../actions/cartActions";
import Checkout from "../components/Checkout";
import AOS from "aos";
import "aos/dist/aos.css";
export default function Cartscreen() {
  AOS.init();
  
  const cartstate = useSelector((state) => state.cartReducer);
  const cartItems = cartstate.cartItems;
  var subtotal = cartItems.reduce((x, item) => x + item.prices, 0);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="row justify-content-center p-2" data-aos="fade-down">
        <div className="col-md-7">
          <h2 style={{ fontSize: "40px" }}>My Cart</h2>

          {cartItems.map((item) => {
            return (
              <div className="flex-container mt-4 r2">
                <div className="text-left m-1 w-100 r3">
                  <h1>
                    {item.name} 
                  </h1>
                  <h1 className="y1">
                    Price :  {item.quantity} * {item.price} = {item.prices} 
                  </h1>
                
                  <h1 style={{ display: "inline" }} className="y1">Quantity : </h1>
               
                  <i
                    className="fa fa-plus"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch(
                        addToCart(item, item.quantity + 1)
                      );
                    }}
                  ></i>
                  <b>{item.quantity}</b>
                  <i
                    className="fa fa-minus"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch(
                        addToCart(item, item.quantity - 1)
                      );
                    }}
                  ></i>
                  <hr />
                </div>

                <div className="m-1 w-100 y3">
                  <img
                    src={item.image}
                    style={{ height: "80px", height: "80px" }}
                  />
                </div>
                <div className="m-1 w-100">
                  <i
                    className="fa fa-trash mt-5"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch(deleteFromCart(item));
                    }}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>

        <div className="col-md-4 text-center">
          <h2 style={{ fontSize: "45px" }}>SubTotal : {subtotal} /-</h2>
          <Checkout subtotal={subtotal} />
        </div>
      </div>
    </div>
  );
}
