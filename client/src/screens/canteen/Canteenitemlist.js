import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deletecanteenItem,getAllCanteenItems } from "../../actions/Canteenitemactions";
import Error from "../../components/buypart/Error";
import Loading from "../../components/buypart/Loading";
import Navbar3 from "./Navbar3"
import "../css/Navbar1.css"
export default function Canteenitemlist() {
  const dispatch = useDispatch();

  const canteenitemsstate = useSelector((state) => state.getAllCanteenitemsReducer);

  const { canteenitems, error, loading } = canteenitemsstate;

  useEffect(() => {
    dispatch(getAllCanteenItems());
  }, []);
  
  return (
    <div className="adminPage">
      <Navbar3/>
      <h2 className="text-center">Items List</h2>
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}

      <table className="table table-bordered table-responsive-sm">
        <thead className="text-white bg-dark">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {canteenitems &&
            canteenitems.map((canteenitem) => {
              return (
                <tr key={canteenitem._id}>
                  <td>{canteenitem.name}</td>
                  <td>
                    {canteenitem.price} <br />
                  </td>
                  <td>{canteenitem.qty}</td>
                  <td>{canteenitem.category}</td>
                  <td>{canteenitem.description}</td>
                  <td>
                    <i
                      className="fa fa-trash m-1"
                      onClick={() => {
                        dispatch(deletecanteenItem(canteenitem._id));
                      }}
                    ></i>
                    <Link to={`/canteenadmin/editcanteenitem/${canteenitem._id}`}>
                      <i className="fa fa-edit m-1"></i>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
