import React, { useState, useEffect } from "react";
import CityMap from "./../Map/CityMap";
import Layers from "../Layers/Layers";
import TileLayer from "../Layers/TileLayer";
import VectorLayer from "../Layers/VectorLayer";
import MapOptions from "../MapOptions/MapOptions";

import {View} from "ol";
import { fromLonLat } from "ol/proj.js";
import { boundingExtent } from "ol/extent.js";
import OSM from "ol/source/OSM.js";
import Vector from "ol/source/Vector.js";

import createMarker from "../../functions/createMarker";

// Done based on: https://medium.com/swlh/how-to-incorporate-openlayers-maps-into-react-65b411985744

function MapDisplay({ city, nearbyCity }) {
  const DEFAULT_ZOOM = 9;

  // the default projection for OpenLayers is the Spherical Mercator projection, for which we need to perform a conversion from longitude and latitude values received from props
  const mainMercatorCoords = fromLonLat([city.longitude, city.latitude]);

  const [center, setStateCenter] = useState(mainMercatorCoords);
  const [zoom, setStateZoom] = useState(DEFAULT_ZOOM); // I might want to modify zoom interactively  later on
  const [extent, setExtent] = useState(null); // to use when two cities are displayed

  const resetCenter = (zoom = DEFAULT_ZOOM) => {
    setStateZoom(zoom);
    setStateCenter(mainMercatorCoords);
    setExtent(null);
  };

  const [vectorSource, setVectorSource] = useState(null);
  const [showVectorLayer, setShowVectorLayer] = useState(true);

  // To ensure center is updated when displayed main city changes ("city" in props)
  // OR if nearbyCity changes to null (meaning that only the main city is displayed)

  useEffect(() => {
    if (nearbyCity !== null) return;

    resetCenter();
  }, [city, nearbyCity]);

  // In remaining scenarios (nearbyCity change to different value than null), instead of new center calculation, extent will be created to fit both cities
  useEffect(() => {
    if (nearbyCity === null) return;

    const nearbyCityMercatorCoords = fromLonLat([
      nearbyCity.longitude,
      nearbyCity.latitude,
    ]);

    const ext = boundingExtent([mainMercatorCoords, nearbyCityMercatorCoords]);

    setExtent(ext);

    return () => {
      setExtent(null);
    };
  }, [nearbyCity]);

  // creating markers

  useEffect(() => {
    const newVector = new Vector({
      features: [
        createMarker(city),
        ...(nearbyCity ? [createMarker(nearbyCity, false)] : []), // this works because spreading an empty array doesn't do anything: https://stackoverflow.com/questions/44908159/how-to-define-an-array-with-conditional-elements
      ],
    });

    setVectorSource(newVector);

    return () => {
      setVectorSource(null);
    };
  }, [city, nearbyCity]);

  return (
    <div>
      <h3>Map of {city.name}</h3>
      <CityMap
        center={center}
        zoom={zoom}
        extent={extent}
        setStateZoom={setStateZoom}
        setStateCenter={setStateCenter}
      >
        <Layers>
          <TileLayer source={new OSM()} zIndex={0} />
          {showVectorLayer && <VectorLayer source={vectorSource} zIndex={0} />}
        </Layers>
      </CityMap>
      <MapOptions
        city={city}
        zoom={zoom}
        showVectorLayer={showVectorLayer}
        setShowVectorLayer={setShowVectorLayer}
        resetCenter={resetCenter}
      />
    </div>
  );
}

export default MapDisplay;
