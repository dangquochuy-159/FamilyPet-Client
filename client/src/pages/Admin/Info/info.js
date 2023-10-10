import { useContext } from "react";
import { Header } from "~/layouts/AdminLayout/components";
import AdminContext from '~/context/AdminContext';
import InfoPersonal from "./infoPersonal";
import InfoAll from "./infoAll";
import './info.scss'


function Info() {
    const context = useContext(AdminContext)
    // console.log(context.admin);
    return (
        <div className="wrapper--info">
            <Header title='Thông tin quản trị viên' name={context.name} avatar={context.avatar} />
            <div className="wrapper-page flex flex-col">
                <InfoPersonal />
                <InfoAll />
            </div>
        </div>
    );
}

export default Info;