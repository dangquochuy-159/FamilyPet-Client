import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGauge, faTableColumns, } from '@fortawesome/free-solid-svg-icons';

import './dashboard.scss'
import { Header } from "~/layouts/AdminLayout/components";

function Dashboard() {
    return (
        <>
            <Header title='Thống kê' />
            <h1 className="size color underline">Page Dashboard</h1>
            <h1 className="bg-red-800 text-3xl font-bold underline">Page Dashboard</h1>
            <FontAwesomeIcon icon={faGauge} />
            <FontAwesomeIcon icon={faTableColumns} />

        </>
    );
}

export default Dashboard;