// React
import React from "react";
import PropTypes from "prop-types";

// styles
import "./api-call-counter.scss";

function APICallCounter({ callsRemaining }) {
  let message;

  switch (callsRemaining) {
    case 1000:
      message = "Please note that there are limited API calls per day";
      break;
    case 0:
      message = "No API calls left for today - sorry!";
      break;
    default:
      message = `You have ${callsRemaining} API calls left for today`;
  }

  return (
    <span className={`api-counter ${callsRemaining < 100 && "low"}`}>
      {message}
    </span>
  );
}

APICallCounter.propTypes = {
  callsRemaining: PropTypes.number,
};

export default APICallCounter;
