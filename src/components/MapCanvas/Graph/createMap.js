import * as d3 from "d3";

const width = 1200;
const height = 600;

var nodes = null;
var links = null;

const color = d3.schemePastel2;
const nodeStroke = "#fff";
const nodeStrokeWidth = 1.5;
const nodeStrokeOpacity = 1;
const nodeRadius = 20;

var selectedNodes = [null, null, null];
var updateSelectedNodeFunc = null;

var simulation = null;

var g = null;


function updateClickColor(nodes) {

    const updater = (idToUpdate, c,data)=>{
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === idToUpdate) {
                // 更新属性
                data[i].color = c === null ? color[data[i].group-1] :c;
                break;
            }
        }

        return data
    }

    const colorUpdate = (idList, data) => {
        if (idList[0] !== null) {
            const r = idList[0].id;
            data = updater(r, "red", data);
        }
        if (idList[1] !== null) {
            let g = idList[1].id;
            data = updater(g, "green", data);
        }
        if (idList[2] !== null) {
            let b = idList[2].id;
            data = updater(b, null, data);
        }
        return data;
    }

    return colorUpdate(selectedNodes, nodes);
}

const enterFunc = (enter) => {

    const g = enter.append("g")

    if (enter.size() == 0) return
    const type = g.datum().type;

    if (type == 1) {
        g.append("circle").attr("fill", d => d.color)
            .attr("stroke", nodeStroke)
            .attr("stroke-opacity", nodeStrokeOpacity)
            .attr("stroke-width", nodeStrokeWidth)
            .attr("r", nodeRadius)
            .attr("class", "nodes");

        g.append("text")
            .attr("font-size", 10)
            .attr("text-anchor", "middle")
            .attr("cursor", "default")
            .attr("dx", 0)
            .attr("dy", (d) => nodeRadius / 2 - 5)
            .style("fill", "#000")
            .text((d) => d.name);

    } else if (type == 2) {
        g.append("rect").attr("fill", d => d.color)
            .attr("stroke", "black")
            .attr("stroke-opacity", nodeStrokeOpacity)
            .attr("stroke-width", nodeStrokeWidth)
            .attr("width", 60)
            .attr("height", 30)
            .attr("transform","translate(-30,-15)")
            .attr("class", "nodes");


        g.append("text")
            .attr("font-size", 10)
            .attr("text-anchor", "middle")
            .attr("cursor", "default")
            // .attr("dx", 30)
            // .attr("dy", (d) => 15)
            .style("fill", "#000")
            .text((d) => d.name);
    } else {
        const symbolGenerator = d3.symbol()
            .type(d3.symbolTriangle)
            .size(1000);

        g.append("path")
            .attr("d", symbolGenerator)
            .attr("fill", d => d.color)
            .attr("stroke", nodeStroke)
            .attr("stroke-opacity", nodeStrokeOpacity)
            .attr("stroke-width", nodeStrokeWidth)
            .attr("class", "nodes");

        g.append("text")
            .attr("font-size", 10)
            .attr("text-anchor", "middle")
            .attr("cursor", "default")
            .attr("dx", 0)
            .attr("dy", (d) => 0)
            .style("fill", "#000")
            .text((d) => d.name);

    }


    return g;
}

function drag(simulation) {
    function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
        simulation.alpha(1).restart();
    }

    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
}

function click(event, d) {
    // force


    const updateForceSelected = (selectedNodes, d) => [d, selectedNodes[0], selectedNodes[1]];
    selectedNodes = updateForceSelected(selectedNodes, d)

    // react
    const updateList = selectedNodes.slice(0, 2);
    // console.log(updateList)
    updateSelectedNodeFunc(updateList)



    const newNodes = updateClickColor(nodes);


    // console.log(newNodes);

    updateMap(nodes, links);
}

export function initMap(svgRef, data, updateSelectedNode, isUpdate) {

    updateSelectedNodeFunc = updateSelectedNode;
    nodes = data.nodes;
    links = data.links;


    const svg = d3.select(svgRef)
        .attr("width", "100%")
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "border:solid black");

    svg.call(d3.zoom()
        .scaleExtent([1, 10])
        .on("zoom", zoomed))
        .on("dblclick.zoom", null);

    g = svg.append("g");

    // console.log(nodes);

    function zoomed(event) {
        g.attr("transform", event.transform);
    }

    simulation = d3.forceSimulation(nodes)
        .force("charge", d3.forceManyBody().strength(-300))
        .force("link", d3.forceLink(links).distance(100))
        .force("x", d3.forceX(width / 2))
        .force("y", d3.forceY(height / 2))
        .alphaDecay(0.01)
    ;

    const link = g.append("g")
        .attr("class", "lines")


    const container = g.append("g")
        .attr("class", "containers");
}


export function updateMap(newNodes, newLinks) {

    //newNodes.push({"id": 15, "name": "ss", "group": 6, "type": 1})
    //links.push({ "source": 0, "target": 14, "value": 8 })


    // console.log(newNodes);

    nodes = newNodes;
    links = newLinks;


    var container = d3.select(".containers").selectAll(".con")
        .data(nodes, d => d.id)
        .join(
            enter => {

                return enterFunc(enter)

            },
            update => {
                // console.log(update)
                return update.selectAll(".nodes")
                    .attr("fill", d => d.color)
            },
            exit => {
                // console.log(exit)
                return exit.remove()
            }
        )

    container = d3.select(".containers").selectAll("g")
        .attr("class", "con")
        .call(drag(simulation)).on("click", click);


    var link = d3.select(".lines").selectAll(".line")
        .data(links)
        .join(
            enter => {
                enter.append("line")
            },
            update => update,
            exit => exit.remove()
        )

    link = d3.select(".lines").selectAll("line")
        .attr("stroke", "#000")
        .attr("stroke-width", 1.5)
        .attr("class", "line");


    simulation.nodes(nodes);
    simulation.force("link").links(links);
    simulation.on("tick", ticked);
    // console.log(1)
    simulation.alpha(1).restart();

    function ticked() {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        container.attr("transform", (d) => {
            return "translate(" + d.x + "," + d.y + ")";
        });
    }
}





