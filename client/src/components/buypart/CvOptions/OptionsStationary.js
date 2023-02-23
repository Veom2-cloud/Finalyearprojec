import React from "react";

import "./CvOptions.css";

const OptionsStationary = (props) => {
  const options = [
    { text: "Upload docs", handler: props.actionProvider.handleEducationList, id: 1 },
    { text: "Buy stationary items", handler: props.actionProvider.handleLinksList, id: 2 },
    { text: "Printout orders", handler: props.actionProvider.handlefile1, id: 3 },
    { text: "Stationary orders list", handler: props.actionProvider.handleorderList, id: 4 },

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

export default OptionsStationary;