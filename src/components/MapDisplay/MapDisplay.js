import React, {useState, useEffect} from 'react';
import CityMap from './../Map/CityMap';
import Layers from "../Layers/Layers";
import TileLayer from "../Layers/TileLayer";
import MapOptions from '../MapOptions/MapOptions';

import {fromLonLat} from 'ol/proj.js';
import OSM from 'ol/source/OSM.js';

// Done based on: https://medium.com/swlh/how-to-incorporate-openlayers-maps-into-react-65b411985744

function MapDisplay ({city, nearbyCity}) {

      // the default projection for OpenLayers is the Spherical Mercator projection, for which we need to perform a conversion from longitude and latitude values received from props
      const mainMercatorCoords = fromLonLat([city.longitude, city.latitude])
      const [center, setStateCenter] = useState(mainMercatorCoords)
      
      const [zoom, setStateZoom] = useState(9); // I might want to modify zoom interactively  later on

      // To ensure center is updated when displayed city changes ("city" in props)
useEffect(()=> {

    let longitude = city.longitude; 
    let latitude = city.latitude;

    if (nearbyCity) {
        longitude = (longitude + nearbyCity.longitude) / 2;
        latitude = (latitude + nearbyCity.latitude) / 2;
    } 

    setStateCenter(fromLonLat([longitude, latitude]));
      setStateZoom(9);

}, [city, nearbyCity])

const resetCenter = () => {
    setStateZoom(9);
    setStateCenter(mainMercatorCoords)
}

    return (
        <div>
            <h3>Map of {city.name}</h3>
            <CityMap center={center} zoom={zoom} setStateZoom={setStateZoom} setStateCenter={setStateCenter}>
                <Layers>
                    <TileLayer source={new OSM()} zIndex={0}/>
                </Layers>
            </CityMap>
            <MapOptions city={city} resetCenter={resetCenter} />
        </div>
        
        )
}

export default MapDisplay;