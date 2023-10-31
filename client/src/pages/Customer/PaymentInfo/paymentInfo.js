import axios from "axios";
import { Fragment, useContext, useEffect, useState } from "react";
import { useActionData } from "react-router-dom";
import ButtonToTop from "~/components/ButtonToTop";
import Image from "~/components/Image";
import CustomerContext from "~/context/CustomerContext";

function PaymentInfo() {
    const [userLogin] = useContext(CustomerContext)
    const dataPayment = JSON.parse(window.sessionStorage.getItem("paymentInfo"))

    const [products, setProducts] = useState([])
    const [promotes, setPromotes] = useState([])
    const [disabledBtn, setDisabledBtn] = useState(true)
    const [pointPromote, setPointPromote] = useState(0)
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/products`).then(res => res.json()).then(data => {
            setProducts(data.data)
        })
        fetch(`${process.env.REACT_APP_API_URL}/api/promotes`).then(res => res.json()).then(data => {
            setPromotes(data.data)
        })
    }, [])

    const autoFillInfo = (boolean) => {
        const ipName = document.querySelector('.input-name')
        const ipPhone = document.querySelector('.input-phone')
        const ipAdd = document.querySelector('.input-add')
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
    const handlePay = () => {
        // window.sessionStorage.removeItem("paymentInfo")
        // window.location.reload();
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

    const disabledButtonExchange = (boolean) => {
        const listBtnExchange = document.querySelectorAll('.btn-exchange_point')
        Array.from(listBtnExchange).map(btnExchange => btnExchange.disabled = boolean)
    }

    const ipProCode = document.getElementById('promote-code')
    const handleExchangePoint = (e) => {
        let point = e.target.getAttribute('data-point')
        let code = e.target.getAttribute('data-code')
        ipProCode.value = code
        axios.put(`${process.env.REACT_APP_API_URL}/api/users/${userLogin._id}/change?point=${point}&type=down`)
            .then((res) => console.log(res.data.message))
        disabledButtonExchange(true)
        setPointPromote(point)
        setDisabledBtn(false)
    }

    const handleCancelPromoteCode = () => {
        ipProCode.value = ''
        axios.put(`${process.env.REACT_APP_API_URL}/api/users/${userLogin._id}/change?point=${pointPromote}&type=up`)
            .then((res) => console.log(res.data.message))
        disabledButtonExchange(false)
        setDisabledBtn(true)

    }
    return (
        <section id='sec-home_payment-info' className="grid_layout wide h-auto flex flex-col gap-8 my-16">
            <ButtonToTop />
            <h2> Payment Info</h2>
            <button onClick={() => console.log(dataPayment)}>Click</button>
            <button onClick={handlePay}>Thanh Toán</button>
            <div className="w-full p-4 shadow-xl shadow-white rounded-sm gap-2 bg-white sticky top-[128px]">
                <div className="flex justify-end gap-4  ">
                    <button className="sm:!w-1/2 p-2 sm:!text-sm text-white font-bold rounded-sm bg-yellow-600">Quay lại trang trước</button>
                    <button className="sm:!w-1/2 p-2 sm:!text-sm text-white font-bold rounded-sm bg-green-600">Tiếp theo</button>
                </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-4 p-4 shadow-xl shadow-white rounded-sm bg-white">
                <h2 className="col-span-2 text-2xl font-bold">Nhập thông tin hóa đơn</h2>
                <input type="text" className="input-name border outline-none rounded-full h-12 p-4 border-solid border-[var(--primary-color)] bg-white" placeholder="Nhập tên" />
                <input type="text" className="input-phone border outline-none rounded-full h-12 p-4 border-solid border-[var(--primary-color)] bg-white" placeholder="Nhập số điện thoại" />
                <input type="text" className="input-add col-span-2 border outline-none rounded-full h-12 p-4 border-solid border-[var(--primary-color)] bg-white" placeholder="Nhập địa chỉ" />
                <div className="col-span-2 flex items-center gap-2">
                    <input onChange={(e) => autoFillInfo(e.target.checked)} type="checkbox" className="w-4 h-4 border border-solid border-black" />
                    <p>Dùng thông tin mặc định</p>
                </div>

            </div>
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
                                    <button data-code={promote.code} data-point={promote.point} onClick={handleExchangePoint}
                                        className="btn-exchange_point w-24 p-2 text-white bg-blue-600 disabled:bg-gray-300">Đổi</button>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>

            <div className="w-full grid grid-cols-1 p-4 shadow-xl shadow-white rounded-sm gap-2 bg-white ">
                <p className="text-2xl font-bold">Thông tin sản phẩm</p>
                {
                    dataPayment.details.map((detail, index) =>
                        <div key={index} className="grid grid-cols-6 p-2 ">
                            {
                                products.map(product => (
                                    product._id === detail.id_product &&
                                    <Fragment key={product._id}>
                                        <Image src={`${process.env.REACT_APP_API_URL}/api/products/${product._id}/${product.photo}`} alt='photo' className="sm:!col-span-2 sm:!w-20 sm:!h-20 md:!w-20 md:!h-20 m-auto w-40 h-40" />
                                        <div className="sm:!col-span-4 col-span-3 flex flex-col gap-4 p-4">
                                            <p className="sm:!text-sm text-xl font-bold ">{product.name}</p>
                                            <p className="sm:!text-sm text-base h-[1.5rem] line-clamp-1">{product.des}</p>
                                            <p className="sm:!text-sm text-lg text-red-600 font-bold ">{detail.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                        </div>
                                    </Fragment>
                                ))
                            }
                            <p className="sm:!col-span-6 sm:!text-sm text-lg text-black font-bold flex sm:!justify-end items-center justify-center">x{detail.quantity}</p>
                            <p className="sm:!col-span-6 sm:!text-sm text-lg text-red-600 font-bold flex sm:!justify-end items-center justify-center">{detail.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                        </div>
                    )
                }

            </div>
            <div className="w-full flex flex-col gap-2 justify-end p-4 shadow-xl shadow-white rounded-sm bg-[var(--primary-color)]">
                <div className="flex justify-end">
                    <button className="p-2 sm:!text-sm text-white font-bold rounded-sm bg-red-500">Hủy thanh toán</button>
                </div>
                <p className="text-lg text-white ">Tổng đơn hàng: <span className="ml-2">{dataPayment.total_pay.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></p>
                <p className="text-lg text-white">Khuyến mãi: <span className="ml-2">-{Number('0').toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></p>
                <p className="text-lg text-white">Phí vận chuyển: <span className="ml-2">{Number('29000').toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></p>
                <p className="text-lg text-white ">Giảm phí vận chuyển: <span className="ml-2">-{dataPayment.total_pay.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></p>
                <p className="text-xl text-white font-bold">Tổng thanh toán: <span className="ml-2 text-red-600">{Number('1000000').toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></p>
            </div>

        </section >
    );
}

export default PaymentInfo;