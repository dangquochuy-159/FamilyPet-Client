import { useContext, useEffect, useState } from 'react';
import ConnectError from '~/components/ConnectError';
import AdminContext from '~/context/AdminContext';
import { Header } from "~/layouts/AdminLayout/components";


function Product() {
    const context = useContext(AdminContext)
    const [adminLogin] = context
    const [connectServer, setConnectServer] = useState(false)
    const [categorys, setCategorys] = useState([])
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/categorys`)
            .then(res => res.json())
            .then(data => {
                setConnectServer(true)
                setCategorys(data.data)
            })
            .catch(err => setConnectServer(false))
    }, [])
    return (
        <>
            <Header title='Sản phẩm'
                avatar={connectServer && adminLogin.avatar}
                name={connectServer && adminLogin.full_name}
                id={connectServer && adminLogin._id} />

            <div className="wrapper-page flex flex-col  ">
                {
                    !connectServer ? <ConnectError /> :
                        <div className="w-full h-full bg-white p-4 flex flex-col gap-y-5"></div>
                }
            </div>


        </>
    );
}

export default Product;