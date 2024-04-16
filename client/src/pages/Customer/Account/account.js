import { InfoAccount, InfoOrder } from "./components";
import { useContext } from "react";
import CustomerContext from "~/context/CustomerContext";
import { Link } from "react-router-dom";

function Account() {
    const [userLogin] = useContext(CustomerContext)
    return (
        <div className="grid_layout wide h-auto sm:!pt-0 !py-16">
            {
                !userLogin ? <p className="h-auto sm:!pt-16 text-center text-2xl font-bold">Vui lòng đăng nhập để xem thông tin tài khoản!
                    <Link to='/login' className="ml-4 text-red-400 font-medium underline hover:text-blue-500">Đăng nhập</Link>
                </p> :
                    <>
                        <InfoAccount />
                        <InfoOrder />
                    </>
            }
        </div>
    );
}

export default Account;