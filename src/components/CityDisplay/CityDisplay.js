import React, { useState } from "react";
import MapDisplay from "../MapDisplay/MapDisplay";
import CityInfo from "../CityInfo/CityInfo";
import NearbyCities from "../NearbyCities/NearbyCities";

import "./city-display.scss";

function CityDisplay({ displayedCity, setApiCallsLeft }) {
  const [currentCity, setCurrentCity] = useState(null);

  return (
    <div className={"city-display"}>
      <h2>{displayedCity.name}</h2>
      <CityInfo city={displayedCity} />
      <NearbyCities mainCity={displayedCity} setApiCallsLeft={setApiCallsLeft} y/>
      <MapDisplay city={displayedCity} />
    </div>
  );
}

export default CityDisplay;
