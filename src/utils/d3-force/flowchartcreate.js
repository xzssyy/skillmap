import * as d3 from "d3"


export function createCanvas(svgRef) {
    const svg = d3.select(svgRef.current)
        .attr("width", 1000)
        .attr("height", 600)
        .attr("viewBox", [0, 0, 1000, 600]);

    const container = svg
        .append("g")
        .attr("cursor", "grab")
        .datum({x:0,y:0})
        .attr("transform", function(d) {
            return 'translate(' + d.x + ' '+ d.y + ')'; })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
    let offSet = 0;

    const node = container.append("rect")
        .attr('width', 80)
        .attr('height', 40)
        .attr('stroke', 'black')
        .attr('fill', '#69a3b2')
        .on("click", (d) => {
            console.log(typeof(d.srcElement.__data__.x));
            svg.append('path')
                .attr('d', d3.line()([[d.srcElement.__data__.x+80+offSet, d.srcElement.__data__.y+20], [d.srcElement.__data__.x+80+50+offSet, d.srcElement.__data__.y+20],]))
                .attr('stroke', 'black')
                .attr('marker-start', 'url(#arrow)')
                .attr('fill', 'none');

            svg.append('rect')
                .attr('width', 80)
                .attr('height', 40)
                .attr('stroke', 'black')
                .attr('fill', '#69a3b2')
                .datum({x:d.srcElement.__data__.x+80+50, y:d.srcElement.__data__.y})
                .attr("x",d.srcElement.__data__.x+80+50+offSet)
                .attr("y",d.srcElement.__data__.y)

            offSet+=130;

        });


    const label = container
        .append("text")
        .text("开始")
        .attr("x", 20)
        .attr("y",25)
        .on("dblclick",(d)=>{
            console.log(d.srcElement.__data__);
        });


    function dragstarted() {
        d3.select(this).raise();
    }

    function dragged(event, d) {
        d.x += event.dx;
        d.y += event.dy;

        d3.select(this).attr("transform", function(d,i){
            return "translate(" + [ d.x,d.y ] + ")"
        });}

    function dragended() {
        d3.select(this);
    }

}

