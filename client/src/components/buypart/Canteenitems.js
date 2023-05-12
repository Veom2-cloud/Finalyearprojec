import React, { useState , useEffect} from "react";
import { addToCart } from "../../actions/CanteencartActions";
import { useDispatch } from "react-redux";
import AOS from "aos";
import { Modal } from "react-bootstrap";
import "aos/dist/aos.css";
import { deleteFromCart } from "../../actions/CanteencartActions";
import { editcanteenItem , getCanteenItemById} from "../../actions/Canteenitemactions";


export default function Canteenitems({ canteenitem }) {
  AOS.init({});
  const [quantity, setquantity] = useState(1);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [qty, setqty] = useState()
  const [name, setname] = useState("");
  const [price, setprice] = useState();
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");


  const dispatch = useDispatch();

  useEffect(() => {
    if (canteenitem) {
      if (canteenitem._id == canteenitem._id) {
        setname(canteenitem.name);
        setdescription(canteenitem.description);
        setcategory(canteenitem.category);
        setprice(canteenitem.price);
      setqty(canteenitem.qty)
        setimage(canteenitem.image);

      } else {
        dispatch(getCanteenItemById(canteenitem._id));
      }
    } else {
      dispatch(getCanteenItemById(canteenitem._id));
    }
  }, [dispatch, canteenitem._id]);

  function editfood(e) {
    e.preventDefault();
    // const editedcanteenitem = {
    //   _id: canteenitem._id,
    //   qty: qty - quantity,
    //   name,
    //   image,
    //   description,
    //   category,
    //   price,
    // };
    // dispatch(editcanteenItem(editedcanteenitem));
    dispatch(addToCart(canteenitem, quantity));
  }

  function deletefood(e) {
    e.preventDefault();
    // const editedcanteenitem = {
    //   _id: canteenitem._id,
    //   qty: qty,
    //   name,
    //   image,
    //   description,
    //   category,
    //   price,
    // };
    // dispatch(editcanteenItem(editedcanteenitem));
    dispatch(deleteFromCart(canteenitem));
  }

  return (
    <div key={canteenitem._id}>
      <div data-aos="zoom-in"></div>
      <div
        style={{
          margin: "5px 5px 20px 5px",
          background: "green",
        }}
        className="shadow p-3 bg-white rounded "
      >
        <div>
          <h1>{canteenitem.name}</h1>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row"
          }}
        >
          <div onClick={handleShow} className="col-md-6">
            <img
              src={canteenitem.image}
              className="img-fluid"
              style={{ height: "70px", width: "70px" }}
              alt="img"
            ></img>
              <div className="m-1 w-100" style={{ fontSize: "smaller" }}>
                <span className="mt-1">{canteenitem.price * quantity} Rs/-</span>
              </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexGrow:"1",
              justifyContent:"space-between"
            }}
          >
            <span style={{ fontSize: "smaller" ,marginBottom:"4px"}}>Quantity</span>
            <input
              style={{marginTop:"-10px"}}
              type="number"
              maxLength={10}
              // placeholder="Quantity"
              className="form-control"
              value={quantity}
              min="0"
              onChange={(e) => {
                setquantity(e.target.value);
              }}
              max={canteenitem.qty}
              required
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent:'space-around'
              }}
            >
              <i
                className="fa fa-plus"
                aria-hidden="true"
                onClick={editfood}
              ></i>
              <i
                className="fa fa-trash"
                aria-hidden="true"
                onClick={deletefood}
              ></i>
            </div>
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
