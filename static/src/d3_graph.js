let d3 = require('d3')

let size = 600;
let padding = 50;
let squareOffset = padding / 2 + 0.5;
let height = size - padding;
let width = size - padding;


function xAxis() {
    const axis = d3.axisBottom()
        .ticks(6);
}

function yAxis() {
    const axis = d3.axisBottom()
        .ticks(6);
}


// @raw_data: json object which is entire data frame
function render_d3_plot(raw_data) {

    raw_data = raw_data.map(d => {
        let vals = d.Date.split('/');
        return {
            ...d,
            month: parseInt[0],
            day: parseInt(vals[1]),
            year: parseInt(vals[2]),
        }
    })

    const svg = d3.select("#d3container")
    console.log("locals: ", squareOffset, width, d3.extent(raw_data, d => d.day))

    let xScale = d3.scaleLinear()
        .domain(d3.extent(raw_data, d => d.day))
        .range([squareOffset, width + squareOffset]);
    let x = d => xScale(d.day)

    let yScale = d3.scaleLinear()
        .domain(d3.extent(raw_data, d => d.Cost))
        .range([height, squareOffset]);
    let y = d => yScale(d.Cost)

    let randX = () => xScale(d3.randomUniform(...d3.extent(raw_data, d => d.day))())
    let randY = () => yScale(d3.randomUniform(...d3.extent(raw_data, d => d.Cost))())

    console.log(`randx : ${d3.randomUniform(...d3.extent(raw_data, d => d.day))()}`)

    let rScale = d3.scaleLinear()
        .domain(d3.extent(raw_data, d => d.Cost))
        .range([3.0, 10])
    let r = d => rScale(d.Cost);

    raw_data.forEach((v) => {
        let cost = v.Cost
    });

    svg.append("rect")
        .attr("fill", "none")
        .attr("stroke", "#aaa")
        .attr("x", squareOffset)
        .attr("y", squareOffset)
        .attr("width", width)
        .attr("height", height);

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);


    let points = svg.selectAll('.points')
        .data(raw_data);
    points
        .enter()
            .append('circle')
            .attr('class', 'points')
            .attr('fill', 'red')
            .attr('r', 1)
            .attr('cx', randX)
            .attr('cy', randY)
        .transition(d3.transition()
                .duration(750)
                .ease(d3.easeLinear))
            .attr('r', r)
            .attr('cx', x)
            .attr('cy', y);
}

export default render_d3_plot;


/*
{
  const svg = d3.select(DOM.svg(width, width))
      .attr("viewBox", `${-padding} 0 ${width} ${width}`)
      .style("max-width", "100%")
      .style("height", "auto");

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  const cell = svg.append("g")
    .selectAll("g")
    .data(d3.cross(d3.range(columns.length), d3.range(columns.length)))
    .join("g")
      .attr("transform", ([i, j]) => `translate(${i * size},${j * size})`);

  cell.append("rect")
      .attr("fill", "none")
      .attr("stroke", "#aaa")
      .attr("x", padding / 2 + 0.5)
      .attr("y", padding / 2 + 0.5)
      .attr("width", size - padding)
      .attr("height", size - padding);

  cell.each(function([i, j]) {
    d3.select(this).selectAll("circle")
      .data(data)
      .join("circle")
        .attr("cx", d => x[i](d[columns[i]]))
        .attr("cy", d => y[j](d[columns[j]]));
  });

  const circle = cell.selectAll("circle")
      .attr("r", 3.5)
      .attr("fill-opacity", 0.7)
      .attr("fill", d => z(d.species));

  svg.append("g")
      .style("font", "bold 10px sans-serif")
    .selectAll("text")
    .data(columns)
    .join("text")
      .attr("transform", (d, i) => `translate(${i * size},${i * size})`)
      .attr("x", padding)
      .attr("y", padding)
      .attr("dy", ".71em")
      .text(d => d);

  return svg.node();
}
x = columns.map(c => d3.scaleLinear()
    .domain(d3.extent(data, d => d[c]))
    .rangeRound([padding / 2, size - padding / 2]))
y = x.map(x => x.copy().range([size - padding / 2, padding / 2]))
z = d3.scaleOrdinal()
    .domain(data.map(d => d.species))
    .range(d3.schemeCategory10)

xAxis = {
  const axis = d3.axisBottom()
      .ticks(6)
      .tickSize(size * columns.length);
  return g => g.selectAll("g").data(x).join("g")
      .attr("transform", (d, i) => `translate(${i * size},0)`)
      .each(function(d) { return d3.select(this).call(axis.scale(d)); })
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", "#ddd"));
}

yAxis = {
  const axis = d3.axisLeft()
      .ticks(6)
      .tickSize(-size * columns.length);
  return g => g.selectAll("g").data(y).join("g")
      .attr("transform", (d, i) => `translate(0,${i * size})`)
      .each(function(d) { return d3.select(this).call(axis.scale(d)); })
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", "#ddd"));
}

columns = data.columns.filter(d => d !== "species")
width = 954
size = (width - (columns.length + 1) * padding) / columns.length + padding
padding = 20
d3 = require("d3@5")
import {swatches} from "@d3/color-legend"
*/