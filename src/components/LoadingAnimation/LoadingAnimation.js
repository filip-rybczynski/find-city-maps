import React from "react";

import "./loading-animation.scss";

function LoadingAnimation() {
  return (
    <div className={"loading"}>
      <span className="loading__spinner"></span>
      <span className="loading__text">Loading</span>
    </div>
  );
}

export default LoadingAnimation;
