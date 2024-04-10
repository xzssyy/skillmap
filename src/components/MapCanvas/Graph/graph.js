import React, {memo, useEffect, useRef,} from "react";
import {createMap} from "./createMap";


const Graph = memo((props) => {

        const data = props.data;
        console.log(props);

        const svgRef = useRef(null);


        useEffect(() => {
            createMap(svgRef.current, data, props.updateSelectedNode);
        },[data])
        return (
            <svg ref={svgRef} style={{background: "white", border: "solid black"}}/>
        );
    }
);

export default Graph;