import React from "react";
import Chatbot from "react-chatbot-kit";
import Config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./Homescreen.css"
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from "../components/buypart/Navbar"

export default function Homescreen() {

  return (
<div>
 {/* <Navbar/> 
    <div className="app">
      <div className="container">
        <div className=" mx-auto col-ml-6 col-sm-8 col-lg-4 cpl-xl-3 my-5 r1"> */}
          <Chatbot
            config={Config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
    //      </div>
    
    // </div>
    // </div>
  );
}
