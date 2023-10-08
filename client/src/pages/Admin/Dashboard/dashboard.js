
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGauge, faTableColumns, } from '@fortawesome/free-solid-svg-icons';

import AdminContext from '~/context/AdminContext';

import './dashboard.scss'
import { Header } from "~/layouts/AdminLayout/components";

function Dashboard() {
    const context = useContext(AdminContext)
    return (
        <>
            <Header title='Thống kê' name={context.name} avatar={context.avatar} />
            <h1 className="size color underline">Page Dashboard</h1>
            <h1 className="bg-red-800 text-3xl font-bold underline">Page Dashboard</h1>
            <FontAwesomeIcon icon={faGauge} />
            <FontAwesomeIcon icon={faTableColumns} />

        </>
    );
}

export default Dashboard;