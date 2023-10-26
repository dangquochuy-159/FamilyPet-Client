import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CardProduct from "~/components/CardProduct";
import ConnectError from "~/components/ConnectError";

function OutStand() {
    const [connectServer, setConnectServer] = useState(false)
    const [products, setProducts] = useState()

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/products/filter?filter=outstand&value=true`).then(res => res.json()).then(data => {
            setProducts(data.data)
            setConnectServer(true)
        }).catch(err => setConnectServer(false))
    })

    return (
        <section id="sec-home_outstand" className='grid_layout wide'>
            <h2 className="w-full title sm:!text-2xl md:!text-3xl text-4xl text-white bg-[var(--primary-color)]">Sản phẩm nổi bật</h2>
            {
                !connectServer ? <ConnectError /> :
                    products.length > 0 &&
                    <>
                        {/* desktop */}
                        <div className="md:!hidden grid grid-cols-4 sm:!grid-cols-2 sm:!gap-2 gap-10 py-10">
                            {
                                products.map((product, index) => index + 1 <= 4 && <CardProduct key={index} product={product} />)
                            }
                        </div>
                        {/* tablet */}
                        <div className="hidden md:!grid grid-cols-3 gap-10  py-10">
                            {
                                products.map((product, index) => index + 1 <= 3 && <CardProduct key={index} product={product} />)
                            }
                        </div>
                        {/* mobile */}
                    </>
            }
            <Link to='/login' className="text-lg text-[var(--primary-color)] float-right hover:text-blue-600">Xem tất cả {`>>`}</Link>

        </section >
    );
}

export default OutStand;