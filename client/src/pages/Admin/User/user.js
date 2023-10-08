import { useContext } from "react";
import { Header } from "~/layouts/AdminLayout/components";
import AdminContext from '~/context/AdminContext';
function User() {
    const context = useContext(AdminContext)
    return (
        <>
            <Header title='Khách hàng' name={context.name} avatar={context.avatar} />

            <h1 className="size color underline">Page User</h1>
            <h1 className="bg-red-800 text-3xl font-bold underline">Page User</h1>


        </>
    );
}

export default User;