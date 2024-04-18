import React, {memo, useEffect, useRef,} from "react";
import {initMap, updateMap} from "./createMap";


const Graph = memo((props) => {

        const data = props.data;
        const isUpdate = props.isUpdate;


        const svgRef = useRef(null);


        useEffect(() => {
            initMap(svgRef.current, data, props.updateSelectedNode, isUpdate);
        }, [])

        useEffect(() => {
                updateMap(data.nodes, data.links)
        }, [data])


        return (
            <svg ref={svgRef} style={{background: "white", border: "solid black"}}/>

        );
    }
);

export default Graph;