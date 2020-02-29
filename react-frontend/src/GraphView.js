import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const MARGIN = { left: 200, right: 20, top: 40, bottom: 100 };
const WIDTH = 400;
const HEIGHT = 400;

let isCummulative = true;

// https://medium.com/@jeffbutsch/using-d3-in-react-with-hooks-4a6c61f1d102

function parseDay(datum) {
    return parseInt(datum.Date.split('/')[1])
}

function updateGraph(data, d3Node) {
    // TODO: Add total spending if cum

    var div = d3.select(".tooltip");
    let xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.day))
        .range([0, WIDTH]);
    let x = d => xScale(d.day)

    let yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => (isCummulative ? d.totalCost : d.Cost)))
        .range([HEIGHT, 0]);
    let y = d => yScale(isCummulative ? d.totalCost : d.Cost)

    let [minX, maxX] = d3.extent(data, d => d.day);
    let randX = () => xScale(d3.randomUniform(minX - maxX, maxX * 2)())
    let [minY, maxY] = d3.extent(data, d => d.Cost);
    let randY = () => yScale(d3.randomUniform(minY - maxY, maxY * 2)())

    let rScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.Cost))
        .range([4.0, 10])
    let r = (d) => rScale(d.Cost);

    let colorScale = d3.scaleOrdinal(d3.schemeDark2  );
    let opacity = (d) => (d && d.Personal) ? '77' : 'cc';
    let color = (d) => colorScale(d.Who) + opacity(d);

    const svg = d3.select(d3Node.current);
    const content = svg.select('g');
    const xAxis = content.selectAll('#xAxis')
        .transition(500)
        .call(d3.axisBottom(xScale));
    const yAxis = content.selectAll('#yAxis')
        .transition(500)
        .call(d3.axisLeft(yScale));
    const points = content.selectAll('circle').data(data);

    console.log(`drawing ${data.length} points`)

    points.exit()
        .transition()
        .duration(500)
        .attr('fill', '#00000000')
        .remove();

    points.enter()
        .append('circle')
        .attr('fill', color)
        .attr('cx', randX)
        .attr('cy', randY)
        .attr('r', 1)
        .attr('fill', '#000000')
        .on("mouseover", (d) => {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html((
                `\
                <strong>${d.Who}</strong><span>${d.Personal ? '  (Personal)' : ''}</span>\
                <hr/>
                <p>${(d.What ? d.What : "Misc")}</p>
                `
            ))
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 65) + "px");
        })
        .on("mouseout", function (d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        })
        .transition()
        .duration(500)
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', r)
        .attr('fill', color);

    points.transition()
        .duration(500)
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', r)
        .attr('fill', color);
}

function initGraph(data, d3Node) {
    let xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.day))
        .range([0, WIDTH]);
    let x = d => xScale(d.day)

    let yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.Cost))
        .range([0, HEIGHT]);
    let y = d => yScale(d.Cost)

    // Define the div for the tooltip
    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    if (data && d3Node.current) {
        const svg = d3.select(d3Node.current);

        const content = svg
            .append('g')
            .attr('transform', `translate(${MARGIN.left}, ${MARGIN.top})`);
        const points = content
            .selectAll('circle')
            .data(data);

        let xAxis = content
            .append('g')
            .attr('transform', `translate(0,${HEIGHT + 10})`)
            .attr('id', 'xAxis')
            .call(d3.axisBottom(xScale));

        content.append('text')
            .attr('x', WIDTH / 2)
            .attr('y', HEIGHT + 50)
            .style("text-anchor", "middle")
            .text('Day of Month')

        let yAxis = content
            .append('g')
            .attr("transform", "translate(-10,0)")
            .attr('id', 'yAxis')
            .call(d3.axisLeft(yScale));

        content.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -80)
            .attr("x", 0 - (HEIGHT / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Cost (USD)");

        updateGraph(data, d3Node);
    }
}

function cleanData(data) {
    if (isCummulative && data) {
        data.sort((a, b) => a.day > b.day)
        let totalCost = {}
        data.forEach((d, i) => {
            if (!(d.Who in totalCost)) {
                totalCost[d.Who] = 0
            }
            totalCost[d.Who] += d.Cost
            d.totalCost = totalCost[d.Who]
            data[i] = d
        })
    }
    return data;
}

function GraphView(props) {

    let d3Node = useRef(null);

    isCummulative = props.isCummulative;

    useEffect(() => {
        initGraph(cleanData(props.data, props.month), d3Node)
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    [])

    useEffect(() => {
        updateGraph(cleanData(props.data, props.month), d3Node)
    })
    return <div className="GraphView">
        <div id="D3View">
            <svg
                id="d3SVG" ref={d3Node}
                width={WIDTH + MARGIN.left + MARGIN.right}
                height={HEIGHT + MARGIN.bottom + MARGIN.top}
            />
        </div>
        <p>{props.currentMonth}</p>
    </div >
}

GraphView.propTypes = {
    month: PropTypes.number,
    data: PropTypes.array,
    isCummulative: PropTypes.bool
};


// D3 functions


export default GraphView;