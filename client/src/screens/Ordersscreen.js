import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../actions/orderActions";
import Error from "../components/buypart/Error";
import Loading from "../components/buypart/Loading";
import Success from "../components/buypart/Success";
import AOS from "aos";
import "aos/dist/aos.css";
export default function Ordersscreen() {
  AOS.init();
  const dispatch = useDispatch();
  const orderstate = useSelector((state) => state.getUserOrdersReducer);
  const { orders, error, loading } = orderstate;

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  return (
    <div>
      <h2 style={{ fontSize: "20px", textAlign:"center" }}>Orders</h2>
      <hr />
      <div className="row m-1">
        {loading && <Loading />}
        {error && <Error error="Something went wrong" />}
        {orders && orders.length > 0 ?
          orders.filter( function(order){
            return order.isDelivered == false
          }).map((order) => {
            return (
              <div
                className="m-1 p-3"
                style={{ backgroundColor: "#f2aa4cff", color: "#101820ff" }}
                key={order._id}
              >
                <div className="flex-container">
                  <div className="text-left">
                    <h2 style={{ fontSize: "20px" }}>Items</h2>
                    <hr />
                    {order.orderItems.map((item) => {
                      return (
                        <div key={item._id}>
                          <p>
                            {item.name} [{item.price}] * {item.quantity} ={" "}
                            {item.prices}
                          </p>
                        </div>
                      );
                    })}

                    <h2 style={{ fontSize: "20px" }}>Order Info</h2>
                    <hr />
                    <p>Name: {order.name}</p>
                    <p>Order Amount : {order.orderAmount}</p>
                    <p>Date : {order.createdAt.substring(0, 10)}</p>
                    <p>Time : {order.time}</p>
                    <p>Time to Collect : {order.updatedTime}</p>
                    <p>Paid: {order.isPaid == true ? "Paid" : "Not Paid"}</p>
                    <p>
                      Recieved:
                      {order.isDelivered == true
                        ? "Recieved"
                        : "Not Recieved"}
                    </p>
                  </div>
                </div>
              </div>
            );
          }):  (
            <div className="text-center">Not found</div>
          )} 
      </div>
    </div>
  );
}
