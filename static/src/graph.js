var Plotly = require('plotly.js-dist')
function render_graphs() {
    for (var i in graphs) {
        Plotly.newPlot(ids[i], // the ID of the div, created above
            graphs[i],
            layouts[i]);
    }
}

export default render_graphs;