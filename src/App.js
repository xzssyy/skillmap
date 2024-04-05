import './App.css';
import MapCanvas from "./components/MapCanvas/mapcanvas";
import ToolMenu from "./components/ToolMenu/toolmenu";
import React from "react";


export default function App(useRef) {

  const styles = {
    display: "flex",
    height: "100%"
  }


  return (
      <>
        <h1 style={{"text-align":"center"}}>技能地图</h1>
        <div className="container" style={styles}>
          <MapCanvas></MapCanvas>
          <ToolMenu></ToolMenu>
        </div>

      </>
  );
}


