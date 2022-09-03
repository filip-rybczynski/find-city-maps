// React
import React, { useState, useEffect, useRef } from "react";

// components
import CitySelection from "./components/CitySelection/CitySelection";
import CityDisplay from "./components/CityDisplay/CityDisplay";
import Footer from "./components/Footer/Footer";

// styles
import "./App.scss";
import APICallCounter from "./components/APICallCounter/APICallCounter";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

function App() {
  const [apiCallsLeft, setApiCallsLeft] = useState(1000); // daily limit on API calls to city DB
  const [mainCity, setMainCity] = useState(null); // main city that will be displayed
  const [prevMainCity, setPrevMainCity] = useState(null); // previous main city - to easily go back to view it again

  const changeMainCity = (value) => {
    setPrevMainCity(mainCity);

    setMainCity(value);
  };

  return (
    <div className={"main"} id="top">
      <h1 className={"main__header"}>Find city maps</h1>
      {apiCallsLeft !== 1000 && (
        <aside className="main__counter">
          <APICallCounter callsRemaining={apiCallsLeft} />
        </aside>
      )}
      <ErrorBoundary>
        <CitySelection
          setMainCity={changeMainCity}
          setApiCallsLeft={setApiCallsLeft}
        />
      </ErrorBoundary>

      {mainCity && (
        <ErrorBoundary>
          <CityDisplay
            mainCity={mainCity}
            prevMainCity={prevMainCity}
            setApiCallsLeft={setApiCallsLeft}
            setMainCity={changeMainCity}
          />
        </ErrorBoundary>
      )}

      <Footer apiCallsLeft={apiCallsLeft} />
    </div>
  );
}

export default App;
