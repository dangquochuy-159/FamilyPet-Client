import classNames from 'classnames/bind';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGauge, faGaugeSimple, faTableColumns } from '@fortawesome/free-solid-svg-icons';

import styles from './dashboard.module.scss'

const cx = classNames.bind(styles)

function Dashboard() {
    return (
        <>
            <h1 className={`${cx("size", "color")} underline`}>Page Dashboard</h1>
            <h1 className="bg-red-800 text-3xl font-bold underline">Page Dashboard</h1>
            <FontAwesomeIcon icon={faGauge} />
            <FontAwesomeIcon icon={faTableColumns} />
            <FontAwesomeIcon icon={faGaugeSimple} />
        </>
    );
}

export default Dashboard;