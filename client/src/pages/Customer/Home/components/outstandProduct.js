import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardProduct from "~/components/CardProduct";
import ConnectError from "~/components/ConnectError";
import { FlashIcon } from "~/components/Icons";

function OutstandProduct() {
    const [connectServer, setConnectServer] = useState(false)
    const [productsOutstand, setProductsOutstand] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/products/filter?filter=outstand&value=true`).then(res => res.json()).then(data => {
            setProductsOutstand(data.data)
            setConnectServer(true)
        }).catch(err => setConnectServer(false))
    }, [])

    return (
        <section id="sec-home_outstand" className='grid_layout wide'>
            <h2 className="w-full  title style-title sm:!text-xl md:!text-3xl text-4xl text-white bg-red-600">
                <span className="flex">
                    <FlashIcon width="36px" height="36px" />
                    <FlashIcon width="36px" height="36px" />
                </span>
                Sản phẩm nổi bật
                <span className="flex">
                    <FlashIcon width="36px" height="36px" />
                    <FlashIcon width="36px" height="36px" />
                </span>
            </h2>
            {
                !connectServer ? <ConnectError /> :
                    productsOutstand.length > 0 &&
                    <>
                        {/* desktop */}
                        <div className="sm:!hidden md:!hidden grid grid-cols-5 gap-2 py-10">
                            {
                                productsOutstand.map((product, index) => index + 1 <= 5 && <CardProduct key={index} product={product} />)
                            }
                        </div>
                        {/* tablet */}
                        <div className="hidden md:!grid grid-cols-3 gap-2 py-10">
                            {
                                productsOutstand.map((product, index) => index + 1 <= 3 && <CardProduct key={index} product={product} />)
                            }
                        </div>
                        {/* mobile */}
                        <div className="hidden sm:!grid  grid-cols-2 gap-2 py-10">
                            {
                                productsOutstand.map((product, index) => index + 1 <= 4 && <CardProduct key={index} product={product} />)
                            }
                        </div>
                    </>
            }
            <p className="text-lg text-[var(--primary-color)] w-full text-right hover:text-blue-600"><Link to='/product?outstand=true' >Xem tất cả {`>>`}</Link></p>

        </section >
    );
}

export default OutstandProduct;