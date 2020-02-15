var Plotly = require('plotly.js-dist')

export function render_plotly_graphs(ids, graphs, layouts) {
    for (var i in graphs) {
        Plotly.newPlot(ids[i], // the ID of the div, created above
            graphs[i],
            layouts[i]);
    }
}

export default render_plotly_graphs;