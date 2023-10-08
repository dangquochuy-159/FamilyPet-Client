import { useContext } from "react";
import { Header } from "~/layouts/AdminLayout/components";
import AdminContext from '~/context/AdminContext';

function Category() {
    const context = useContext(AdminContext)
    return (
        <>
            <Header title='Danh mục sản phẩm' name={context.name} avatar={context.avatar} />

            <h1 className="size color underline">Page Category</h1>
            <h1 className="bg-red-800 text-3xl font-bold underline">Page Category</h1>


        </>
    );
}

export default Category;