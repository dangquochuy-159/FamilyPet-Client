import { useEffect, useState } from 'react';
import ConnectError from '~/components/ConnectError';

import './dashboard.scss'

function Dashboard() {
    const [connectServer, setConnectServer] = useState(false)
    const [categorys, setCategorys] = useState([])
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/categorys`)
            .then(res => res.json())
            .then(data => {
                setConnectServer(true)
                setCategorys(data.data)
            })
            .catch(err => setConnectServer(false))
    }, [])

    return (
        <div className="wrapper-page flex flex-col  ">
            {
                !connectServer ? <ConnectError /> :
                    <div className="w-full h-full bg-white p-4 flex flex-col gap-y-5"></div>
            }
        </div>
    );
}

export default Dashboard;