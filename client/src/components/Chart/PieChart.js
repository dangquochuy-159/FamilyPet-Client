import React from 'react'
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2'

function PieChart({ dataChart }) {
    return (
        <Pie data={dataChart} />
    );
}

export default PieChart;