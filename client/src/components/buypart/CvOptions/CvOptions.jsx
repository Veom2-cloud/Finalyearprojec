import React from "react";

import "./CvOptions.css";

const CvOptions = (props) => {
  const options = [
    { text: "Upload", handler: props.actionProvider.handleEducationList, id: 1 },
    { text: "Buy items", handler: props.actionProvider.handleLinksList, id: 2 },
    { text: "OTP", handler: props.actionProvider.handleotp, id: 3 },
    { text: "OTP For file", handler: props.actionProvider.handleotp1, id: 4 },
    { text: "file", handler: props.actionProvider.handlefile1, id: 5 },
    { text: "Orders List", handler: props.actionProvider.handleorderList, id: 6 },

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