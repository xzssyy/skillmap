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

    const [selectedNodeList, setSelctedNodeList] = useState([null,null]);


    const updateSelectedNode = (nodeList)=>{
        setSelctedNodeList(nodeList)
    }


    const [data, setData] = useState(defaultData);


    const handClick = ()=>{

    }

    const addNode = (nodeName, group, type) => {

        const newData = {...data};
        const l = newData.nodes.length;
        newData.nodes.push({ "id": l, "name":nodeName, "group": group, "type": type});
        setData(newData);
    }

    const deleteNode = (node) => {
        if(node == null )
            return;

        var nodeId = null;
        if(node.hasOwnProperty("id"))
            nodeId = node.id
        else
            return


        // bug 颜色不同步
        setSelctedNodeList([null, selectedNodeList[1]])



        const newData = {...data};
        const nodes = newData.nodes
        const links = newData.links
        const removeItemById = (data, targetId) => data.filter(item => item.id !== targetId);
        const removeLinkById = (data, tagrgetId) => data.filter(item => item.source.id !== tagrgetId && item.target.id !== tagrgetId)

        newData.nodes = removeItemById(nodes, nodeId)
        newData.links = removeLinkById(links, nodeId)


        setData(newData);
    }

    const addLine = (node1, node2) => {
        if(node1 == null || node2 == null)
            return;
        if(node1.hasOwnProperty("id") && node2.hasOwnProperty("id")){
            const newData = {...data};
            newData.links.push({ "source": node1.id, "target": node2.id, "value": 8 });
            setData(newData);
        }
        return;
    }

    const deleteLine = (node1, node2) => {
        if(node1 == null || node2 == null)
            return;
        if(node1.hasOwnProperty("id") && node2.hasOwnProperty("id")){
            console.log(1)
            const links = data.links.filter(item => (!(item.source.id === node1.id && item.target.id === node2.id) || (item.source.id === node2.id && item.target.id === node1.id)));
            console.log(links)
            setData({"nodes":data.nodes, "links":links});
        }


    }
    const exportClick = ()=> {
            var textBoxDiv = document.getElementById("editableTextBox");
            textBoxDiv.style.display ="block";

    }
    function saveText() {
        var textBox = document.getElementById("textBox");
        var newText = textBox.value;
        // 这里可以添加保存文本的逻辑，比如将 newText 发送到服务器或者本地存储
        console.log("保存的文本内容:", newText);
        // 保存后隐藏文本框
        var textBoxDiv = document.getElementById("editableTextBox");
        textBoxDiv.classList.add("hidden");
    }

    return (
        <>
            <h1 style={{"text-align": "center"}}>技能地图</h1>
            <button onClick={exportClick}>导出数据</button>
            <div className="container" style={styles}>
                <MapCanvas data={data} addNode={addNode} deleteNode={deleteNode} selectedNodeList={selectedNodeList}
                           updateSelectedNode={updateSelectedNode}
                           addLine={addLine}
                           deleteLine={deleteLine}
                ></MapCanvas>
                <ToolMenu addNode={addNode}></ToolMenu>

            </div>
            <div id="editableTextBox" className="hidden" style={{display: "none"}}>
                <input type="text" id="textBox" value={JSON.stringify(data)}/>
                <button onClick={saveText}>请ctrl+A全选粘贴到问卷</button>
            </div>
        </>
    );
}


