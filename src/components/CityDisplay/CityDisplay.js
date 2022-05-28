import React, {useState} from 'react';
import MapDisplay from '../MapDisplay/MapDisplay';

import "./city-display.scss";

function CityDisplay ({displayedCity}) {

    const [currentCity, setCurrentCity] = useState(null);

    console.dir(displayedCity);

return (
<div className={"city-display"}>
    <h2>{displayedCity.name}</h2>
    {`Name: ${displayedCity.name},
      Country: ${displayedCity.country}
      Population: ${displayedCity.population}
      Longitude: ${displayedCity.longitude}
      Latitude: ${displayedCity.latitude}`}
    <MapDisplay city={displayedCity} />
</div>
)

}

export default CityDisplay;