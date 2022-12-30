import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editItem, getItemById } from "../actions/itemActions";
import Error from "../components/buypart/Error";
import Loading from "../components/buypart/Loading";
import {useParams} from "react-router-dom"
import Success from "../components/buypart/Success";
import Navbar1 from "./Navbar1"
import "./css/Navmenu.css"
export default function Edititem({ match }) {
  const { itemid } = useParams();
  console.log(itemid)

  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [price, setprice] = useState();
 const [qty, setqty] = useState()
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");

  const getitembyidstate = useSelector((state) => state.getItemByIdReducer);

  const {item, error, loading } = getitembyidstate;
console.log(item)

  const edititemstate = useSelector((state) => state.editItemReducer);
  const { editloading, editerror, editsuccess } = edititemstate;

  useEffect(() => {
    if (item) {
      if (item._id == itemid) {
        setname(item.name);
        setdescription(item.description);
        setcategory(item.category);
        setprice(item.price);
      setqty(item.qty)
        setimage(item.image);
      } else {
        dispatch(getItemById(itemid));
      }
    } else {
      dispatch(getItemById(itemid));
    }
  }, [item, dispatch]);

  function formHandler(e) {
    e.preventDefault();

    const editeditem = {
      _id: itemid,
      name,
      image,
      description,
      category,
      price,
      qty
    };

    dispatch(editItem(editeditem));
  }

  return (
    <div className="adminPage">
              <Navbar1/>

      <div className="text-center shadow-lg p-3 mb-5 bg-white rounded" id = "edititem">
        <h1>Edit Item</h1>
        {loading && <Loading />}
        {error && <Error error="Something went wrong" />}
        {editsuccess && <Success success="Item details edited successfully" />}
        {editloading && <Loading />}

        <form onSubmit={formHandler}>
          <input
            className="form-control"
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="number"
            placeholder="price"
            value={price}
            onChange={(e) => {
              setprice(e.target.value);
            }}
          />
        <input
            className="form-control"
            type="number"
            placeholder="qty"
            value={qty}
            onChange={(e) => {
              setqty(e.target.value);
            }}
          />
          
          <input
            className="form-control"
            type="text"
            placeholder="category"
            value={category}
            onChange={(e) => {
              setcategory(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => {
              setdescription(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="image url"
            value={image}
            onChange={(e) => {
              setimage(e.target.value);
            }}
          />
          <button className="btn mt-3" type="submit">
            Edit Item
          </button>
        </form>
      </div>
    </div>
  );
}
