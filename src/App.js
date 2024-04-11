import './App.css';
import MapCanvas from "./components/MapCanvas/mapcanvas";
import ToolMenu from "./components/ToolMenu/toolmenu";
import React, {useEffect, useState} from "react";
import defaultData from "./data/SkillHD.json"



export default function App() {

  const styles = {
    display: "flex",
    height: "100%"
  }

    const [data, setData] = useState(defaultData);


    // useEffect(() => {
    //     // 检查本地存储中是否有节点数据
    //     const  localData= localStorage.getItem('data');
    //     if (localData) {
    //         setData(JSON.parse(localData));
    //     }
    // }, []);
    //
    // useEffect(() => {
    //     // 保存节点数据到本地存储
    //     localStorage.setItem('data', JSON.stringify(data));
    // }, [data]);

  return (
      <>
        <h1 style={{"text-align":"center"}}>技能地图</h1>
        <div className="container" style={styles}>
          <MapCanvas data={data}></MapCanvas>
          <ToolMenu></ToolMenu>
        </div>

      </>
  );
}


