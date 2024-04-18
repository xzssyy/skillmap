export const addNode = (nodeName, nodes, group) =>{
    const l = nodes.length;
    nodes.push({ "id": l, "name":nodeName, "group": 6,"type": 1})

    return nodes;
}