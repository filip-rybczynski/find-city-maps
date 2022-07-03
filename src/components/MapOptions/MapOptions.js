import React from "react";
import "./map-options.scss";

function MapOptions({
  city,
  zoom,
  resetCenter,
  showVectorLayer,
  setShowVectorLayer,
}) {
  return (
    <div>
      <fieldset>
        <legend>Center map back on {city.name}</legend>

        <button
          onClick={() => {
            resetCenter(zoom);
          }}
        >
          Preserve zoom
        </button>
        <button
          onClick={() => {
            resetCenter();
          }}
        >
          Reset zoom
        </button>
      </fieldset>
      <label>
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

export default MapOptions;
