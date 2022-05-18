import React from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: null,
    };
  }

  // the reason getDerivedStateFromProps is static is to discourage any side-effects during the render phase. On the other hand, React ensures it works normally on instances of this class and not only on the class itself (as static methods usually work) - React is responsible for the execution of lifecycle methods, so it has control over that
  static getDerivedStateFromError(error) {
    console.log(error);
    // this lifecycle method can update this particular state variable without using setState
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Logging error information", error, errorInfo);
  }

  render() {
    return this.state.hasError ? (
      <div>
        <h2>An error has occured!</h2>
        <p>this.state.errorMessage</p>
      </div>
    ) : (
      this.props.children
    );
  }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
}

export default ErrorBoundary;
