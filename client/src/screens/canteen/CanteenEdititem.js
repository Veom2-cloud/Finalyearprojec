import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editcanteenItem , getCanteenItemById} from "../../actions/Canteenitemactions";
import Error from "../../components/buypart/Error";
import Loading from "../../components/buypart/Loading";
import {useParams} from "react-router-dom"
import Success from "../../components/buypart/Success";
import Navbar3 from "./Navbar3"
import "../css/Navmenu.css"

export default function Editcanteenitem({ match }) {
  const { canteenitemid } = useParams();
  console.log(canteenitemid)

  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [price, setprice] = useState();
 const [qty, setqty] = useState()
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");

  const getcanteenitembyidstate = useSelector((state) => state.getCanteenItemByIdReducer);

  const {canteenitem, error, loading } = getcanteenitembyidstate;

  const edititemstate = useSelector((state) => state.editCanteenItemReducer);
  const { editloading, editerror, editsuccess } = edititemstate;

  useEffect(() => {
    if (canteenitem) {
      if (canteenitem._id == canteenitemid) {
        setname(canteenitem.name);
        setdescription(canteenitem.description);
        setcategory(canteenitem.category);
        setprice(canteenitem.price);
      setqty(canteenitem.qty)
        setimage(canteenitem.image);
      } else {
        dispatch(getCanteenItemById(canteenitemid));
      }
    } else {
      dispatch(getCanteenItemById(canteenitemid));
    }
  }, [canteenitem, dispatch]);

  function formHandler(e) {
    e.preventDefault();

    const editedcanteenitem = {
      _id: canteenitemid,
      name,
      image,
      description,
      category,
      price,
      qty
    };

    dispatch(editcanteenItem(editedcanteenitem));
  }

  return (
    <div className="adminPage">
              <Navbar3/>

      <div className="text-center shadow-lg p-3 mb-5 bg-white rounded" id = "edititem">
        <h1>Edit Canteen Item</h1>
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
