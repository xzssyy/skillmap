'use client'

import {useEffect, useRef} from "react"
import {createCanvas} from "../../utils/d3-force/flowchartcreate";



export default function FlowChat({data}){
    const svgRef = useRef(null);
    useEffect(() => {
        createCanvas(svgRef);
    })

    return (
        <svg ref={svgRef} style={{background: "#ddd"}}/>
    )
}

