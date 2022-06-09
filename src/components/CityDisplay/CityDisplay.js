import React, { useState, useEffect } from "react";
import MapDisplay from "../MapDisplay/MapDisplay";
import CityInfo from "../CityInfo/CityInfo";
import NearbyCities from "../NearbyCities/NearbyCities";

import "./city-display.scss";

function CityDisplay({ mainCity, setApiCallsLeft, setMainCity }) {
  // const [currentCity, setCurrentCity] = useState(null);
  const [nearbyCity, setNearbyCity] = useState(null);

  // Whenever the main city displayed changes, we should clear any selected nearby city
  useEffect(() => {
    setNearbyCity(null)
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
      <MapDisplay city={mainCity} nearbyCity={nearbyCity}/>
    </div>
  );
}

export default CityDisplay;
