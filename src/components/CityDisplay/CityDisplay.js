// React
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// components
import MapDisplay from "../MapDisplay/MapDisplay";
import CityInfo from "../CityInfo/CityInfo";
import NearbyCities from "../NearbyCities/NearbyCities";

// styles
import "./city-display.scss";

function CityDisplay ({ mainCity, setApiCallsLeft, setMainCity }) {
  const [nearbyCity, setNearbyCity] = useState(null);

  // Whenever the main city displayed changes, we should clear any selected nearby city
  useEffect(() => {
    setNearbyCity(null);
  }, [mainCity]);

  return (
    <div className={"city-display"}>
      <h2>{mainCity.name}</h2>
      <CityInfo city={mainCity} />
      <NearbyCities
        mainCity={mainCity}
        nearbyCity={nearbyCity}
        setApiCallsLeft={setApiCallsLeft}
        setMainCity={setMainCity}
        setNearbyCity={setNearbyCity}
      />
      <MapDisplay city={mainCity} nearbyCity={nearbyCity} />
    </div>
  );
}

CityDisplay.propTypes = {
  mainCity: PropTypes.object,
  setApiCallsLeft: PropTypes.func,
  setMainCity: PropTypes.func,
};

export default CityDisplay;
