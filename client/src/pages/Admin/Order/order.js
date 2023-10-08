import { useContext } from "react";
import { Header } from "~/layouts/AdminLayout/components";
import AdminContext from '~/context/AdminContext';

function Order() {
    const context = useContext(AdminContext)
    return (
        <>
            <Header title='Đơn đặt hàng' name={context.name} avatar={context.avatar} />

            <h1 className="size color underline">Page Order</h1>
            <h1 className="bg-red-800 text-3xl font-bold underline">Page Order</h1>


        </>
    );
}

export default Order;