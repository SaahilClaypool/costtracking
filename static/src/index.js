import render_plotly_graphs from './plotly_graph.js';
import render_d3_plot from './d3_graph.js';
function main() {
    // graphs;
    // ids;
    // layouts;
    // raw_data;
    if (document.location.toString().match('d3')) {
        render_d3_plot(raw_data);
    } else {
        if (ids && graphs && layouts) {
            render_plotly_graphs(ids, graphs, layouts);
        }
    }
}

window.onload = main