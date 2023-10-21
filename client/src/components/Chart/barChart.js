import { Bar } from 'react-chartjs-2'
import 'chart.js/auto';

const BarChart = ({ dataChart }) => {
    return (
        <Bar data={dataChart} />
    )
}

export default BarChart