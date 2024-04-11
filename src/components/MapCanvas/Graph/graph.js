import React, {memo, useEffect, useRef,} from "react";
import {createMap} from "./createMap";


const Graph = memo((props) => {

        const data = props.data;


        const svgRef = useRef(null);


        useEffect(() => {
            createMap(svgRef.current, data, props.updateSelectedNode);
        },[])
        return (
            <svg ref={svgRef} style={{background: "white", border: "solid black"}}/>
        );
    }
);

export default Graph;