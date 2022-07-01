// React
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// components
import MapDisplay from "../MapDisplay/MapDisplay";
import CityInfo from "../CityInfo/CityInfo";
import NearbyCities from "../NearbyCities/NearbyCities";

// styles
import "./city-display.scss";

function CityDisplay({ mainCity, setApiCallsLeft, setMainCity }) {
  const [nearbyCity, setNearbyCity] = useState(null);

  // Whenever the main city displayed changes, we should clear any selected nearby city
  useEffect(() => {
    setNearbyCity(null);
  }, [mainCity]);

  return (
    <article className={"city-display"}>
      <h2>{mainCity.name}</h2>
      <div className="city-display__information">
        <section className="city-display__general-info">
          {/* <h3 className="city-display__info-header">General info</h3> */}
          <CityInfo city={mainCity} headerText={"General info"}/>
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
      <MapDisplay city={mainCity} nearbyCity={nearbyCity} />
    </article>
  );
}

CityDisplay.propTypes = {
  mainCity: PropTypes.object,
  setApiCallsLeft: PropTypes.func,
  setMainCity: PropTypes.func,
};

export default CityDisplay;
