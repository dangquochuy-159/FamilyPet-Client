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
        navigate(`/product?category=${e.target.getAttribute('data-slug')}`)
    }

    return (
        <section id='sec-home_category' className="grid_layout sm:!mt-4 mt-16">
            {/* <h2 className="title sm:!text-xl md:!text-3xl text-4xl text-[var(--primary-color)] bg-transparent">Danh mục sản phẩm</h2> */}
            {
                !connectServer ? <ConnectServer /> :
                    <div className="grid sm:!grid-cols-2 md:!grid-cols-3 grid-cols-5 gap-5 sm:!py-4 p-4">
                        {
                            categorys.map((cate, index) => (
                                <h3 key={index}
                                    className="w-full h-full text-xl text-center text-white font-normal py-5  
                                    bg-[var(--category-color)] rounded-md hover:cursor-pointer hover:bg-[var(--primary-color-hover)]"
                                    onClick={handleChangePage}
                                    data-slug={cate.name}>{cate.name}
                                </h3>
                            ))
                        }


                    </div>
            }

        </section>
    );
}

export default CategoryProduct;