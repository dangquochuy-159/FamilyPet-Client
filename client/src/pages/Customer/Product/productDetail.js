import PropTypes from 'prop-types'
import { useContext, useEffect, useRef, useState } from 'react';
import { BoxExchangeIcon, CartIcon, MinusIcon, PayIcon, PlusIcon, StarIcon, TruckIcon } from '~/components/Icons';
import Image from '~/components/Image';
import CustomerContext from '~/context/CustomerContext';
import { changeNumberToPrice } from '~/utils/SupportFunction/supportFunction';

function ProductDetail({ productDetail }) {
    const [userLogin] = useContext(CustomerContext)
    const [photoMain, setPhotoMain] = useState(productDetail[0].photo)
    const [numericValue, setNumericValue] = useState('1');
    const [evaluates, setEvaluates] = useState([])
    const [users, setUsers] = useState([])
    const ipQuantityRef = useRef()


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/evaluates`).then(res => res.json())
            .then(data => setEvaluates(data.data))
        fetch(`${process.env.REACT_APP_API_URL}/api/users`).then(res => res.json())
            .then(data => setUsers(data.data))
    }, [])

    const changeStatus = {
        in_stock: 'Còn hàng',
        low_stock: 'Sắp hết hàng',
        out_stock: 'Hết hàng'
    }

    const handleChangePhoto = (e) => {
        let photo = e.target.getAttribute('data-photo')
        console.log(photo)
        setPhotoMain(photo)
    }

    const handleInputChange = (e) => {
        const input = ipQuantityRef.current.value
        if (/^\d*$/.test(input) || input === '') {
            setNumericValue(input);
        } else {
            setNumericValue('');
        }
    }

    return (
        <section id='sec-product-detail' className='grid_layout wide w-full h-auto !my-16'>
            {/* <button onClick={() => console.log(productDetail)}>Click</button> */}
            {
                productDetail.map(product =>
                    // <h2>{product.name}</h2>
                    <div className='grid grid-cols-12 w-full h-auto gap-2 !my-16 bg-[#f5f5f5]'>
                        <div className='col-span-6 w-full h-auto grid grid-cols-4'>
                            <div className='flex flex-col items-center justify-center gap-4'>
                                {
                                    product.photo_detail.map(photo =>
                                        <div onClick={handleChangePhoto} className='w-auto h-auto p-2 border border-solid border-[#ebe4e4] bg-white hover:cursor-pointer hover:border-[var(--primary-color)]'>
                                            <Image src={`${process.env.REACT_APP_API_URL}/api/products/${product._id}/${photo}`} alt='photo-detail'
                                                data-photo={photo} className='w-24 h-24 object-cover' />
                                        </div>
                                    )
                                }
                                <div onClick={handleChangePhoto} className='w-auto h-auto p-2 border border-solid border-[#ebe4e4] bg-white hover:cursor-pointer hover:border-[var(--primary-color)]'>
                                    < Image src={`${process.env.REACT_APP_API_URL}/api/products/${product._id}/${product.photo}`} alt='photo-product'
                                        data-photo={product.photo} className='w-24 h-24 object-cover' />
                                </div>
                            </div>
                            <div className='col-span-3 w-full flex items-center bg-white'>
                                < Image src={`${process.env.REACT_APP_API_URL}/api/products/${product._id}/${photoMain}`} alt='photo-product' />
                            </div>
                        </div>
                        <div className='col-span-6 w-full h-full flex flex-col px-4 gap-4'>
                            <p className='text-2xl font-bold'>{product.name}</p>
                            <p className='text-lg h-[3.5rem] overflow-hidden line-clamp-2'>{product.des}</p>
                            <div className='flex gap-8'>
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
                                <button> <PlusIcon /></button>
                                <input ref={ipQuantityRef} id='quantity' name='quantity' type='text' value={numericValue} maxLength='2' data-max={product.quantity}
                                    onChange={handleInputChange}
                                    className='input-quantity w-10 h-10 px-2 text-xl text-center font-bold outline-none ' />
                                <button><MinusIcon /></button>
                            </div>
                            <div className='flex py-4 gap-4'>
                                <button className='w-full flex items-center justify-center gap-2 p-4 text-lg text-white font-bold bg-red-600'><PayIcon /> Mua ngay </button>
                                <button className='w-full flex items-center justify-center gap-2 p-4 text-lg text-white font-bold bg-blue-600'><CartIcon /> Thêm vào giỏ hàng </button>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <p className='flex'>
                                    <span className='flex items-center gap-2 font-bold mr-2'><TruckIcon /> Vận chuyển toàn quốc:</span>
                                    Miễn phí vận chuyển trong bán kính 15km</p>
                                <p className='flex'>
                                    <span className='flex items-center gap-2 font-bold mr-2'><BoxExchangeIcon /> Hỗ trợ đổi trả:</span>
                                    Trong vòng 15 ngày kể từ khi mua hàng</p>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className='grid grid-cols-5 gap-4'>
                <div className='col-span-2 bg-white p-4'>
                    <h2>Đánh giá</h2>
                    <div className='flex gap-2'>
                        <p className='text-yellow-400' ><StarIcon className={`${Math.floor(productDetail[0].star / productDetail[0].total_eval) >= 1 && ' fill-yellow-400'}`} /></p>
                        <p className='text-yellow-400' ><StarIcon className={`${Math.floor(productDetail[0].star / productDetail[0].total_eval) >= 2 && ' fill-yellow-400'}`} /></p>
                        <p className='text-yellow-400' ><StarIcon className={`${Math.floor(productDetail[0].star / productDetail[0].total_eval) >= 3 && ' fill-yellow-400'}`} /></p>
                        <p className='text-yellow-400' ><StarIcon className={`${Math.floor(productDetail[0].star / productDetail[0].total_eval) >= 4 && ' fill-yellow-400'}`} /></p>
                        <p className='text-yellow-400' ><StarIcon className={`${Math.floor(productDetail[0].star / productDetail[0].total_eval) >= 5 && ' fill-yellow-400'}`} /></p>
                    </div>
                    <p>{Math.floor(productDetail[0].star / productDetail[0].total_eval).toFixed(1)} / 5</p>
                    <p>
                        <span>Tổng lượt đánh giá: </span>
                        <span>{productDetail[0].total_eval}</span>
                    </p>
                </div>
                <div className='col-span-3 bg-white p-4'>
                    <h2 >Nhận xét</h2>
                    {
                        evaluates.length > 0 &&
                        evaluates.map(evaluate =>
                            <>
                                {
                                    users.map(user => user._id === evaluate.id_customer &&
                                        <Image src={`${process.env.REACT_APP_API_URL}/api/users/${user._id}/${user.avatar}`} alt='avt' />
                                    )
                                }
                                <p>{evaluate.name_user}</p>
                                <p>{evaluate.star}</p>
                                <p>{evaluate.content}</p>
                                <p>{evaluate.createdAt}</p>
                            </>

                        )
                    }
                    <div>
                    </div>
                </div>
            </div>
        </section >
    );
}

ProductDetail.propTypes = {
    productDetail: PropTypes.object.isRequired
}

export default ProductDetail;