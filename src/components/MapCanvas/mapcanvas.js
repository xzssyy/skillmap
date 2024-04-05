'use client'

import React, {useEffect, useRef} from "react"
import {createMap} from "./createMap"


export default function MapCanvas({data}){

    const styles= {
        flex:"1"
    }
    const svgRef = useRef(null);
    useEffect(() => {
        createMap(svgRef.current);
    })

    return (
        <div className={"svgBox"} style={styles}>
        <svg ref={svgRef} style={{background: "white", border:"solid black"}}/>
        </div>
    )
}

