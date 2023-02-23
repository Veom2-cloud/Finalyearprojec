// Config starter code
import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import CvOptions from "../components/buypart/CvOptions/CvOptions";
import KMBotAvatar from "../components/buypart/KMBotAvatar/KMBotAvatar";
import Buyitems from "../components/buypart/Buyitems";
import UploadFile from "./UploadFile";
import Filescreen from "./filescreen";
import Ordersscreen from "./Ordersscreen";
import Canteenitem from "./canteen/Canteenitem"
import Canteenorderlist from "./canteen/Canteenorderlist"
import OptionsStationary from "../components/buypart/CvOptions/OptionsStationary";
import OptionCanteen from "../components/buypart/CvOptions/OptionCanteen";

const config = {
  botName: "Bot",
  initialMessages: [createChatBotMessage(`Hi, What do you want to access`, {
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
      widgetName: "Optionfile",
      widgetFunc: (props) => <OptionsStationary {...props} />,
    },
    {
      widgetName: "Buyitems",
      widgetFunc: (props) => <Buyitems {...props} />,
    },
    
    {
      widgetName: "OptionCanteen",
      widgetFunc: (props) => <OptionCanteen {...props} />,
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
      {
        widgetName: "CanteenOrderscreen",
        widgetFunc: (props) => <Canteenitem {...props} />,
      },
      {
        widgetName: "CanteenOrderscreenList",
        widgetFunc: (props) => <Canteenorderlist {...props} />,
      },
  ],
}

export default config