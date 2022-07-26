// React
import React from "react";
import PropTypes from "prop-types";

// styles
import "./error-boundary.scss";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
    };
  }

  // the reason getDerivedStateFromProps is static is to discourage any side-effects during the render phase. On the other hand, React ensures it works normally on instances of this class and not only on the class itself (as static methods usually work) - React is responsible for the execution of lifecycle methods, so it has control over that
  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI.
    return {
      // this lifecycle method can update this particular state variable without using setState
      errorMessage: error.toString(),
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.log(
      "Logging error information:",
      error.toString(),
      errorInfo.componentStack
    );
  }

  render() {
    return this.state.errorMessage ? (
      <div className="error-container">
        <h2>An error has occured!</h2>
        <p>{this.state.errorMessage}</p>
        <p>
          Check console for more details. Please raise issue{" "}
          <a href="https://github.com/filip-rybczynski/find-city-maps/issues">
            here
          </a>
          {" "}and refresh the page
        </p>
      </div>
    ) : (
      this.props.children
    );
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
