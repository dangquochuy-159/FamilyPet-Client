import { useEffect } from "react";
import { useState } from "react";
import ConnectServer from "~/components/ConnectError";

function CategoryProduct() {
    const [connectServer, setConnectServer] = useState(false)
    const [categorys, setCategorys] = useState()

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/categorys`).then(res => res.json()).then(data => {
            setCategorys(data.data)
            setConnectServer(true)
        }).catch(err => setConnectServer(false))
    })


    return (
        <section id='sec-home_category' className="container sm:!mt-4 mt-16">
            <h2 className="title sm:!text-2xl md:!text-3xl text-4xl text-[var(--primary-color)] bg-transparent">Danh mục sản phẩm</h2>
            {
                !connectServer ? <ConnectServer /> :
                    <div className="grid sm:!grid-cols-2 md:!grid-cols-3 grid-cols-5 gap-5 sm:!py-4 py-16">
                        {
                            categorys.map((cate, index) => (
                                <div key={index} className="w-full h-full flex flex-col justify-center items-center">
                                    <div className="w-1/2 h-full rounded-full bg-white shadow-2xl overflow-hidden">
                                        <img src={`${process.env.REACT_APP_API_URL}/api/categorys/${cate._id}/${cate.photo}`} alt='banner'
                                            className='w-full h-auto' />
                                    </div>
                                    <h3 className="text-xl text-center font-bold py-5">{cate.name}</h3>
                                </div>
                            ))
                        }


                    </div>
            }

        </section>
    );
}

export default CategoryProduct;