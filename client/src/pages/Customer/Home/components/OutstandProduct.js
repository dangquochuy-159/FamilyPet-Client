import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CardProduct from "~/components/CardProduct";
import ConnectError from "~/components/ConnectError";
import { FlashIcon } from "~/components/Icons";
import { handleLoadingPage } from "~/utils/SupportFunction/supportFunction";
import TitleProduct from "./TitleProduct";
import { API_PRODUCT, API_PRODUCT_FILTER } from "~/api/api";

function OutstandProduct() {
    const [connectServer, setConnectServer] = useState(false)
    const [productsOutstand, setProductsOutstand] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        fetch(`${API_PRODUCT_FILTER}?filter=outstand&value=true`).then(res => res.json()).then(data => {
            setProductsOutstand(data.data)
            setConnectServer(true)
        }).catch(err => setConnectServer(false))
    }, [])

    const handleToProductPage = async () => {
        await handleLoadingPage()
        navigate('/product?outstand=true')
    }

    return (
        <section id="sec-home_outstand" className='grid_layout wide mt-16'>
            <TitleProduct title='Sản phẩm nổi bật' />
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
            <button onClick={handleToProductPage} className="text-lg text-[var(--primary-color)] w-full text-right hover:text-blue-600">Xem tất cả {`>>`}</button>

        </section >
    );
}

export default OutstandProduct;