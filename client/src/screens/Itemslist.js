import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteItem, getAllItems } from "../actions/itemActions";
import Error from "../components/buypart/Error";
import Loading from "../components/buypart/Loading";
import Navbar1 from "./Navbar1"
import "./css/Navmenu.css"
export default function Itemslist() {
  const dispatch = useDispatch();

  const itemsstate = useSelector((state) => state.getAllItemsReducer);

  const { items, error, loading } = itemsstate;
  useEffect(() => {
    dispatch(getAllItems());
  }, []);
  return (
    <div className="adminPage">
      <Navbar1/>
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
          {items &&
            items.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>
                    {item.price} <br />
                  </td>
                  <td>{item.qty}</td>
                  <td>{item.category}</td>
                  <td>{item.description}</td>
                  <td>
                    <i
                      className="fa fa-trash m-1"
                      onClick={() => {
                        dispatch(deleteItem(item._id));
                      }}
                    ></i>
                    <Link to={`/admin/edititem/${item._id}`}>
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
