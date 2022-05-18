import React, { useEffect } from "react";
import "./map.scss";
import MapContext from "./MapContext";
import * as ol from "ol";
// import OLTileLayer from "ol/layer/Tile"; // a way to access directly. Otherwise, it's ol.layer.Tile

const Map = ({ children, center, zoom }) => {

  console.dir(ol);
  const mapRef = useRef();

  const [map, setMap] = useState(null);

  // the default projection for OpenLayers is the Spherical Mercator projection, for which we need to perform a conversion from longitude and latitude values received from props
  const centerMercCoords = ol.proj.fromLonLat(center);

  // any useEffect function runs each time an update happens to the React component

  // on component mount
  useEffect(() => {
    // Creating layer to use in map object

    // options for mapObject creation
    let options = {
      // The view allows to specify the center, resolution, and rotation of the map
      view: new ol.View({ zoom, centerMercCoords }),
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
      ],
      controls: [],
      // overlays:[],
      // target: mapRef.current
    };

    // new OpenLayers Map object is created
    let mapObject = new ol.Map(options);

    // attaching the map to the currently chosen element
    mapObject.setTarget(mapRef.current);

    setMap(mapObject);

    // Below disposes of mapObject when component unmounts (doesn't affect updates since mapObject is previously stored as the current state, so setting it as undefined doesn't affect the render)
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

    map.getView().setCenter(centerMercCoords);
  }, [centerMercCoords]);

  return (
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef} className="map">
        {children}
      </div>
    </MapContext.Provider>
  );
};

export default Map;
