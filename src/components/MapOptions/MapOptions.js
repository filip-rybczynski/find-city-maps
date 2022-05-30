import React from 'react';
import './map-options.scss';

function MapOptions ({city, resetCenter}) {
return (
    <div>
        <button onClick={resetCenter}>Back to {city.name}</button>
    </div>
)
}

export default MapOptions;  