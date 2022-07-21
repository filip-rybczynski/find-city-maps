// React
import React from "react";
import PropTypes from "prop-types";

// components
import APICallCounter from "./../APICallCounter/APICallCounter";

// assets
import gitHubLogo from "./../../assets/img/github-icon-lightblue.svg";

// styles
import "./footer.scss";

function Footer({ apiCallsLeft }) {
  return (
    <footer className={"footer"}>
      <a className="footer__link" href="#top">
        Back to top
      </a>
      <APICallCounter callsRemaining={apiCallsLeft}></APICallCounter>
      <span className={"footer__author"}>
        Created by{" "}
        <a className="footer__link" href="https://filip-rybczynski.github.io/">
          Filip Rybczyński
        </a>
        . Code on{" "}
        <a
          className="footer__link"
          href="https://github.com/filip-rybczynski/find-city-maps"
        >
          <img src={gitHubLogo} className="footer__gh-logo" alt="GitHub logo" />
          Github
        </a>
      </span>
    </footer>
  );
}

APICallCounter.propTypes = {
  apiCallsLeft: PropTypes.number,
};

export default Footer;
