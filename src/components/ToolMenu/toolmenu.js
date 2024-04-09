import data from "../../data/resource.json"
import ResourceList from "./ResourceList/resourcelist";
import React, {useState} from "react";
import FileList from "./FIleList/filelist";

export default function ToolMenu() {

    const [selectedItem, setSelectedItem] = useState(null);



    /* resource data
        store in public
     */
    const [resouceData, setResourceData] = useState(new Array(10).fill(null))

    const handleItemClick = (node) => {
        setSelectedItem(node);
        // console.log(node);
    }

    const styles = {
        flex: "1",
        marginLeft: 10,
        height: 800,
        border: "solid"
    }


    const wrapperStyles = {
        position:"relative",
        height: "80%",
        width:"100%",
        padding:20
    }



    const treeData = data.nodes;
    // const resource = da


    return (
        <div className="Menu" style={styles}>
            <h1 style={{"boder": "solid", "text-align": "center"}}>资源库</h1>
            <div style={wrapperStyles}>
                <ResourceList data={treeData} itemClick={handleItemClick} selectedItem={selectedItem}></ResourceList>
                <FileList></FileList>
            </div>

        </div>
    )

}