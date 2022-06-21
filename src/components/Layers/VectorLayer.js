import {useContext, useEffect} from "react";

import MapContext from "../Map/MapContext";

import OLVectorLayer from "ol/layer/Vector";

const VectorLayer = ({ source, style, zIndex = 0}) => {

    const map = useContext(MapContext);

    useEffect(() => {
        if (!map) return;

        let vectorLayer = new OLVectorLayer({
            source,
            style
        })

        map.addLayer(vectorLayer);

        vectorLayer.setZIndex(zIndex);

        return () => {
            if (map) {
                map.removeLayer(vectorLayer); // removing layers after map unmount
            }
        };

    }, [map, source]) // will rerender each time map changes

}

export default VectorLayer;