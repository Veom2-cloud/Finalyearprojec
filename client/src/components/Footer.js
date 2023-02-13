import { Card, Grid, Link,IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Homescreen from "../screens/Homescreen";
import Chatbot from "react-chatbot-kit";
import Config from "../screens/config";
import MessageParser from "../screens/MessageParser";
import ActionProvider from "../screens/ActionProvider";
import Copyright from "./Copyright";
import "./Footer.css";
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import CloseIcon from '@mui/icons-material/Close';


const Footer = () => {
  const [msg, setmsg] = useState(false);
  function openForm() {
    document.getElementById("myForm").style.display = "block";
    document.getElementById("openbutton").style.display = "none";
    
    // setmsg(true);
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("openbutton").style.display = "block";
  }


  return (
    <div id="footers">

      <button className="open-button" id="openbutton" onClick={openForm}>
        Get your Items
      </button>

      <div className="chat-popup" id="myForm">
        <Chatbot
          className="form-container"
          id="chatbot"
          config={Config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
          headerText="Get your items"
        />

            <IconButton color="primary" id="closebutton" onClick={closeForm}>
                <CloseIcon/>
              </IconButton>

      </div>
    </div>
  );
};

export default Footer;
