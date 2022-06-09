// React
import React, { useState } from "react";

// components
import CitySelection from "./components/CitySelection/CitySelection";
import CityDisplay from "./components/CityDisplay/CityDisplay";
import Footer from "./components/Footer/Footer";

// styles
import "./App.scss";

function App() {
  const [apiCallsLeft, setApiCallsLeft] = useState(1000); // daily limit on API calls to city DB
  const [mainCity, setMainCity] = useState(null); // main city that will be displayed

  return (
    <div className={"main"}>
      <h1 className={"main__header"}>City maps</h1>
      <CitySelection
        setMainCity={setMainCity}
        setApiCallsLeft={setApiCallsLeft}
      />
      {mainCity && (
        <CityDisplay
          mainCity={mainCity}
          setApiCallsLeft={setApiCallsLeft}
          setMainCity={setMainCity}
        />
      )}

      <Footer apiCallsLeft={apiCallsLeft} />
    </div>
  );
}

export default App;
