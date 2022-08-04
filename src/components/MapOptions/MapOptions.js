// React
import React from "react";
import PropTypes from "prop-types";

// styles
import "./map-options.scss";

// values
import { DEFAULT_ZOOM } from "../../constants";

// 3rd party
import { fromLonLat } from "ol/proj.js";

function MapOptions({
  city,
  zoom,
  setZoom,
  center,
  resetCenter,
  showVectorLayer,
  setShowVectorLayer,
}) {
  const originalCenter = fromLonLat([city.longitude, city.latitude]);

  return (
    <div className="map-options">
      <fieldset className="map-options__center">
        <legend>Center map back on {city.name}</legend>

        <button
          disabled={
            center.every((coord, i) => coord === originalCenter[i]) // check if center is the same as the original center (coordinates of the city being displayed)
          }
          onClick={() => {
            resetCenter(zoom);
          }}
        >
          Current zoom
        </button>
        <button
          disabled={zoom === DEFAULT_ZOOM}
          onClick={() => {
            resetCenter();
          }}
        >
          Default zoom
        </button>
      </fieldset>
      <button
        className="map-options__zoom-reset"
        disabled={zoom === DEFAULT_ZOOM}
        onClick={() => {
          setZoom(DEFAULT_ZOOM);
        }}
      >
        Reset zoom
      </button>
      <label className="map-options__markers">
        <input
          type="checkbox"
          checked={showVectorLayer}
          onChange={(e) => setShowVectorLayer(e.target.checked)}
        />
        Show markers
      </label>
    </div>
  );
}

MapOptions.propTypes = {
  city: PropTypes.object,
  zoom: PropTypes.number,
  setZoom: PropTypes.func,
  center: PropTypes.array,
  resetCenter: PropTypes.func,
  showVectorLayer: PropTypes.bool,
  setShowVectorLayer: PropTypes.func,
};

export default MapOptions;
