'use client'

import React, {useEffect, useRef, useState} from "react"
import NodeCreator from "./SchemaNodeCreator/creator";
import Graph from "./Graph/graph";


export default function MapCanvas(props){




    const data = props.data;
    // data for control list
    const [selectedNodeList, setSelctedNodeList] = useState(["未选中","未选中"]);


    const styles= {
        flex:"1"
    }

    const updateSelectedNode = (nodeList)=>{
        setSelctedNodeList(nodeList)
    }



    return (
        <div className={"svgBox"} style={styles}>
            <Graph data={data} updateSelectedNode={updateSelectedNode}></Graph>
            <NodeCreator selectedNode={selectedNodeList}></NodeCreator>
        </div>
    )
}


const controller = ()=>{

}
