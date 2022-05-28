import {useContext, useEffect} from "react";

import MapContext from "../Map/MapContext";

import OLTileLayer from "ol/layer/Tile";

const TileLayer = ({ source, zIndex = 0}) => {

    const map = useContext(MapContext);

    useEffect(() => {
        if (!map) return;

        let tileLayer = new OLTileLayer({
            source,
            zIndex
        })

        map.addLayer(tileLayer);

        tileLayer.setZIndex(zIndex);

        return () => {
            if (map) {
                map.removeLayer(tileLayer); // removing layers after map unmount
            }
        };

    }, [map]) // will rerender each time map changes

}

export default TileLayer;