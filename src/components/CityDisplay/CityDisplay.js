// React
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

// components
import MapDisplay from "../MapDisplay/MapDisplay";
import CityInfo from "../CityInfo/CityInfo";
import NearbyCities from "../NearbyCities/NearbyCities";

// styles
import "./city-display.scss";

function CityDisplay({
  mainCity,
  setApiCallsLeft,
  setMainCity,
  prevMainCity = null,
}) {
  const [nearbyCity, setNearbyCity] = useState(null);

  // Whenever the main city displayed changes, we should clear any selected nearby city
  useEffect(() => {
    if (nearbyCity !== null) setNearbyCity(null);
  }, [mainCity]);

  // When new city is displayed, scroll down to the city display section
  useEffect(() => {
    document.querySelector("#city-display").scrollIntoView();
  }, [mainCity]);

  return (
    <article className={"city-display"} id={"city-display"}>
      <h2>{mainCity.name}</h2>
      <MapDisplay city={mainCity} nearbyCity={nearbyCity} />
      <div className="city-display__information">
        <section className="city-display__general-info main-info">
          <CityInfo city={mainCity} headerText={"General info"} />
          <button
            disabled={!prevMainCity}
            onClick={() => {
              // Allowing the user to view the previously viewed city
              // Initially tried using this: https://blog.logrocket.com/accessing-previous-props-state-react-hooks/
              // But since this breaks if there is an additional rerender (which for this component is the case when nearby city has to be set to null), it won't work
              setMainCity(prevMainCity);
            }}
            className="main-info__back-button"
          >
            Back to previous city{prevMainCity && ` (${prevMainCity.name})`}
          </button>
        </section>

        <NearbyCities
          mainCity={mainCity}
          nearbyCity={nearbyCity}
          setApiCallsLeft={setApiCallsLeft}
          setMainCity={setMainCity}
          setNearbyCity={setNearbyCity}
          className="city-display__nearby-cities"
        />
      </div>
    </article>
  );
}

CityDisplay.propTypes = {
  mainCity: PropTypes.object,
  setApiCallsLeft: PropTypes.func,
  setMainCity: PropTypes.func,
};

export default CityDisplay;
