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
    const colorUpdate = (idList, data) => {
        if (idList[0] !== null) {
            const r = idList[0].id;
            data[r].color = 'red';
        }
        if (idList[1] !== null) {
            const g = idList[1].id;
            data[g].color = 'green'
        }
        if (idList[2] !== null) {
            const g = idList[1].id;
            data[g].color = color[data[g].group - 1]
        }
        return data;
    }

    return colorUpdate(selectedNodes, nodes);
}

const enterFunc = (enter)=>{
    const g = enter.append("g")
    g.append("circle").attr("fill", d => d.color)
        .attr("stroke", nodeStroke)
        .attr("stroke-opacity", nodeStrokeOpacity)
        .attr("stroke-width", nodeStrokeWidth)
        .attr("r", nodeRadius);

    g.append("text")
        .attr("font-size", 10)
        .attr("text-anchor", "middle")
        .attr("cursor", "default")
        .attr("dx", 0)
        .attr("dy", (d) => nodeRadius / 2 - 5)
        .style("fill", "#000")
        .text((d) => d.name);

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

function click(event,d) {
    // force
    const updateForceSelected = (selectedNodes, d) => [d, selectedNodes[0], selectedNodes[1]];
    selectedNodes = updateForceSelected(selectedNodes, d)

    // react
    const updateList = selectedNodes.map((item) => item !== null ? item.name : item).slice(0, 2)
    updateSelectedNodeFunc(updateList)

    const newNodes = updateClickColor(nodes);
    updateMap(newNodes, links);
}

export function initMap(svgRef, data, updateSelectedNode, isUpdate) {

    updateSelectedNodeFunc = updateSelectedNode;
    nodes = data.nodes;
    links = data.links;


    nodes.forEach(item => {
        item.color = color[item.group - 1]
    })


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

    function zoomed(event) {
        g.attr("transform", event.transform);
    }

    simulation = d3.forceSimulation(nodes)
        .force("charge", d3.forceManyBody().strength(-300))
        .force("link", d3.forceLink(links).distance(100))
        .force("x", d3.forceX(width / 2))
        .force("y", d3.forceY(height / 2))
        .alphaDecay(0.01)
        .on("tick", ticked);

    const link = g.append("g")
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke", "#000")
        .attr("stroke-width", 1.5)
        .attr("class", "line");


    const container = g.append("g")
        .selectAll("g")
        .data(nodes)
        .join(
            enter => enterFunc(enter)
        )
        .attr("class", "con")
        .call(drag(simulation)).on("click", click);

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


export function updateMap(newNodes, newLinks) {

    newNodes.push({"id": 15, "name": "ss", "group": 6, "type": 1})
    //links.push({ "source": 0, "target": 14, "value": 8 })

    const container = d3
        .selectAll(".con")
        .data(newNodes)
        .join(
            enter => {
                const g = enter.append("g")
                g.append("circle").attr("fill", d => d.color)
                    .attr("stroke", nodeStroke)
                    .attr("stroke-opacity", nodeStrokeOpacity)
                    .attr("stroke-width", nodeStrokeWidth)
                    .attr("r", nodeRadius);

                g.append("text")
                    .attr("font-size", 10)
                    .attr("text-anchor", "middle")
                    .attr("cursor", "default")
                    .attr("dx", 0)
                    .attr("dy", (d) => nodeRadius / 2 - 5)
                    .style("fill", "#000")
                    .text((d) => d.name);

                return g;
            },
            update => update,
            exit => exit.remove()
        )
        .attr("class", "con")
        .call(drag(simulation)).on("click", click);


    const link = g.append("g")
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke", "#000")
        .attr("stroke-width", 1.5)
        .attr("class", "line");


    link.exit().remove();
    link.enter()
        .append("line")
        .attr("stroke", "#000")
        .attr("stroke-width", 1.5)
        .merge(link);


    simulation.nodes(newNodes);
    simulation.force("link").links(newLinks);
    // console.log(1)
    simulation.alpha(1).restart();
}





