import React, { useState, useRef } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { Form, Row, Col, Button } from "react-bootstrap";
import { API_URL } from "../components/util/constants";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import {payment} from "../actions/paymentAction"

export default function UploadFile() {
  const [file, setFile] = useState(null); // state for storing actual image
  const loginstate = useSelector(state=>state.loginUserReducer)
    const {user} = loginstate
    console.log(user)

  const [previewSrc, setPreviewSrc] = useState(""); // state for storing previewImage
  const [state, setState] = useState({
    copies: "",
    
    pages: "",
    instruction: "",
  });
  const [issubmitted, setissubmitted] = useState(false);
const [fileid,setfileid] = useState("")

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
today.setMinutes(today.getMinutes()+10)
var updatedTime = today.getHours() + ":" +  today.getMinutes() + ":" + today.getSeconds();



  const dispatch = useDispatch();

  function tokenHander(token) {
    dispatch(payment(token, subtotal, fileid));
    alert("payment done")

  }

  const [msg, setmsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  //
  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
  };

  //
  const { copies, pages } = state;
  const subtotal = copies * pages * 1.5;


  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {

      const { copies, pages, instruction } = state;
      if (
    
        copies.trim() !== "" &&
        pages.trim() !== "" &&
        instruction.trim() !== ""
      ) {
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("username", user.username);
          formData.append("email", user.email);
          formData.append("userid", user.userId);

          formData.append("copies", copies);
          formData.append("pages", pages);
          formData.append("instruction", instruction);
          formData.append("date", date);
          formData.append("time", time);
          formData.append("updatedTime", updatedTime);
         
          setmsg("you can pay money now and can collect file after 10 mins");
          setissubmitted(true);
          
          const res =  await axios.post(`${API_URL}/upload`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
         
          setfileid(res.data.savedFile._id)
          

        } else {
          setErrorMsg("Please select a file to add.");
        }
      } else {
        setErrorMsg("Please enter all the field values.");
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };
  return (
    <React.Fragment>
      <Form className="search-form text-center" onSubmit={handleOnSubmit} >
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <Row>
          <Col>
            <Form.Group controlId="description">
              <Form.Control
                type="text"
                name="pages"
                value={state.pages || ""}
                placeholder="Enter no of pages"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="description">
              <Form.Control
                type="text"
                name="copies"
                value={state.copies || ""}
                placeholder="Enter no of copies"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="description">
              <Form.Control
                type="text"
                name="instruction"
                value={state.instruction || ""}
                placeholder="Enter instruction"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <div
          className="upload-section"
          style={{
            border: "1px solid #ced4da ",
            borderRadius: "0.25rem",
            padding: "0.375rem 0.25rem",
            alignItems: "left",
            marginBottom:"25px",
            marginTop: "10px"
          }}
        >
          <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: "drop-zone" })} ref={dropRef} >
                <input {...getInputProps()} multiple="multiple" />

                {file ? (
                  <div style={{color: "#0fbbfa"}}>
                    <strong >Selected file:</strong> {file.name}
                  </div>
                ) : (
                  <span style={{ color: "#6a767e", cursor: "pointer" }}>
                    click here to select a file
                  </span>
                )}
              </div>
            )}
          </Dropzone>
        </div>

        {issubmitted ? (
          ""
        ) : (
          <Button variant="primary" type="submit">
            Submit
          </Button>
        )}

        
      </Form>
      {issubmitted ? (
          <StripeCheckout
            amount={subtotal * 100}

            token={tokenHander}
            stripeKey="pk_test_51JXN8ASGX65UtClKQM1qR2CE17v2qSIK3mvU2Mt2nG04vFt2s32pxb7Vj5I8W278pXK92l3D5rZV45XFa1JYgKO900q1RZSIe3"
            currency="INR"
          >
            <button className="btn text-center">Pay Now</button>
          </StripeCheckout>
        ) : (
          ""
        )}
        {msg && <p style={{ color: "red" }}>{msg}</p>}

    </React.Fragment>
  );
}
