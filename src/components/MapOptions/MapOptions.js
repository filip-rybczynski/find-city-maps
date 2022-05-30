import React from 'react';
import './map-options.scss';

function MapOptions ({cityName, resetCenter}) {
return (
    <div>
        <button onClick={resetCenter}>Back to {cityName}</button>
    </div>
)
}

export default MapOptions;  