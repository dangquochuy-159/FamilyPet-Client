import { Header } from "~/layouts/AdminLayout/components";
import InfoPersonal from "./infoPersonal";
import InfoAll from "./infoAll";
import ButtonToTop from "~/components/ButtonToTop";

function Info() {

    return (
        <div className="wrapper--info">
            <Header title='Thông tin quản trị viên' />
            <div className="wrapper-page flex flex-col">
                <InfoPersonal />
                <InfoAll />
                <ButtonToTop />
            </div>
        </div>
    );
}

export default Info;