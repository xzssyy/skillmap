function addNode(data, nodeName, type, nodeNeighbor, group) {

    let nodeCount = data.nodes.length;
    const nodeId = nodeCount + 1;
    const newNode = {"id": nodeId, "name": nodeName, "group": group, "type": type}
    const newLinks = nodeNeighbor.map(item => {
        return {"source": item, "target": nodeId}
    })


    data.nodes.push(newNode);
    const newData= data.links.concat(newLinks)

    return newData;
}


export function selectNode(node){

    console.log(1);
    return  1;
}



