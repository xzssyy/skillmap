'use client'

import {useEffect, useRef} from "react"
import {forceGraph} from "../utils/d3-force/forceGraph"


export default function SkillHD({data}){
    const svgRef = useRef(null);
    useEffect(() => {
        forceGraph(data, {
                svgEl: svgRef.current,
                nodeId: (d) => d.id,
                nodeGroup: (d) => d.group,
                nodeName: (d) => d.name,
                nodeTitle: (d) => `${d.name}`,
                nodeStrength: -200,
                linkStrokeWidth: (l) => Math.sqrt(l.value),
                height: 600,
            });
        })

    return (
        <svg ref={svgRef} style={{background: "#ddd"}}/>
    )
}

