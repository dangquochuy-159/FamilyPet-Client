import { Fragment, useEffect, useState } from "react";
import _ from 'lodash';
import { Link } from "react-router-dom";
import CardProduct from "~/components/CardProduct";
import ConnectError from "~/components/ConnectError";
import Flickity from 'react-flickity-component'
import { CheckBadgeIcon } from "~/components/Icons";

function AllProduct() {
    const [connectServer, setConnectServer] = useState(false)
    const [products, setProducts] = useState([])
    const [groupProducts, setGroupProducts] = useState([])
    const [categorys, setCategorys] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/categorys`).then(res => res.json()).then(data => {
            setCategorys(data.data)
            setConnectServer(true)
        }).catch(err => setConnectServer(false))

        fetch(`${process.env.REACT_APP_API_URL}/api/products`).then(res => res.json()).then(data => {
            setProducts(data.data)
            setGroupProducts(_.groupBy(data.data, 'category'))
            setConnectServer(true)
        }).catch(err => setConnectServer(false))
    }, [])
    const handleClick = () => {
        console.log(products)
        console.log(categorys)
        console.log(groupProducts)

        // categorys.map(category => {
        //     console.log('>>>>', category.name)
        //     products[category.name].map(item => console.log(item.name))
        // })

    }
    const flickityOptions = {
        initialIndex: 3,
        pageDots: false,
        prevNextButtons: true,
        wrapAround: true, // cuộn vô hạn
        autoPlay: false,
        pauseAutoPlayOnHover: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    prevNextButtons: false,
                }
            }
        ]
    }
    return (
        <>
            <section id='sec-home_all_product' className="grid_layout wide mt-16">
                <h2 className="w-full title style-title sm:!text-xl md:!text-3xl text-4xl text-white bg-blue-500">
                    <span className="flex">
                        <CheckBadgeIcon width="36px" height="36px" />
                        <CheckBadgeIcon width="36px" height="36px" />
                    </span>
                    Tất cả sản  phẩm dang bán
                    <span className="flex">
                        <CheckBadgeIcon width="36px" height="36px" />
                        <CheckBadgeIcon width="36px" height="36px" />
                    </span>
                </h2>
                {
                    !connectServer ? <ConnectError /> :
                        products.length > 0 &&
                        <>
                            {
                                categorys.map((category, index) => (
                                    <div key={index} className="slide-product w-full h-full overflow-hidden sm:!mt-4 mt-16 px-24 ">
                                        <h2 className="w-full title sm:!text-xl md:!text-3xl text-4xl text-black underline">{category.name}</h2>
                                        <Flickity
                                            className={'carousel w-full h-full focus-visible:outline-none sm:!mt-4 mt-16'} // default ''
                                            elementType={'div'} // default 'div'
                                            options={flickityOptions} // takes flickity options {}
                                            disableImagesLoaded={false} // default false
                                            reloadOnUpdate // default false
                                            static // default false

                                        >
                                            {
                                                groupProducts[category.name].map((product, index) =>
                                                    <CardProduct key={index} product={product} className="sm:!w-4/5 md:!w-1/3 w-1/5 h-auto  mr-10" />)
                                            }
                                        </Flickity>
                                    </div>
                                ))
                            }
                        </>
                }
            </section>
        </>
    );
}

export default AllProduct;