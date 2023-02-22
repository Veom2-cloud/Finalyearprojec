import React, {useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCanteenOrders, deliverCanteenOrder } from "../../actions/Canteenorder";
import Error from "../../components/buypart/Error";
import Loading from "../../components/buypart/Loading";
import Navbar3 from "./Navbar3"
import "../css/Navmenu.css"


export default function Orderslist() {
  const dispatch = useDispatch();
  const getordersstate = useSelector((state) => state.getAllCanteenOrdersReducer);
  const { loading, error, canteenorders } = getordersstate;
 

  useEffect(() => {
    dispatch(getAllCanteenOrders());
  }, []);

  window.setTimeout( function() {
    window.location.reload();
  }, 30000);

  return (
    <div className="adminPage">
      <Navbar3/>
    
      {loading && <Loading />}
      <h2 className="text-center">Orders List</h2>
      {error && <Error error="Something went wrong" />}
      <table className="table table-striped table-bordered table-responsive-sm">
        <thead className="text-white bg-dark">
          <tr>
          <th>Name</th>

            <th>Order Item: quantity</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Time</th>
            <th>Time for delivery</th>
            <th>otp</th>
            <th>Paid</th>
            <th>Deliver</th>
          </tr>
        </thead>

        <tbody>
       
          {canteenorders && canteenorders.filter( function(canteenorder){
            return canteenorder.isDelivered == false
          }).map((canteenorder) => {
             
              return (
                <tr key={canteenorder._id}>
                                    <td>{canteenorder.name}</td>

                  <td>{canteenorder.ordercanteenItems.map(item=>{
                                        return <div>
                                            <p>{item.name} : {item.quantity}  </p>
                                        </div>
                                    })}</td>
                                    
                  <td>{canteenorder.ordercanteenAmount}</td>
                  <td>{canteenorder.date}</td>
                  <td>{canteenorder.time}</td>
                  <td>{canteenorder.updatedTime}</td>
                  <td>{canteenorder.otp}</td>
                  
                  <td>
                  {canteenorder.isPaid == true ? "YES" : "NO"}
                  </td>
                  <td>
                  <i
                      className="fa fa-check m-1"
                      onClick={() => {
                        dispatch(deliverCanteenOrder(canteenorder._id));
                      }}
                    ></i>
                  </td>
                  
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
