import React from "react";

import "./loading-animation.scss";

function LoadingAnimation({ isVertical = false }) {
  return (
    <div className={`loading ${isVertical && "vertical"}`}>
      <span className="loading__spinner"></span>
      <span className="loading__text">Loading</span>
    </div>
  );
}

export default LoadingAnimation;
