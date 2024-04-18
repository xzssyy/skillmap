import './App.css';
import MapCanvas from "./components/MapCanvas/mapcanvas";
import ToolMenu from "./components/ToolMenu/toolmenu";
import React, {useEffect, useState} from "react";
import defaultData from "./data/SkillHD.json"


export default function App() {

    const styles = {
        display: "flex",
        justifyContent:"space-between"
    }

    const [data, setData] = useState(defaultData);

    const [isUpdate, setIsUpdate] = useState(false)


    const  addResource = ()=>{
        const newData = {...data};
        newData.nodes[0].name = "lalal"
        setData(newData);
        setIsUpdate(true);
    }


    return (
        <>
            <h1 style={{"text-align": "center"}}>技能地图</h1>
            <button onClick={addResource}>dsdsd</button>
            <div className="container" style={styles}>
                <MapCanvas data={data} isUpdate={isUpdate}></MapCanvas>
                <ToolMenu></ToolMenu>
            </div>

        </>
    );
}


