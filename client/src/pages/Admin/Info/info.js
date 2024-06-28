import { useContext, useEffect, useState } from "react";
import ConnectError from "~/components/ConnectError";
import AdminContext from '~/context/AdminContext';
import InfoPersonal from "./infoPersonal";
import InfoAll from "./infoAll";
import { API_ADMIN } from "~/api/api";

function Info() {
    const context = useContext(AdminContext)
    const [adminLogin] = context
    const [connectServer, setConnectServer] = useState(false)

    useEffect(() => {
        fetch(`${API_ADMIN}/${adminLogin._id}`)
            .then(res => res.json())
            .then(data => {
                setConnectServer(true)
            })
            .catch(err => setConnectServer(false))
    }, [])

    return (
        <>
            {!connectServer ? <ConnectError /> :
                <div className="">
                    <InfoPersonal />
                    <InfoAll />
                </div>
            }
        </>
    );
}

export default Info;