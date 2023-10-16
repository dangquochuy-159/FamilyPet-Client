import { useContext, useEffect, useState } from "react";
import ConnectError from "~/components/ConnectError";
import AdminContext from '~/context/AdminContext';
import { Header } from "~/layouts/AdminLayout/components";
import InfoPersonal from "./infoPersonal";
import InfoAll from "./infoAll";

function Info() {
    const context = useContext(AdminContext)
    const [adminLogin] = context
    const [connectServer, setConnectServer] = useState()

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/admins/${adminLogin._id}`)
            .then(res => res.json())
            .then(data => {
                setConnectServer(true)
            })
            .catch(err => setConnectServer(false))
    }, [])

    return (
        <div className="wrapper--info">
            <Header title='Thông tin quản trị viên' avatar={adminLogin.avatar} name={adminLogin.full_name} id={adminLogin._id} />
            <div className="wrapper-page flex flex-col">
                {!connectServer ? <ConnectError /> :
                    <>
                        <InfoPersonal />
                        <InfoAll />
                    </>
                }
            </div>
        </div>
    );
}

export default Info;