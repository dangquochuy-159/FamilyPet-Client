import { useContext } from "react";
import { Header } from "~/layouts/AdminLayout/components";
import AdminContext from '~/context/AdminContext';

function Info() {
    const context = useContext(AdminContext)
    return (
        <>
            <Header title='Thông tin quản trị viên' name={context.name} avatar={context.avatar} />

            <h1 className="size color underline">Page Info</h1>
            <h1 className="bg-red-800 text-3xl font-bold underline">Page Info</h1>


        </>
    );
}

export default Info;