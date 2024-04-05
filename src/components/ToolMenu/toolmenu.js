
import ResourceList from "./ResourceList/resourcelist";
import React from "react";

export default function ToolMenu(){

    const styles = {
       flex:"1",
        textAlign:"center",
        margin: "1px"
    }

    const treeData = [
        {
            id: 1,
            name: 'Node 1',
            children: [
                {
                    id: 2,
                    name: 'Node 1.1',
                    children: [
                        { id: 3, name: 'Node 1.1.1' },
                        { id: 4, name: 'Node 1.1.2' }
                    ]
                },
                { id: 5, name: 'Node 1.2' }
            ]
        },
        {
            id: 6,
            name: 'Node 2',
            children: [
                { id: 7, name: 'Node 2.1' },
                { id: 8, name: 'Node 2.2' }
            ]
        }
    ];


    return (
        <div className= "Menu" style={styles}>
            <h1>资源库</h1>
            <ResourceList data={treeData}></ResourceList>
        </div>
    )

}