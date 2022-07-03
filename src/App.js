// React
import React, { useState, useEffect, useRef } from "react";

// components
import CitySelection from "./components/CitySelection/CitySelection";
import CityDisplay from "./components/CityDisplay/CityDisplay";
import Footer from "./components/Footer/Footer";

// functions
import usePrevious from "./functions/usePrevious";

// styles
import "./App.scss";

function App() {
  const [apiCallsLeft, setApiCallsLeft] = useState(1000); // daily limit on API calls to city DB
  const [mainCity, setMainCity] = useState(null); // main city that will be displayed
  const [prevMainCity, setPrevMainCity] = useState(null); // previous main city - to easily go back to view it again

  const changeMainCity = (value) => {
    setPrevMainCity(mainCity);

    setMainCity(value);
  }

  return (
    <div className={"main"}>
      <h1 className={"main__header"}>City maps</h1>
      <CitySelection
        setMainCity={changeMainCity}
        setApiCallsLeft={setApiCallsLeft}
      />
      {mainCity && (
        <CityDisplay
          mainCity={mainCity}
          prevMainCity={prevMainCity}
          setApiCallsLeft={setApiCallsLeft}
          setMainCity={changeMainCity}
        />
      )}

      <Footer apiCallsLeft={apiCallsLeft} />
    </div>
  );
}

export default App;
