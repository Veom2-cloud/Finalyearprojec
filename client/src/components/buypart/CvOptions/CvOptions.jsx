import React from "react";

import "./CvOptions.css";

const CvOptions = (props) => {
  const options = [
    { text: "Upload", handler: props.actionProvider.handleEducationList, id: 1 },
    { text: "Buy items", handler: props.actionProvider.handleLinksList, id: 2 },
    { text: "file", handler: props.actionProvider.handlefile1, id: 3 },
    { text: "Orders List", handler: props.actionProvider.handleorderList, id: 4 },
    { text: "Canteen Item Order", handler: props.actionProvider.handlecanteenorder, id: 5 },
    { text: "Canteen Order List", handler: props.actionProvider.handlecanteenorderlist, id: 6 },


  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="cv-option-button"
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return <div className="cv-options-container">{optionsMarkup}</div>;
};

export default CvOptions;