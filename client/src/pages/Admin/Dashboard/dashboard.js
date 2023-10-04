import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGauge, faGaugeSimple, faTableColumns } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
    return (
        <>
            <h1 className="color">Page Dashboard</h1>
            <FontAwesomeIcon icon={faGauge} />
            <FontAwesomeIcon icon={faTableColumns} />
            <FontAwesomeIcon icon={faGaugeSimple} />
        </>
    );
}

export default Dashboard;