import React, {memo, useEffect, useRef,} from "react";
import {initMap, updateMap} from "./createMap";
import * as d3 from "d3";


const Graph = memo((props) => {

        const data = props.data;
        const color = d3.schemePastel2;
        data.nodes.forEach(item => {
            item.color = item.color == "green" || item.color == "red" ? item.color : color[item.group - 1]
        })


        const svgRef = useRef(null);


        useEffect(() => {
            initMap(svgRef.current, data, props.updateSelectedNode);
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