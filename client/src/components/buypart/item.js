import React, { useState , useEffect} from "react";
import { addToCart } from "../../actions/cartActions";
import { useDispatch } from "react-redux";
import AOS from "aos";
import { Modal } from "react-bootstrap";
import "aos/dist/aos.css";
import { deleteFromCart } from "../../actions/cartActions";
import { editItem, getItemById } from "../../actions/itemActions";


export default function Item({ item }) {
  AOS.init({});
  const [quantity, setquantity] = useState(1);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setname] = useState("");
  const [price, setprice] = useState();
 const [qty, setqty] = useState()
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    if (item) {
      if (item._id == item._id) {
        setname(item.name);
        setdescription(item.description);
        setcategory(item.category);
        setprice(item.price);
      setqty(item.qty)
        setimage(item.image);

      } else {
        dispatch(getItemById(item._id));
      }
    } else {
      dispatch(getItemById(item._id));
    }
  }, [dispatch, item._id]);

  function additem(e) {
    e.preventDefault();
    // const editeditem = {
    //   _id: item._id,
    //   qty: qty - quantity,
    //   name,
    //   image,
    //   description,
    //   category,
    //   price,
    // };
    // dispatch(editItem(editeditem));
    dispatch(addToCart(item, quantity));
  }

  function deleteitem(e) {
    e.preventDefault();
    // const editedcanteenitem = {
    //   _id: item._id,
    //   qty: qty,
    //   name,
    //   image,
    //   description,
    //   category,
    //   price,
    // };
    // dispatch(editItem(editedcanteenitem));
    dispatch(deleteFromCart(item));

  }

  return (
    <div key={item._id}>
      <div data-aos="zoom-in"></div>

      <div
        style={{
          margin: "5px 5px 20px 5px",
          background: "green",
        }}
        className="shadow p-3 bg-white rounded "
      >
        <div>
          <h1>{item.name}</h1>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div onClick={handleShow} className="col-md-6">
            <img
              src={item.image}
              className="img-fluid"
              style={{ height: "70px", width: "70px" }}
              alt="img"
            ></img>
            <div className="m-1 w-100" style={{ fontSize: "smaller" }}>
              <span className="mt-1">{item.price * quantity} Rs/-</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexGrow: "1",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: "smaller", marginBottom: "4px" }}>
              Quantity
            </span>
            <input
              style={{ marginTop: "-10px" }}

              type="number"
              // placeholder="Quantity"
              className="form-control"
              value={quantity}
              min="0"
              max="10"

              onChange={(e) => {
                setquantity(e.target.value);
              }}
              required
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <i
                className="fa fa-plus"
                aria-hidden="true"
                onClick={additem}
              ></i>
              <i
                className="fa fa-trash"
                aria-hidden="true"
                onClick={deleteitem}
              ></i>
            </div>
          </div>
        </div>
      </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{item.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <img
            src={item.image}
            className="img-fluid"
            style={{ height: "200px" }}
          />
          <hr></hr>
          <p>{item.description}</p>
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
