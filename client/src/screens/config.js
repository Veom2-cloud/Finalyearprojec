// Config starter code
import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import CvOptions from "../components/buypart/CvOptions/CvOptions";
import KMBotAvatar from "../components/buypart/KMBotAvatar/KMBotAvatar";
import Buyitems from "../components/buypart/Buyitems";
import UploadFile from "./UploadFile";
import Otp from "./otp";
import Otp1 from "./otp1";
import Filescreen from "./filescreen";
import Ordersscreen from "./Ordersscreen";

const config = {
  botName: "Bot",
  initialMessages: [createChatBotMessage(`Hi, I am Bot. What do you want to do?`, {
      widget: "CvOptions",
    }),  
],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#C71585",
    },
    chatButton: {
      backgroundColor: "#C71585",
    },
  },
  customComponents: {
    botAvatar: (props) => <KMBotAvatar {...props} />,
  },
  widgets: [
    {
      widgetName: "CvOptions",
      widgetFunc: (props) => <CvOptions {...props} />,
    },
    {
      widgetName: "Buyitems",
      widgetFunc: (props) => <Buyitems {...props} />,
    },
    {
      widgetName: "otp",
      widgetFunc: (props) => <Otp {...props} />,
    },
    {
      widgetName: "otp1",
      widgetFunc: (props) => <Otp1 {...props} />,
    },
      {
        widgetName: "UploadFile",
        widgetFunc: (props) => <UploadFile {...props} />,
      },
      {
        widgetName: "Filescreen",
        widgetFunc: (props) => <Filescreen {...props} />,
      },
      {
        widgetName: "Ordersscreen",
        widgetFunc: (props) => <Ordersscreen {...props} />,
      },
  ],
}

export default config