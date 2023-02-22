import React, { useState } from "react";
import { addToCart } from "../../actions/CanteencartActions";
import { useDispatch } from "react-redux";
import AOS from "aos";
import { Modal } from "react-bootstrap";
import "aos/dist/aos.css";
import { deleteFromCart } from "../../actions/CanteencartActions";

export default function Canteenitems({ canteenitem }) {
  AOS.init({});
  const [quantity, setquantity] = useState(1);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  return (
    <div key={canteenitem._id}>
      <div data-aos="zoom-in"></div>
      <div
        style={{
          margin: "20px 20px 30px 20px",
          height: "460px",
          background: "green",
        }}
        className="shadow p-3 mb-5 bg-white rounded "
      >
        <div onClick={handleShow}>
          <h1>{canteenitem.name}</h1>
          <img
            src={canteenitem.image}
            className="img-fluid"
            style={{ height: "150px", weight: "200px" }}
            alt="img"
          ></img>
        </div>

        <hr></hr>

        <div className="flex-container">
          <div className="w-100 m-1">
            <p>Quantity</p>
            <input
              type="number"
              placeholder="qty"
              className="form-control"
              value={quantity}
              min="0"
              onChange={(e) => {
                setquantity(e.target.value);
              }}
              max={canteenitem.qty}
              required
            />
          </div>
        </div>

        <hr></hr>

        <div className="flex-container mb-10">
          <div className="m-1 w-100">
            <h1 className="mt-1">Price: {canteenitem.price * quantity} Rs/-</h1>
          </div>
          <div className="m-1 w-100 ">
            <i
              className="fa fa-plus"
              aria-hidden="true"
              onClick={() => {
                dispatch(addToCart(canteenitem, quantity));
              }}
            ></i>
            <i
              className="fa fa-trash mr-1"
              aria-hidden="true"
              onClick={() => {
                dispatch(deleteFromCart(canteenitem));
              }}
            ></i>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{canteenitem.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <img
            src={canteenitem.image}
            className="img-fluid"
            style={{ height: "200px" }}
          />
          <hr></hr>
          <p>{canteenitem.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn" onClick={handleClose}>
            CLOSE
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
