import {fromLonLat} from 'ol/proj.js';

import Feature from "ol/Feature.js";
import Point from "ol/geom/Point.js";
import {Style, Icon} from "ol/style.js";

function createMarker (city, isMainCity = true) {

    const marker = new Feature({
        type: 'icon',
        name: city.name,
        geometry: new Point(fromLonLat([city.longitude, city.latitude])),
    });

    marker.setStyle(
        new Style({
            image: new Icon({
                src: isMainCity
                    ? 'http://maps.google.com/mapfiles/kml/paddle/grn-stars.png'
                    : 'http://maps.google.com/mapfiles/kml/paddle/wht-circle.png',
                anchor: [0.5, 1],
                scale: 0.5
            })
        })
    )

    return marker;
    
}

export default createMarker;