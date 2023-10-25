import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import { Button } from "~/components/Button";
import { CartIcon, SearchIcon, FireIcon } from "../Icons";

import './cardProduct.scss'
import Image from '../Image';

function CardProduct({ product }) {
    const price = 600000
    const salePrice = 400000
    return (
        <div className="rounded-xl  shadow-xl shadow-white relative ">
            <div className="overflow-hidden rounded-t-xl">
                <Image src={`${process.env.REACT_APP_API_URL}/api/products/${product._id}/${product.photo}`} alt='anh_san_pham'
                    className="transition-all rounded-t-xl hover:scale-125" />
            </div>
            <div className="flex flex-col items-center gap-5 p-4 rounded-b-xl bg-white">
                <Link to='/'
                    className="limit-text sm:!leading-[1rem] sm:!h-[2rem] sm:!max-h-[2rem] leading-[2rem] h-[4rem] max-h-[4rem] sm:!text-sm text-2xl text-black text-center font-medium hover:text-[var(--primary-color)]">
                    {product.name}
                </Link>
                <p className="flex sm:flex-col items-center gap-4 text-xl">
                    <span className="text-red-600 font-bold">{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                    <span className="text-black text-sm line-through">{product.sale_price && product.sale_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                </p>
                <div className="sm:!hidden w-full flex justify-center gap-2">
                    <Button type='primary' leftIcon={<CartIcon />} className="w-1/3 text-white bg-red-500 hover:bg-red-400" />
                    <Button to='/login' type='primary' leftIcon={<SearchIcon />} className="w-1/3 text-white bg-blue-500 hover:bg-blue-400" />
                </div>
            </div>
            {
                product.outstand &&
                <div className="w-10 h-10 flex justify-center items-center rounded-full absolute top-2 left-2 bg-red-600">
                    <FireIcon className="text-xl text-white" />
                </div>
            }
            {
                product.sale_price &&
                <div className="w-12 h-12 flex justify-center items-start pt-2 absolute top-0 right-2 bg-red-600">
                    <p className="percent-reduce text-lg text-white" >-{100 - (product.sale_price / product.price).toFixed(2) * 100}%</p>
                </div>
            }
        </div>
    );
}

CardProduct.propTypes = {
    product: PropTypes.object.isRequired,
}

export default CardProduct;