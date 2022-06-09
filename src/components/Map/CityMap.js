import React, { useState, useEffect, useRef } from "react";
import "./city-map.scss";
import MapContext from "./MapContext";

import {Map, View} from "ol";
import {ScaleLine, defaults as defaultControls} from 'ol/control';
import 'ol/ol.css';

// import OSM from 'ol/source/OSM.js';
// import TileLayer from "ol/layer/Tile";

// import OLTileLayer from "ol/layer/Tile"; // a way to access directly. Otherwise, it's ol.layer.Tile

const CityMap = ({ children, center, zoom, setStateZoom, setStateCenter}) => {

  const mapRef = useRef();

  const [map, setMap] = useState(null);

  // function scaleControl() {
  //   if (scaleType === 'scaleline') {
  //     control = new ScaleLine({
  //       units: unitsSelect.value,
  //     });
  //     return control;
  //   }
  //   control = new ScaleLine({
  //     units: unitsSelect.value,
  //     bar: true,
  //     steps: scaleBarSteps,
  //     text: scaleBarText,
  //     minWidth: 140,
  //   });
  //   return control;
  // }

  // any useEffect function runs each time an update happens to the React component

  // on component mount
  useEffect(() => {
    // Creating layer to use in map object
    // options for mapObject creation
    let options = {
      // The view allows to specify the center, resolution, and rotation of the map
      view: new View({ center, zoom }),
      layers: [
        // new TileLayer({
        //   source: new OSM(),
        // }),
      ],
      controls: defaultControls().extend([new ScaleLine({
        units: "metric",
      })]),
      // overlays:[],
      // target: mapRef.current
    };

    // new OpenLayers Map object is created
    let mapObject = new Map(options);

    mapObject.on('moveend',() => {
      setStateZoom(mapObject.getView().getZoom());
      setStateCenter(mapObject.getView().getCenter());
    })

    // attaching the map to the currently chosen element
    mapObject.setTarget(mapRef.current);

    setMap(mapObject);

    // Below disposes of mapObject when component unmounts (doesn't affect updates since mapObject is previously stored as the current state, so setting it as undefined doesn't affect the render). Essentially functions as componentWillUnmount
    return () => mapObject.setTarget(undefined);
  }, []); // no dependencies so will update every time component is updated

  // setting zoom
  useEffect(() => {
    if (!map) return; // no action if there is no current map

    map.getView().setZoom(zoom);
  }, [zoom]);

  // handling center change
  useEffect(() => {
    if (!map) return; // no action if there is no current map

    map.getView().setCenter(center);
  }, [center]);

  return (
    <MapContext.Provider value={ map }> 
    {/* Passing the ref to the div, so that's where the map will display */}
    {/* tabindex to improve accessibility (map can be panned using arrows and +/- control zoom) */}
      <div ref={mapRef} className="city-map" tabIndex="0"> 
        {children}
      </div>
    </MapContext.Provider>
  );
};

export default CityMap;
