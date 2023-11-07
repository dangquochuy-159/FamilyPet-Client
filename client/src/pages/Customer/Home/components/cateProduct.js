import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConnectServer from "~/components/ConnectError";
import { handleLoadingPage } from "~/utils/SupportFunction/supportFunction";

function CategoryProduct() {
    const [connectServer, setConnectServer] = useState(false)
    const [categorys, setCategorys] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/categorys`).then(res => res.json()).then(data => {
            setCategorys(data.data)
            setConnectServer(true)
        }).catch(err => setConnectServer(false))
    }, [])
    const handleChangePage = async (e) => {
        await handleLoadingPage()
        // console.log(e.target)
        // window.location.replace(`/product?slug=${e.target.getAttribute('data-slug')}`)
        navigate(`/product?category=${e.target.getAttribute('data-slug')}`)
    }

    return (
        <section id='sec-home_category' className="grid_layout wide sm:!mt-4 mt-16">
            <h2 className="title sm:!text-xl md:!text-3xl text-4xl text-[var(--primary-color)] bg-transparent">Danh mục sản phẩm</h2>
            {
                !connectServer ? <ConnectServer /> :
                    <div className="grid sm:!grid-cols-2 md:!grid-cols-3 grid-cols-5 gap-5 sm:!py-4 py-4 bg-white">
                        {
                            categorys.map((cate, index) => (

                                <div className="w-full h-full flex flex-col justify-center items-center">
                                    <div className="w-1/2 h-full rounded-full shadow-xl shadow-white overflow-hidden">
                                        <img src={`${process.env.REACT_APP_API_URL}/api/categorys/${cate._id}/${cate.photo}`} alt='banner'
                                            className='w-full h-auto shadow-2xl shadow-white hover:cursor-pointer'
                                            onClick={handleChangePage} data-slug={cate.name} />
                                    </div>
                                    <h3 className="text-sm text-center font-bold pt-5 hover:cursor-pointer" onClick={handleChangePage} data-slug={cate.name}>{cate.name}</h3>
                                </div>

                            ))
                        }


                    </div>
            }

        </section>
    );
}

export default CategoryProduct;