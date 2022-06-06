import React, { useState, useEffect } from "react";
import MapDisplay from "../MapDisplay/MapDisplay";
import CityInfo from "../CityInfo/CityInfo";
import NearbyCities from "../NearbyCities/NearbyCities";

import "./city-display.scss";

function CityDisplay({ displayedCity, setApiCallsLeft, setCityToDisplay }) {
  // const [currentCity, setCurrentCity] = useState(null);
  const [nearbyCity, setNearbyCity] = useState(null);

  // Whenever the main city displayed changes, we should clear any selected nearby city
  useEffect(() => {
    setNearbyCity(null)
  }, [displayedCity]);

  return (
    <div className={"city-display"}>
      <h2>{displayedCity.name}</h2>
      <CityInfo city={displayedCity} />
      <NearbyCities
        mainCity={displayedCity}
        nearbyCity={nearbyCity}
        setApiCallsLeft={setApiCallsLeft}
        setCityToDisplay={setCityToDisplay}
        setNearbyCity={setNearbyCity}
      />
      <MapDisplay city={displayedCity} nearbyCity={nearbyCity}/>
    </div>
  );
}

export default CityDisplay;
