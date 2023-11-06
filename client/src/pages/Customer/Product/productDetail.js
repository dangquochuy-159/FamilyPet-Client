/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from 'axios';
import PropTypes from 'prop-types'
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import CardProduct from '~/components/CardProduct';
import { BoxExchangeIcon, CartIcon, MinusIcon, PayIcon, PlusIcon, StarIcon, TruckIcon } from '~/components/Icons';
import Image from '~/components/Image';
import CustomerContext from '~/context/CustomerContext';
import { changeDate, changeNumberToPrice, changeStatus, handleLoadingPage } from '~/utils/SupportFunction/supportFunction';

function ProductDetail({ productDetail }) {
    const [userLogin] = useContext(CustomerContext)

    let initQuantity = productDetail[0].quantity === 0 ? 0 : 1
    const [numericValue, setNumericValue] = useState(initQuantity);
    const [photoMain, setPhotoMain] = useState(productDetail[0].photo)
    const [evaluates, setEvaluates] = useState([])
    const [users, setUsers] = useState([])
    const [relatedProducts, setRelatedProducts] = useState([])

    const ipQuantityRef = useRef()
    const navigate = useNavigate()


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/evaluates`).then(res => res.json())
            .then(data => setEvaluates(data.data))
        fetch(`${process.env.REACT_APP_API_URL}/api/users`).then(res => res.json())
            .then(data => setUsers(data.data))
        fetch(`${process.env.REACT_APP_API_URL}/api/products/filter?filter=category&value=${productDetail[0].category}&size=5`).then(res => res.json())
            .then(data => setRelatedProducts(data.data))

    }, [])

    const handleChangePhoto = (e) => {
        let photo = e.target.getAttribute('data-photo')
        setPhotoMain(photo)
    }

    const handleInputChange = (e) => {
        const input = ipQuantityRef.current.value
        if (/^\d*$/.test(input) || input === '') {
            setNumericValue(input);
        } else {
            setNumericValue(1);
        }
        if (Number(input) > productDetail[0].quantity) {
            setTimeout(() => setNumericValue(productDetail[0].quantity), 500)
        }
    }

    const handleAddCart = () => {
        if (userLogin) {
            let price = productDetail[0].sale_price ? productDetail[0].sale_price : productDetail[0].price
            axios.put(`${process.env.REACT_APP_API_URL}/api/users/${userLogin._id}/cart/${productDetail[0]._id}?quantity=1&price=${price}`)
                .then(() => {
                    alert('Thêm vào giỏ hàng thành công')
                    window.location.reload()
                })
        } else {
            if (window.confirm('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng, chuyển đến trang đăng nhập'))
                window.location.href = '/login'
        }

    }

    const handlePayment = async () => {
        if (userLogin) {
            const details = []

            let quantity = document.querySelector('.input-quantity').value
            quantity = Number(quantity) === 0 ? 1 : quantity
            let price = productDetail[0].sale_price ? productDetail[0].sale_price : productDetail[0].price
            details.push({
                id_product: productDetail[0]._id,
                name_product: productDetail[0].name,
                quantity: quantity,
                unit_price: price,
                into_money: price * quantity,
            })
            let totalPay = price * quantity

            const productPayment = {
                total_pay: totalPay,
                details: details,
            }
            window.sessionStorage.setItem("productPayment", JSON.stringify(productPayment))
            await handleLoadingPage()
            navigate('/cart/payment-info')
        } else {
            if (window.confirm('Vui lòng đăng nhập để mua sản phẩm, chuyển đến trang đăng nhập'))
                window.location.href = '/login'
        }
    }

    const handleDownQuantity = () => {
        let quantity = Number(document.querySelector('.input-quantity').value)
        quantity > 0 &&
            setNumericValue(quantity - 1)
    }

    const handleUpQuantity = () => {
        let quantity = Number(document.querySelector('.input-quantity').value)
        quantity < productDetail[0].quantity &&
            setNumericValue(quantity + 1)
    }

    return (
        <section id='sec-product-detail' className='grid_layout wide w-full h-auto !my-16'>
            {/* product detail */}
            <div>
                {
                    productDetail.map((product, index) =>
                        <div key={product._id} className='grid grid-cols-12 w-full h-auto gap-2 !my-16 bg-[#f5f5f5]'>
                            <div className='sm:!col-span-12 col-span-6 w-full h-auto grid grid-cols-4'>
                                <div className='sm:!col-span-6 md:!col-span-6 flex sm:!flex-row md:!flex-row flex-col items-center justify-center gap-4  sm:!order-2 md:!order-2'>
                                    {
                                        product.photo_detail.map(photo =>
                                            <div key={photo} onClick={handleChangePhoto} className='w-auto h-auto p-2 border border-solid border-[#ebe4e4] bg-white hover:cursor-pointer hover:border-[var(--primary-color)]'>
                                                <img src={`${process.env.REACT_APP_API_URL}/api/products/${product._id}/${photo}`} alt='photo-detail'
                                                    data-photo={photo} className='w-24 h-24 object-cover' />
                                            </div>
                                        )
                                    }
                                    <div onClick={handleChangePhoto} className='w-auto h-auto p-2 border border-solid border-[#ebe4e4] bg-white hover:cursor-pointer hover:border-[var(--primary-color)]'>
                                        <img src={`${process.env.REACT_APP_API_URL}/api/products/${product._id}/${product.photo}`} alt='photo-product'
                                            data-photo={product.photo} className='w-24 h-24 object-cover' />
                                    </div>
                                </div>
                                <div className='sm:!col-span-6 md:!col-span-6 col-span-3 w-full flex items-center bg-white sm:!order-1 md:!order-1'>
                                    <img src={`${process.env.REACT_APP_API_URL}/api/products/${product._id}/${photoMain}`} alt='photo-product' />
                                </div>
                            </div>
                            <div className='sm:!col-span-12 col-span-6 w-full h-full flex flex-col px-4 md:!gap-2 gap-4'>
                                <p className='text-2xl font-bold'>{product.name}</p>
                                <p className='text-lg h-[3.5rem] overflow-hidden line-clamp-2'>{product.des}</p>
                                <div className='flex sm:!flex-col md:!flex-col gap-x-8 gap-y-2'>
                                    <p className='text-lg '>
                                        <span className='font-bold mr-2'>Xuất xứ:</span>
                                        <span>{product.origin}</span>
                                    </p>
                                    <p className='text-xl'>
                                        <span className='font-bold mr-2'>Tình trạng:</span>
                                        <span>{Object.keys(product.status).map(key => product.status[key] === true && changeStatus[key])}</span>
                                    </p>
                                </div>
                                <div className='flex items-end gap-4'>
                                    <span className='text-2xl text-red-600 font-bold '>{product.sale_price ? changeNumberToPrice(product.sale_price) : changeNumberToPrice(product.price)}</span>
                                    <span className='text-lg text-black line-through '>{product.sale_price && changeNumberToPrice(product.price)}</span>
                                </div>
                                <div className='flex items-center justify-start gap-4 py-4 border-y border-dashed border-[var(--primary-color)]'>
                                    <span className='text-lg font-bold'>Số lượng:</span>
                                    <button onClick={handleUpQuantity} className={`${numericValue === productDetail[0].quantity && 'text-gray-300 pointer-events-none'}`}> <PlusIcon /></button>
                                    <input ref={ipQuantityRef} id='quantity' name='quantity' type='text' value={numericValue} maxLength='2' data-max={product.quantity}
                                        onChange={handleInputChange}
                                        className='input-quantity w-10 h-10 px-2 text-xl text-center font-bold outline-none ' />
                                    <button onClick={handleDownQuantity} className={`${numericValue === 0 && 'text-gray-300 pointer-events-none'}`}><MinusIcon /></button>
                                </div>
                                <div className='flex md:!flex-col py-4 gap-4'>
                                    <button onClick={handlePayment} className='w-full flex items-center justify-center gap-2 p-4 text-lg text-white font-bold bg-red-600'><PayIcon /> Mua ngay </button>
                                    <button onClick={handleAddCart} className='w-full flex items-center justify-center gap-2 p-4 text-lg text-white font-bold bg-blue-600'><CartIcon /> Thêm vào giỏ hàng </button>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <p className='flex sm:!flex-col md:!flex-col'>
                                        <span className='flex items-center gap-2 font-bold mr-2'><TruckIcon /> Vận chuyển toàn quốc:</span>
                                        <span>Miễn phí vận chuyển trong bán kính 15km</span></p>
                                    <p className='flex sm:!flex-col md:!flex-col'>
                                        <span className='flex items-center gap-2 font-bold mr-2'><BoxExchangeIcon /> Hỗ trợ đổi trả:</span>
                                        <span>Trong vòng 15 ngày kể từ khi mua hàng</span></p>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

            {/* Evaluate */}
            <div className='flex flex-col w-full h-auto gap-4'>
                <div className='h-auto flex flex-col justify-center items-center gap-6 w-full rounded-sm bg-white p-4'>
                    <h2 className='text-4xl text-center font-bold '>Đánh giá</h2>
                    <div className='flex gap-2'>
                        <p className='text-yellow-400' ><StarIcon width='40px' height='40px' className={`${(productDetail[0].star === 0 ? 5 : Math.floor(productDetail[0].star / productDetail[0].total_eval)) >= 1 && ' fill-yellow-400'}`} /></p>
                        <p className='text-yellow-400' ><StarIcon width='40px' height='40px' className={`${(productDetail[0].star === 0 ? 5 : Math.floor(productDetail[0].star / productDetail[0].total_eval)) >= 2 && ' fill-yellow-400'}`} /></p>
                        <p className='text-yellow-400' ><StarIcon width='40px' height='40px' className={`${(productDetail[0].star === 0 ? 5 : Math.floor(productDetail[0].star / productDetail[0].total_eval)) >= 3 && ' fill-yellow-400'}`} /></p>
                        <p className='text-yellow-400' ><StarIcon width='40px' height='40px' className={`${(productDetail[0].star === 0 ? 5 : Math.floor(productDetail[0].star / productDetail[0].total_eval)) >= 4 && ' fill-yellow-400'}`} /></p>
                        <p className='text-yellow-400' ><StarIcon width='40px' height='40px' className={`${(productDetail[0].star === 0 ? 5 : Math.floor(productDetail[0].star / productDetail[0].total_eval)) >= 5 && ' fill-yellow-400'}`} /></p>
                    </div>
                    <p className='text-2xl'>{productDetail[0].star === 0 ? 5 : Math.floor(productDetail[0].star / productDetail[0].total_eval).toFixed(1)} / 5</p>
                    <p>
                        <span>Tổng lượt đánh giá: </span>
                        <span>{productDetail[0].total_eval}</span>
                    </p>
                </div>
                <div className=' w-full h-auto rounded-sm bg-white p-4'>
                    <h2 className='text-4xl font-bold text-center' >Nhận xét</h2>
                    <div className='mt-4 h-[400px] overflow-auto flex flex-col gap-4'>
                        {
                            evaluates.length > 0 &&
                            evaluates.map(evaluate => evaluate.id_product === productDetail[0]._id &&
                                <div key={evaluate._id} className='flex flex-col gap-2 rounded-sm bg-[#f5f5f5] p-4'>
                                    <div className='flex items-center gap-4'>
                                        {
                                            users.map(user => user._id === evaluate.id_customer &&
                                                <Image key={user._id} src={`${process.env.REACT_APP_API_URL}/api/users/${user._id}/${user.avatar}`} alt='avt'
                                                    className='w-12 h-12 rounded-full object-cover' />
                                            )
                                        }
                                        <div>
                                            <p className='text-lg font-bold'>{evaluate.name_user}</p>
                                            <p className='text-sm'>{changeDate(evaluate.createdAt)}</p>
                                        </div>


                                    </div>
                                    <div className='flex gap-2'>
                                        <p className='text-yellow-400' ><StarIcon width='20px' height='20px' className={`${evaluate.star >= 1 && ' fill-yellow-400'}`} /></p>
                                        <p className='text-yellow-400' ><StarIcon width='20px' height='20px' className={`${evaluate.star >= 2 && ' fill-yellow-400'}`} /></p>
                                        <p className='text-yellow-400' ><StarIcon width='20px' height='20px' className={`${evaluate.star >= 3 && ' fill-yellow-400'}`} /></p>
                                        <p className='text-yellow-400' ><StarIcon width='20px' height='20px' className={`${evaluate.star >= 4 && ' fill-yellow-400'}`} /></p>
                                        <p className='text-yellow-400' ><StarIcon width='20px' height='20px' className={`${evaluate.star >= 5 && ' fill-yellow-400'}`} /></p>
                                    </div>
                                    <p>{evaluate.content}</p>

                                </div>
                            )
                        }
                    </div>
                    <div>
                    </div>
                </div>
            </div>

            {/* related products */}
            <div className='mt-16'>
                <h2 className='text-3xl sm:!text-center md:!text-center font-bold'>Sản phẩm tương tự</h2>
                {
                    relatedProducts.length > 0 &&
                    <>
                        <div className="sm:!hidden md:!hidden grid grid-cols-5 gap-2 py-10">
                            {
                                relatedProducts.map((product, index) => index + 1 <= 5 && <CardProduct key={index} product={product} />)
                            }
                        </div>

                        <div className="hidden md:!grid grid-cols-3 gap-2 py-10">
                            {
                                relatedProducts.map((product, index) => index + 1 <= 3 && <CardProduct key={index} product={product} />)
                            }
                        </div>

                        <div className="hidden sm:!grid  grid-cols-2 gap-2 py-10">
                            {
                                relatedProducts.map((product, index) => index + 1 <= 4 && <CardProduct key={index} product={product} />)
                            }
                        </div>
                    </>
                }
            </div>
        </section >
    );
}

ProductDetail.propTypes = {
    productDetail: PropTypes.array.isRequired
}

export default ProductDetail;