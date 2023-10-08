import { useContext } from "react";
import { Header } from "~/layouts/AdminLayout/components";
import AdminContext from '~/context/AdminContext';
function Promote() {
    const context = useContext(AdminContext)
    return (
        <>
            <Header title='Khuyến mãi' name={context.name} avatar={context.avatar} />

            <h1 className="size color underline">Page Promote</h1>
            <h1 className="bg-red-800 text-3xl font-bold underline">Page Promote</h1>


        </>
    );
}

export default Promote;