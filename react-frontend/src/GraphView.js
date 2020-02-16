import React from 'react';
import PropTypes from 'prop-types';

function parseMonth(datum) {
    return parseInt(datum.Date.split('/')[0])
}

function parseDay(datum) {
    return parseInt(datum.Date.split('/')[1])
}


function filterData(data, month) {
    console.log(`parsing month ${month}`)
    return data.filter(d => parseMonth(d) === month + 1)
}

function GraphView(props) {
    return <div className="GraphView">
        <div id="D3View">
            TODO graph view
        </div>
        <p>{props.currentMonth}</p>
        <p>{JSON.stringify(filterData(props.data, props.month))}</p>
    </div >
}

GraphView.propTypes = {
    month: PropTypes.number,
    data: PropTypes.array
}


export default GraphView;