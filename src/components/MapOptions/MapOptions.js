import React from 'react';
import './map-options.scss';

function MapOptions ({city, resetCenter, showVectorLayer, setShowVectorLayer}) {
return (
    <div>
        <button onClick={resetCenter}>Back to {city.name}</button>
        <label>
        <input type="checkbox" checked={showVectorLayer} onChange={e => setShowVectorLayer(e.target.checked)} />
        Show markers
        </label>
    </div>
)
}

export default MapOptions;  