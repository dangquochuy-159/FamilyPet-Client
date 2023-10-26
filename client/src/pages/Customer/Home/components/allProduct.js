import { Fragment, useEffect, useState } from "react";
import _ from 'lodash';
import { Link } from "react-router-dom";
import CardProduct from "~/components/CardProduct";
import ConnectError from "~/components/ConnectError";
import Flickity from 'react-flickity-component'

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
        // freeScroll: true, // lướt tùy chỉnh 
        // freeScrollFriction: 0.00,
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
                <h2 className="w-full title sm:!text-2xl md:!text-3xl text-4xl text-white bg-[var(--primary-color)]">Sản phẩm đang bán 2</h2>
                {
                    !connectServer ? <ConnectError /> :
                        products.length > 0 &&
                        <>
                            {
                                categorys.map((category, index) => (
                                    <div key={index} className="slide-product w-full h-full overflow-hidden mt-16 px-24 ">
                                        <h2 className="w-full title sm:!text-2xl md:!text-3xl text-4xl text-[var(--primary-color)] ">{category.name}</h2>
                                        <Flickity
                                            className={'carousel w-full h-full focus-visible:outline-none '} // default ''
                                            elementType={'div'} // default 'div'
                                            options={flickityOptions} // takes flickity options {}
                                            disableImagesLoaded={false} // default false
                                            reloadOnUpdate // default false
                                            static // default false

                                        >
                                            {
                                                groupProducts[category.name].map((product, index) =>
                                                    <CardProduct key={index} product={product} className="sm:!w-1/2 md:!w-1/3 w-1/5 h-auto  mr-10" />)
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