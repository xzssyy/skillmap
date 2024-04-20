import './App.css';
import MapCanvas from "./components/MapCanvas/mapcanvas";
import ToolMenu from "./components/ToolMenu/toolmenu";
import React, {useEffect, useState} from "react";
import defaultData from "./data/SkillHD.json"


export default function App() {

    const styles = {
        display: "flex",
        justifyContent: "space-between"
    }

    const [data, setData] = useState(defaultData);


    const handClick = ()=>{
        const newData = {...data}
        newData.nodes[0].name = "dsada"
        setData(newData)
    }

    const addNode = (nodeName, group, type) => {
        const newData = {...data};
        const l = newData.nodes.length;
        newData.nodes.push({ "id": l, "name":nodeName, "group": group, "type": type});
        setData(newData);
    }

    const deleteNode = (nodeId) => {
        const removeItemById = (data, targetId) => data.filter(item => item.id !== targetId);
        setData(removeItemById(data));
    }

    const addLine = () => {
        const newData = {...data};
        newData.links.push({ "source": 0, "target": 14, "value": 8 });
        setData(newData);
    }

    const deleteLine = () => {

    }


    return (
        <>
            <h1 style={{"text-align": "center"}}>技能地图</h1>
            <button onClick={handClick} >dsdsd</button>
            <div className="container" style={styles}>
                <MapCanvas data={data} addNode={addNode}></MapCanvas>
                <ToolMenu addNode={addNode}></ToolMenu>
            </div>
        </>
    );
}


