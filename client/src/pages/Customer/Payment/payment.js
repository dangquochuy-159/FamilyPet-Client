import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonToTop from '~/components/ButtonToTop';
import CustomerContext from '~/context/CustomerContext';
import { changeNumberToPrice, handleLoadingPage } from '~/utils/SupportFunction/supportFunction';

const Payment = (props) => {
    const [userLogin] = useContext(CustomerContext)
    const infoPayment = JSON.parse(window.sessionStorage.getItem("infoPayment"))

    const navigate = useNavigate()

    const transportFee = 29000
    let reduceOrder = 0
    let reduceShip = 0
    let totalPay = infoPayment.total_pay

    if (infoPayment.promote_type === 'Đơn hàng') {
        reduceOrder = infoPayment.total_pay * (infoPayment.promote_reduce / 100)
        totalPay = infoPayment.total_pay - reduceOrder + transportFee
    } else {
        reduceShip = transportFee * (infoPayment.promote_reduce / 100)
        totalPay = infoPayment.total_pay - reduceShip + transportFee
    }

    const handleCancelPayment = async () => {
        window.sessionStorage.removeItem("productPayment")
        window.sessionStorage.removeItem("infoPayment")
        await handleLoadingPage()
        navigate('/')
    }

    const handleBackPage = async () => {
        await handleLoadingPage()
        window.history.back();
    }

    const handlePayment = () => {
        const data = {
            id_customer: userLogin._id,
            name: infoPayment.name,
            phone: infoPayment.phone,
            address: infoPayment.address,
            total_pay: totalPay,
            detail: infoPayment.details,
            payments: infoPayment.payments,
            account: userLogin.email !== null ? userLogin.email : userLogin.phone_login
        }

        const listProduct = (infoPayment.details.map(detail => detail.id_product))
        const listUpdateQuantity = infoPayment.details.map(detail => {
            return { id: detail.id_product, quantity: detail.quantity }

        })
        axios.put(`${process.env.REACT_APP_API_URL}/api/products/quantity`, listUpdateQuantity)
            .then(res => { })

        axios.post(`${process.env.REACT_APP_API_URL}/api/orders`, data)
            .then(res => {
                alert('Thanh toán đơn hàng thành công')
                axios.put(`${process.env.REACT_APP_API_URL}/api/users/${userLogin._id}/change?point=${infoPayment.promote_point}&type=down`)
                    .then((res) => {
                        axios.delete(`${process.env.REACT_APP_API_URL}/api/users/${userLogin._id}/cart`, { data: listProduct }).then(async () => {
                            window.sessionStorage.removeItem("productPayment")
                            window.sessionStorage.removeItem("infoPayment")
                            await handleLoadingPage()
                            window.location.href = '/'
                        })
                    })
            })
    }

    return (
        <section className='grid_layout wide h-auto flex flex-col gap-8 my-16' >
            <ButtonToTop />
            <div className="w-full p-4 flex justify-between shadow-xl shadow-white rounded-sm gap-2 bg-white sticky top-[128px]">
                <div className="flex justify-end">
                    <button onClick={handleCancelPayment} className="p-2 sm:!text-sm text-white font-bold rounded-sm bg-red-500">Hủy thanh toán</button>
                </div>
                <div className="flex justify-end gap-4  ">
                    <button onClick={handleBackPage} className="sm:!w-1/2 p-2 sm:!text-sm text-white font-bold rounded-sm bg-yellow-600">Quay lại trang trước</button>
                    <button onClick={handlePayment} className="sm:!w-1/2 p-2 sm:!text-sm text-white font-bold rounded-sm bg-green-600">Thanh toán</button>
                </div>

            </div>

            <div className="w-full flex flex-col gap-2 justify-end p-4 shadow-xl shadow-white rounded-sm bg-white">
                <p className="col-span-2 text-2xl font-bold">Thông tin đơn hàng</p>
                <p>Tên khách hàng: <span className='ml-2'>{infoPayment.name}</span></p>
                <p>Số điện thoại: <span className='ml-2'>{infoPayment.phone}</span> </p>
                <p>Địa chỉ: <span className='ml-2'>{infoPayment.address}</span></p>
                <p>Phương thức thanh toán: <span className='ml-2'>{infoPayment.payments === 'cod' ? 'Thanh toán tại nhà - COD' : 'Thanh toán tại cửa hàng'}</span></p>
                <p>Sản phẩm: </p>
                {
                    infoPayment.products.map((product) => (
                        infoPayment.details.map((detail) => (
                            product._id === detail.id_product &&
                            <div className='grid grid-cols-4'>
                                <p>{product.name}</p>
                                <p>x {detail.quantity}</p>
                                <p>{changeNumberToPrice(detail.unit_price)}</p>
                                <p>{changeNumberToPrice(detail.into_money)}</p>
                            </div>
                        ))
                    ))
                }
            </div>

            <div className="w-full flex flex-col gap-2 justify-end p-4 shadow-xl shadow-white rounded-sm bg-[var(--primary-color)]">
                <p className="text-lg text-white ">Tổng đơn hàng: <span className="ml-2">{changeNumberToPrice(infoPayment.total_pay)}</span></p>
                <p className="text-lg text-white">Khuyến mãi: <span className="ml-2">-{changeNumberToPrice(reduceOrder)}</span></p>
                <p className="text-lg text-white">Phí vận chuyển: <span className="ml-2">{changeNumberToPrice(29000)}</span></p>
                <p className="text-lg text-white ">Giảm phí vận chuyển: <span className="ml-2">-{changeNumberToPrice(reduceShip)}</span></p>
                <p className="text-xl text-white font-bold">Tổng thanh toán: <span className="ml-2 text-red-600">{changeNumberToPrice(totalPay)}</span></p>
            </div>
        </section>
    );
};

export default Payment;



