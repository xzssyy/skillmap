'use client'

import React, {useEffect, useRef, useState} from "react"
import NodeCreator from "./SchemaNodeCreator/creator";
import Graph from "./Graph/graph";


export default function MapCanvas(props){


    // console.log(1);

    const data = props.data;
    const updateSelectedNode = props.updateSelectedNode
    const selectedNodeList = props.selectedNodeList

    const styles= {
        flex:"1",
        height:"auto",
        maxWidth:"100%"
    }

    // data for control list




    return (

        <div className={"svgBox"} style={styles}>
            <Graph data={data} updateSelectedNode={updateSelectedNode}></Graph>
            <NodeCreator selectedNode={selectedNodeList} {...props} ></NodeCreator>

        </div>
    )
}

