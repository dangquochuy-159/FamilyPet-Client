import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { images } from "~/assets";
import ButtonToTop from "~/components/ButtonToTop";
import Image from "~/components/Image";
import CustomerContext from "~/context/CustomerContext";
import { changeNumberToPrice } from "~/utils/SupportFunction/supportFunction";

function PaymentInfo() {
    const productPayment = JSON.parse(window.sessionStorage.getItem("productPayment"))
    const navigate = useNavigate()
    const [userLogin] = useContext(CustomerContext)

    const [products, setProducts] = useState([])
    const [promotes, setPromotes] = useState([])
    const [disabledBtn, setDisabledBtn] = useState(true)
    const [promoteType, setPromoteType] = useState('')
    const [promoteReduce, setPromoteReduce] = useState(0)
    const [promotePoint, setPromotePoint] = useState(0)
    const [checkCod, setCheckCod] = useState(true)
    const [methodPayments, setMethodPayments] = useState('cod')

    const ipProCode = document.getElementById('promote-code')
    const ipName = document.querySelector('.input-name')
    const ipPhone = document.querySelector('.input-phone')
    const ipAdd = document.querySelector('.input-add')

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/products`).then(res => res.json()).then(data => {
            setProducts(data.data)
        })
        fetch(`${process.env.REACT_APP_API_URL}/api/promotes`).then(res => res.json()).then(data => {
            setPromotes(data.data)
        })
    }, [])

    const handleCancelPayment = () => {
        window.sessionStorage.removeItem("productPayment")
        navigate('/cart')
    }

    const handleBackPage = () => {
        window.sessionStorage.removeItem("productPayment")
        navigate('/cart')
    }

    const handleNextPage = () => {
        if (ipName.value === '' || ipPhone.value === '' || ipAdd.value === '') {
            // ipName === '' && (ipName.parentElement.querySelector('.msg-error').innerHTML = 'Vui lòng nhập đầy đủ thông tin')

            ipName.parentElement.querySelector('.msg-error').innerHTML = ipName.value === '' ? 'Vui lòng nhập đầy đủ thông tin' : ''
            ipPhone.parentElement.querySelector('.msg-error').innerHTML = ipPhone.value === '' ? 'Vui lòng nhập đầy đủ thông tin' : ''
            ipAdd.parentElement.querySelector('.msg-error').innerHTML = ipAdd.value === '' ? 'Vui lòng nhập đầy đủ thông tin' : ''
            ipName.value === '' ? ipName.focus() : ipPhone.value === '' ? ipPhone.focus() : ipAdd.focus()
        } else {
            const infoPayment = {
                products: products,
                name: ipName.value,
                phone: ipPhone.value,
                address: ipAdd.value,
                total_pay: productPayment.total_pay,
                details: productPayment.details,
                payments: methodPayments,
                promote_code: ipProCode.value,
                promote_type: promoteType,
                promote_reduce: promoteReduce,
                promote_point: promotePoint,
            }
            window.sessionStorage.setItem("infoPayment", JSON.stringify(infoPayment))
            navigate('/cart/payment')
        }

    }

    const handleChangeMethodPay = (e) => {
        e.target.getAttribute('data-method') === 'cod' ? setCheckCod(true) : setCheckCod(false)
        setMethodPayments(e.target.getAttribute('data-method'))
    }

    const autoFillInfo = (boolean) => {

        if (boolean) {
            ipName.value = userLogin.full_name
            ipPhone.value = userLogin.phone
            ipAdd.value = userLogin.address
        } else {
            ipName.value = ''
            ipPhone.value = ''
            ipAdd.value = ''
        }
    }
    const handleChangeInputInfo = (e) => {
        e.target.value !== '' && (e.target.parentElement.querySelector('.msg-error').innerHTML = '')
    }
    const handleShowPromoteCode = (e) => {
        const blockPromote = document.getElementById('block-promote')
        if (blockPromote.classList.contains('hidden')) {
            blockPromote.classList.remove('hidden')
            e.target.innerHTML = 'Thu gọn'
        } else {
            blockPromote.classList.add('hidden')
            e.target.innerHTML = 'Xem mã khuyến mãi'
        }
    }
    const handleCancelPromoteCode = () => {
        ipProCode.value = ''
        disabledButtonExchange(false)
        setDisabledBtn(true)
    }
    const disabledButtonExchange = (boolean) => {
        const listBtnExchange = document.querySelectorAll('.btn-exchange_point')
        Array.from(listBtnExchange).map(btnExchange => btnExchange.disabled = boolean)
    }
    const handleExchangePoint = (e) => {
        let promote = JSON.parse(e.target.getAttribute('data-promote'))
        ipProCode.value = promote.code
        setPromoteReduce(promote.reduce)
        setPromoteType(promote.type)
        setPromotePoint(promote.point)
        disabledButtonExchange(true)
        setDisabledBtn(false)
    }

    return (
        <section id='sec-home_payment-info' className="grid_layout wide h-auto flex flex-col gap-8 my-16">
            <ButtonToTop />

            {/* Button Controller */}
            <div className="w-full p-4 flex justify-between shadow-xl shadow-white rounded-sm gap-2 bg-white sticky top-[128px]">
                <div className="flex justify-end">
                    <button onClick={handleCancelPayment} className="p-2 sm:!text-sm text-white font-bold rounded-sm bg-red-500">Hủy thanh toán</button>
                </div>
                <div className="flex justify-end gap-4  ">
                    <button onClick={handleBackPage} className="sm:!w-1/2 p-2 sm:!text-sm text-white font-bold rounded-sm bg-yellow-600">Quay lại trang trước</button>
                    <button onClick={handleNextPage} className="sm:!w-1/2 p-2 sm:!text-sm text-white font-bold rounded-sm bg-green-600">Tiếp theo</button>
                </div>
            </div>

            {/* Method Payment */}
            <div className="w-full grid grid-cols-2gap-4 p-4 shadow-xl shadow-white rounded-sm gap-4 bg-white ">
                <p className="col-span-2 text-2xl font-bold">Phương thức thanh toán</p>
                <div className="sm:!col-span-2 flex sm:!flex-row sm:justify-between flex-col items-center gap-4">
                    <img src={images.payments_cod} alt='cod' className="sm:!hidden w-full h-48 object-cover" />
                    <p className="text-lg font-bold">Thanh toán tại nhà - COD</p>
                    <input checked={checkCod} onChange={handleChangeMethodPay} data-method='cod' type='radio' name='method_pay' className="w-8 h-8 border border-solid border-black" />
                </div>
                <div className="sm:!col-span-2 flex sm:!flex-row sm:justify-between flex-col items-center gap-4">
                    <img src={images.payments_shop} alt='cod' className="sm:!hidden w-full h-48 object-cover" />

                    <p className="text-lg font-bold">Thanh toán tại cửa hàng</p>
                    <input checked={!checkCod} onChange={handleChangeMethodPay} data-method='shop' type='radio' name='method_pay' className="w-8 h-8 border border-solid border-black" />
                </div>
            </div>

            {/* Info Customer */}
            <div className="w-full grid grid-cols-2 gap-4 p-4 shadow-xl shadow-white rounded-sm bg-white">
                <h2 className="col-span-2 text-2xl font-bold">Nhập thông tin khách hàng</h2>
                <div className="col-span-1 w-full flex flex-col gap-2">
                    <input onChange={handleChangeInputInfo} type="text" className="input-name border outline-none rounded-full h-12 p-4 border-solid border-[var(--primary-color)] bg-white" placeholder="Nhập tên" />
                    <span className="msg-error ml-4 text-red-500 font-bold"></span>
                </div>
                <div className="col-span-1 w-full flex flex-col gap-2">
                    <input onChange={handleChangeInputInfo} type="text" className="input-phone border outline-none rounded-full h-12 p-4 border-solid border-[var(--primary-color)] bg-white" placeholder="Nhập số điện thoại" />
                    <span className="msg-error ml-4 text-red-500 font-bold"></span>
                </div>
                <div className="col-span-2 w-full flex flex-col gap-2">
                    <input onChange={handleChangeInputInfo} type="text" className="input-add col-span-2 border outline-none rounded-full h-12 p-4 border-solid border-[var(--primary-color)] bg-white" placeholder="Nhập địa chỉ" />
                    <span className="msg-error ml-4 text-red-500 font-bold"></span>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                    <input onChange={(e) => autoFillInfo(e.target.checked)} type="checkbox" className="w-4 h-4 border border-solid border-black" />
                    <p>Dùng thông tin mặc định</p>
                </div>

            </div>

            {/* Promote code */}
            <div className="w-full grid grid-cols-1 p-4 shadow-xl shadow-white rounded-sm gap-4 bg-white ">
                <p className=" text-2xl font-bold">Mã khuyến mãi</p>
                <input readOnly id='promote-code' type="text" className="read-only:bg-gray-300 border outline-none rounded-full h-12 p-4 border-solid border-[var(--primary-color)] bg-white" />

                <div className="flex justify-between gap-4">
                    <button onClick={handleShowPromoteCode}
                        className="sm:!w-auto w-[200px] p-4 rounded-sm text-white font-bold bg-[var(--primary-color)]">Xem mã khuyến mãi</button>
                    <button disabled={disabledBtn} onClick={handleCancelPromoteCode}
                        className="btn-cancel_promote sm:!w-auto w-[200px] p-4 rounded-sm text-white font-bold bg-red-600 disabled:bg-gray-300">Hủy</button>
                </div>
                <p>Điểm của bạn: {userLogin.total_point} điểm</p>
                <div id='block-promote' className="hidden space-y-10 h-96 overflow-auto p-4 bg-[#f5f5f5]">
                    {
                        promotes.map(promote => (
                            <div key={promote.code}
                                className={`${promote.point > userLogin.total_point ? 'hidden' : 'grid'} 
                                             grid-cols-5 rounded-sm border border-solid
                                            ${promote.type === 'Vận chuyển' ? 'border-teal-500' : 'border-orange-500'} `}>
                                <div className={`sm:!col-span-5 flex items-center justify-center text-white ${promote.type === 'Vận chuyển' ? 'bg-teal-500' : 'bg-orange-500'}`} Ư>
                                    <p className={`text-2xl font-bold  `}>{promote.reduce}%</p>
                                </div>
                                <div className="sm:!col-span-5 col-span-3 p-4">
                                    <p className="text-xl font-bold">{promote.name}</p>
                                    <p className="text-lg text-[#666]">{promote.des}</p>
                                    <p className="text-lg text-red-600">{promote.point} điểm</p>
                                </div>
                                <div className="sm:!col-span-5 py-2 flex justify-center items-center">
                                    <button
                                        data-promote={JSON.stringify(promote)} onClick={handleExchangePoint}
                                        className="btn-exchange_point w-24 p-2 text-white bg-blue-600 disabled:bg-gray-300">Đổi</button>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>

            {/* Info Product */}
            <div className="w-full grid grid-cols-1 p-4 shadow-xl shadow-white rounded-sm gap-2 bg-white ">
                <p className="text-2xl font-bold">Thông tin sản phẩm</p>
                {
                    productPayment.details.map((detail, index) =>
                        <div key={index} className="grid grid-cols-6 p-2 ">
                            {
                                products.map(product => (
                                    product._id === detail.id_product &&
                                    <Fragment key={product._id}>
                                        <Image src={`${process.env.REACT_APP_API_URL}/api/products/${product._id}/${product.photo}`} alt='photo' className="sm:!col-span-2 sm:!w-20 sm:!h-20 md:!w-20 md:!h-20 m-auto w-40 h-40" />
                                        <div className="sm:!col-span-4 col-span-3 flex flex-col gap-4 p-4">
                                            <p className="sm:!text-sm text-xl font-bold ">{detail.name_product}</p>
                                            <p className="sm:!text-sm text-base h-[1.5rem] line-clamp-1">{product.des}</p>
                                            <p className="sm:!text-sm text-lg text-red-600 font-bold ">{changeNumberToPrice(detail.unit_price)}</p>
                                        </div>
                                    </Fragment>
                                ))
                            }
                            <p className="sm:!col-span-6 sm:!text-sm text-lg text-black font-bold flex sm:!justify-end items-center justify-center">x{detail.quantity}</p>
                            <p className="sm:!col-span-6 sm:!text-sm text-lg text-red-600 font-bold flex sm:!justify-end items-center justify-center">{changeNumberToPrice(detail.into_money)}</p>
                        </div>
                    )
                }
            </div>
        </section >
    );
}

export default PaymentInfo;