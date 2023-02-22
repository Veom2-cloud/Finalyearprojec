import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCanteenUserOrders } from "../../actions/Canteenorder";
import Error from "../../components/buypart/Error";
import Loading from "../../components/buypart/Loading";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CanteenOrderscreenList() {
  AOS.init();
  const dispatch = useDispatch();
  const canteenorderstate = useSelector((state) => state.getUserCanteenOrdersReducer);
  const { canteenorders, error, loading } = canteenorderstate;

  useEffect(() => {
    dispatch(getCanteenUserOrders());
  }, []);

  return (
    <div>
      <h2 style={{ fontSize: "20px", textAlign:"center" }}>Orders</h2>
      <hr />
      <div className="row m-1">
        {loading && <Loading />}
        {error && <Error error="Something went wrong" />}
        {canteenorders && canteenorders.length > 0 ?
          canteenorders.filter( function(canteenorder){
            return canteenorder.isDelivered == false
          }).map((canteenorder) => {
            return (
              <div
                className="m-1 p-3"
                style={{ backgroundColor: "#f2aa4cff", color: "#101820ff" }}
                key={canteenorder._id}
              >
                <div className="flex-container">
                  <div className="text-left">
                    <h2 style={{ fontSize: "20px" }}>Items</h2>
                    <hr />
                    {canteenorder.ordercanteenItems.map((item) => {
                      return (
                        <div key={item._id}>
                          <p>
                            {item.name} [{item.price}] * {item.quantity} ={" "}
                            {item.prices}
                          </p>
                        </div>
                      );
                    })}

                    <h2 style={{ fontSize: "20px" }}>canteenOrder Info</h2>
                    <hr />
                    <p>Name: {canteenorder.name}</p>
                    <p>canteenOrder Amount : {canteenorder.ordercanteenAmount}</p>
                    <p>Date : {canteenorder.createdAt.substring(0, 10)}</p>
                    <p>Time : {canteenorder.time}</p>
                    <p>Time to Collect : {canteenorder.updatedTime}</p>
                    <p>Paid: {canteenorder.isPaid == true ? "Paid" : "Not Paid"}</p>
                    <p>
                      Recieved:
                      {canteenorder.isDelivered == true
                        ? "Recieved"
                        : "Not Recieved"}
                    </p>
                    <p>Otp: {canteenorder.otp}</p>
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
