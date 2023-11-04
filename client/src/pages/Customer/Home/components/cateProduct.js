import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ConnectServer from "~/components/ConnectError";

function CategoryProduct() {
    const [connectServer, setConnectServer] = useState(false)
    const [categorys, setCategorys] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/categorys`).then(res => res.json()).then(data => {
            setCategorys(data.data)
            setConnectServer(true)
        }).catch(err => setConnectServer(false))
    }, [])


    return (
        <section id='sec-home_category' className="grid_layout wide sm:!mt-4 mt-16">
            <h2 className="title sm:!text-xl md:!text-3xl text-4xl text-[var(--primary-color)] bg-transparent">Danh mục sản phẩm</h2>
            {
                !connectServer ? <ConnectServer /> :
                    <div className="grid sm:!grid-cols-2 md:!grid-cols-3 grid-cols-5 gap-5 sm:!py-4 py-4 bg-white">
                        {
                            categorys.map((cate, index) => (
                                <Link key={index} to={`/product?category=${cate.name}`}>
                                    <div className="w-full h-full flex flex-col justify-center items-center">
                                        <div className="w-1/2 h-full rounded-full shadow-xl shadow-white overflow-hidden">
                                            <img src={`${process.env.REACT_APP_API_URL}/api/categorys/${cate._id}/${cate.photo}`} alt='banner'
                                                className='w-full h-auto shadow-2xl shadow-white' />
                                        </div>
                                        <h3 className="text-sm text-center font-bold pt-5">{cate.name}</h3>
                                    </div>
                                </Link>
                            ))
                        }


                    </div>
            }

        </section>
    );
}

export default CategoryProduct;