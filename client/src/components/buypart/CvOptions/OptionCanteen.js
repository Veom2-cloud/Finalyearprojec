import React from "react";

import "./CvOptions.css";

const OptionCanteen = (props) => {
  const options = [
    { text: "Order food", handler: props.actionProvider.handlecanteenorder, id: 1 },
    { text: "Food order list", handler: props.actionProvider.handlecanteenorderlist, id: 2 },


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

export default OptionCanteen;