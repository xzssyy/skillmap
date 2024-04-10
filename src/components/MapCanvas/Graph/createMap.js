import * as d3 from "d3";
import {selectNode} from "../utilis";



export function createMap(svgRef, mapData, updateSelectedNode) {


    console.log(mapData);
    const width = 1200;
    const height = 600;
    const svg = d3
        .select(svgRef)
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "border:solid black");

    const data = mapData;



    ForceGraph(data, {
        nodeId: d => d.id, nodeGroup: d => d.group, nodeTitle: d => d.name, linkStrokeWidth: l => Math.sqrt(l.value),
    })

    function ForceGraph({nodes, links}, {
        nodeId = d => d.id, // given d in nodes, returns a unique identifier (string)
        nodeGroup, // given d in nodes, returns an (ordinal) value for color
        nodeGroups, // an array of ordinal values representing the node groups
        nodeTitle, // given d in nodes, a title string
        nodeFill = "currentColor", // node stroke fill (if not using a group color encoding)
        nodeStroke = "#fff", // node stroke color
        nodeStrokeWidth = 1.5, // node stroke width, in pixels
        nodeStrokeOpacity = 1, // node stroke opacity
        nodeRadius = 20, // node radius, in pixels
        nodeStrength, linkSource = ({source}) => source, // given d in links, returns a node identifier string
        linkTarget = ({target}) => target, // given d in links, returns a node identifier string
        linkStroke = "#999", // link stroke color
        linkStrokeOpacity = 0.6, // link stroke opacity
        linkStrokeWidth = 1.5, // given d in links, returns a stroke width in pixels
        linkStrokeLinecap = "round", // link stroke linecap
        linkStrength, colors = d3.schemeRdGy[6], // an array of color strings, for the node groups
    } = {}) {


        const N = d3.map(nodes, nodeId).map(intern);
        const LS = d3.map(links, linkSource).map(intern);
        const LT = d3.map(links, linkTarget).map(intern);

        if (nodeTitle === undefined) nodeTitle = (_, i) => N[i];

        const T = nodeTitle == null ? null : d3.map(nodes, nodeTitle);
        const G = nodeGroup == null ? null : d3.map(nodes, nodeGroup).map(intern);
        const W = typeof linkStrokeWidth !== 'function' ? null : d3.map(links, linkStrokeWidth);
        const L = typeof linkStroke !== "function" ? null : d3.map(links, linkStroke);


        nodes = d3.map(nodes, (_, i) => ({id: N[i], group: G[i], name: T[i]}));
        links = d3.map(links, (_, i) => ({source: LS[i], target: LT[i]}));

        // default group
        if (G && nodeGroups === undefined) nodeGroups = d3.sort(G);

        const color = nodeGroup == null ? null : d3.scaleOrdinal(nodeGroups, colors);

        //Construct the forces
        const forceNode = d3.forceManyBody().strength(-200);


        const forceLink = d3.forceLink(links)
            .id(({index: i}) => N[i])
            .distance(() => 50);


        if (nodeStrength !== undefined) forceNode.strength(nodeStrength);
        if (linkStrength !== undefined) forceLink.strength(linkStrength);

        const simulation = d3.forceSimulation(nodes)
            .force("link", forceLink)
            .force("charge", forceNode)
            .force("x", d3.forceX(width / 2))
            .force("y", d3.forceY(height / 2));
        // .force("center", d3.forceCenter(width / 2, height / 2));


        simulation.alphaDecay(0.01);


        svg.call(d3.zoom()
            .scaleExtent([1 / 2, 8])
            .on("zoom", zoomed))
            .on("dblclick.zoom", null);

        function zoomed(event) {
            g.attr("transform", event.transform);
        }

        var g = svg.append("g");

        const link = g.append("g")
            .attr("stroke", typeof linkStroke !== "function" ? linkStroke : null)
            .attr("stroke-opacity", linkStrokeOpacity)
            .attr("stroke-width", typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null)
            .attr("stroke-linecap", linkStrokeLinecap)
            .selectAll("line")
            .data(links)
            .join("line");

        const container = g.append("g")
            .selectAll("g")
            .data(nodes)
            .enter()
            .append("g")
            .classed("fixed", d => d.fx !== undefined)
            .call(drag(simulation)).on("click", click);


        // d3.selection.prototype.first = () => d3.selection(this[0][0])
        // d3.selection.prototype.last = () => d3.selection(this[0][this.size() - 1])


        const node = container.append("circle")
            .attr("fill", nodeFill)
            .attr("stroke", nodeStroke)
            .attr("stroke-opacity", nodeStrokeOpacity)
            .attr("stroke-width", nodeStrokeWidth)
            .attr("r", nodeRadius);


        // eslint-disable-next-line no-unused-vars
        const label = container.append("text")
            .attr("font-size", 10)
            .attr("text-anchor", "middle")
            .attr("cursor", "default")
            .attr("dx", 0)
            .attr("dy", (d) => nodeRadius / 2 - 5)
            .style("fill", "#000")
            .text((d) => d.name);


        simulation.on("tick", () => ticked(link, container));

        /*
          function
         */

        if (W) link.attr("stroke-width", ({index: i}) => W[i]);
        if (L) link.attr("stroke", ({index: i}) => L[i]);
        if (G) node.attr("fill", ({index: i}) => color(G[i] + 1));
        if (T) container.append("title").text(({index: i}) => T[i]);

        function intern(value) {
            return value !== null && typeof value === "object" ? value.valueOf() : value;
        }

        function ticked(link, node) {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node.attr("transform", (d) => {
                return "translate(" + d.x + "," + d.y + ")";
            });
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


        // dynamic update function
        function click(event, d) {
            d3.select(this).classed("fixed", true)
                .selectChild("circle")
                .attr("fill", "red");

            selectNode(d);
            updateSelectedNode([1,2])

            simulation.alpha(0.3).restart();
        }





        // function showRing(wrapper, innerRadius) {
        //
        //     // let circleSL = d3.select(wrapper);
        //
        //     function mouseIn(event) {
        //
        //         console.log(links)
        //
        //         const addingSymbol = d3.symbol(d3.symbolCross, 200)();
        //         const removeSymbol = d3.symbol(d3.symbolCross, 200)();
        //
        //
        //         // eslint-disable-next-line no-unused-vars
        //         const addSymbol = wrapper.append("path")
        //             .attr("d", addingSymbol)
        //             .attr("transform", "translate(-30,-30)")
        //             .attr("fill", "black");
        //
        //         // eslint-disable-next-line no-unused-vars
        //         const remoSymble = wrapper.append("path")
        //             .attr("d", removeSymbol)
        //             .attr("transform", "translate(30,30)rotate(45)")
        //             .attr("fill", "black");
        //
        //         /**
        //          * //todo
        //          * 1. add and rm node logic parts
        //          */
        //     }
        //
        //     return wrapper
        //         .on("mouseenter", mouseIn);
        // }


    }


}