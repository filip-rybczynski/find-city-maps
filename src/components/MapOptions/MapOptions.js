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
          center.every((coord, i ) => coord === originalCenter[i] ) // check if center is the same as the original center (coordinates of the city being displayed)
        }
          onClick={() => {
            resetCenter(zoom);
          }}
        >
          Preserve current zoom
        </button>
        <button
        disabled={zoom === DEFAULT_ZOOM}
          onClick={() => {
            resetCenter();
          }}
        >
          Reset zoom
        </button>
      </fieldset>
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
  center: PropTypes.array,
  resetCenter: PropTypes.func,
  showVectorLayer: PropTypes.bool,
  setShowVectorLayer: PropTypes.func,
};

export default MapOptions;
