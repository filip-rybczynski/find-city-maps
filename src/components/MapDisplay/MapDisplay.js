import React from 'react';
import Map from './../Map/Map';

function MapDisplay ({cityName, cityLocation}) {
    return (
        <div>
            <h2>Map of {cityName}</h2>
            <Map center={cityLocation}/>
        </div>
        
        )
}

export default MapDisplay;