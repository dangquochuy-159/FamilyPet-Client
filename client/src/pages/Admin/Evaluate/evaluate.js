import { useContext } from "react";
import { Header } from "~/layouts/AdminLayout/components";
import AdminContext from '~/context/AdminContext';

function Evaluate() {
    const context = useContext(AdminContext)
    return (
        <>
            <Header title='Đánh giá' name={context.name} avatar={context.avatar} />

            <h1 className="size color underline">Page Evaluate</h1>
            <h1 className="bg-red-800 text-3xl font-bold underline">Page Evaluate</h1>


        </>
    );
}

export default Evaluate;