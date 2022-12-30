import React, { useState, useEffect } from "react";
import { useDispatch , useSelector } from 'react-redux'
import { addItem } from "../actions/itemActions";
import Error from "../components/buypart/Error";
import Loading from "../components/buypart/Loading";
import Success from '../components/buypart/Success'
import Navbar1 from "./Navbar1"
import "./css/Navmenu.css"
export default function Additem() {
  const [name, setname] = useState("");
  const [price, setprice] = useState();
  const [qty, setqty] = useState()
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");
  
  const dispatch = useDispatch()

  const additemstate = useSelector(state=>state.addItemReducer)
  const {success , error , loading} = additemstate
  function formHandler(e){

    e.preventDefault();

    const item ={
        name ,
        image,
        description,
        category,
        price,
        qty
    }

    console.log(item);
    dispatch(addItem(item));

  }

  return (
    <div className="adminPage">
              <Navbar1/>

      <div className='text-center shadow-lg p-3 mb-5 rounded' id="additem">
        <h1>Add Item</h1>

        {loading && (<Loading/>)}
        {error && (<Error error='Something went wrong'/>)}
        {success && (<Success success='New Item added successfully'/>)}

        <form onSubmit={formHandler}>
          <input
            className="form-control"
            type="text"
            placeholder="name"
            value={name}
            required
            style={{textAlign: "center"}}
            onChange={(e) => {
              setname(e.target.value);
              
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="price"
            value={price}
            required
            style={{textAlign: "center"}}

            onChange={(e) => {
              setprice(e.target.value);
            
            }}
          />
           <input
            className="form-control"
            type="number"
            placeholder="qty"
            value={qty}
            required
            style={{textAlign: "center"}}

            onChange={(e) => {
              setqty(e.target.value);
            }}
          />
         
          <input
            className="form-control"
            type="text"
            placeholder="category"
            value={category}
            required
            style={{textAlign: "center"}}

            onChange={(e) => {
              setcategory(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="description"
            value={description}
            required
            style={{textAlign: "center"}}

            onChange={(e) => {
              setdescription(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="image url"
            value={image}
            required
            style={{textAlign: "center"}}

            onChange={(e) => {
              setimage(e.target.value);
            }}
          />
          <button className='btn mt-3' type='submit'>Add Item</button>
        </form>
      </div>
    </div>
  );
}
