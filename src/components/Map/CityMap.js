// React
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

// Components
import MapContext from "./MapContext";

// Styles
import "./city-map.scss";

// Third party
import { Map, View } from "ol";
import { ScaleLine, defaults as defaultControls } from "ol/control";
import "ol/ol.css";

const CityMap = ({
  children,
  center,
  zoom,
  setStateZoom,
  setStateCenter,
  extent,
}) => {
  const mapRef = useRef();

  const [map, setMap] = useState(null);

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
      controls: defaultControls().extend([
        new ScaleLine({
          units: "metric",
        }),
      ]),
      // overlays:[],
      // target: mapRef.current
    };

    // new OpenLayers Map object is created
    let mapObject = new Map(options);

    mapObject.on("moveend", () => {
      setStateZoom(mapObject.getView().getZoom());
      setStateCenter(mapObject.getView().getCenter());
    });

    // attaching the map to the currently chosen element
    mapObject.setTarget(mapRef.current);

    setMap(mapObject);

    // Below disposes of mapObject when component unmounts (doesn't affect updates since mapObject is previously stored as the current state, so setting it as undefined doesn't affect the render). Essentially functions as componentWillUnmount
    return () => mapObject.setTarget(undefined);
  }, []); // no dependencies means that it will only trigger once, when the component is first rendered

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

  // fitting two cities
  useEffect(() => {
    if (!map) return; // no action if there is no current map
    if (!extent) return; // no action if there is no current extent

    const sizePadding = {
      size: map.getSize(),
      padding: [50, 50, 50, 50],
    };

    map.getView().fit(extent, sizePadding);
  }, [extent]);

  return (
    <MapContext.Provider value={map}>
      {/* Passing the ref to the div, so that's where the map will display */}
      {/* tabindex to improve accessibility (map can be panned using arrows and +/- control zoom) */}
      <div ref={mapRef} className="city-map" tabIndex="0">
        {children}
      </div>
    </MapContext.Provider>
  );
};

CityMap.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  center: PropTypes.array,
  zoom: PropTypes.number,
  setStateZoom: PropTypes.func,
  setStateCenter: PropTypes.func,
  extent: PropTypes.array,
};

export default CityMap;
