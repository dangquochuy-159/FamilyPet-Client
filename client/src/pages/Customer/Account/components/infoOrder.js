import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Image from "~/components/Image";
import Modal from "~/components/Modal/Modal";
import CustomerContext from "~/context/CustomerContext";
import { changeDate, changeNumberToPrice } from "~/utils/SupportFunction/supportFunction";
import ModalEvaluate from "./modalEvaluate";

function InfoOrder() {
    const [userLogin] = useContext(CustomerContext)
    const [orders, setOrder] = useState([])
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/orders/filter?filter=id_customer&value=${userLogin._id}`).then(res => res.json())
            .then(data => setOrder(data.data))
        fetch(`${process.env.REACT_APP_API_URL}/api/products`).then(res => res.json())
            .then(data => setProducts(data.data))
    }, [])


    const changeStatus = {
        wait_confirm: 'Xác nhận đã nhận hàng',
        confirmed: 'Đã nhận hàng',
    }

    const handleConfirmOrder = (e) => {
        let id = e.target.getAttribute('data-id')
        axios.put(`${process.env.REACT_APP_API_URL}/api/orders/${id}`)
            .then(() => {
                alert('Xác nhận đơn hàng thành công')
                window.location.reload()
            })
    }

    const handleEvaluate = () => {

    }

    return (
        <section id='sec-account_order' className="w-full h-auto mt-16 bg-white shadow-xl shadow-white sm:!px-0 p-8">
            <h2 className="text-3xl text-center font-bold pb-4">Đơn hàng đã mua</h2>
            {
                !orders.length > 0 ? <p className="text-center">Chưa có đơn hàng được mua</p> :
                    orders.map((order, index) => (
                        <div key={index} className="w-full h-auto grid grid-cols-3 gap-8 p-4 mb-8 rounded-sm bg-[#f5f5f5]">
                            <div className="col-span-3">
                                <p className="text-xl font-bold italic">Mã đơn hàng: {order._id}</p>
                                <p className="text-xl font-bold italic">Ngày mua hàng: {changeDate(order.createdAt)}</p>
                            </div>
                            <div className="sm:!col-span-3 md:!col-span-3 col-span-3 flex flex-col gap-4 text-lg font-medium">
                                <p className="font-bold text-xl">Thông tin khách hàng</p>
                                <p>Tài khoản: {order.account}</p>
                                <p>Họ và tên: {order.name}</p>
                                <p>Số điện thoại: {order.phone}</p>
                                <p>Địa chỉ: {order.address}</p>
                                <p>Tổng thanh toán: {changeNumberToPrice(order.total_pay)}</p>
                                <p>Hình thức thanh toán: {order.payments['cod'] === true ? 'Thanh toán tại nhà - COD' : 'Thanh toán tại cửa hàng'}</p>
                            </div>
                            <div className="sm:!col-span-3 md:!col-span-3 col-span-3 space-y-2">
                                <p className="font-bold text-xl">Sản phẩm</p>

                                {
                                    order.detail.map(detail => (
                                        <div className="grid grid-cols-6 gap-2 my-2 p-4 bg-white">
                                            <>
                                                {
                                                    products.map(product => product._id === detail.id_product &&
                                                        <Image src={product.photo[0]} className='sm:!col-span-6 md:!col-span-6 w-14 h-14 m-auto' />)
                                                }
                                                <p className='sm:!col-span-6 md:!col-span-6 flex justify-center items-center text-lg font-normal'>{detail.name_product}</p>
                                                <p className='sm:!col-span-2 md:!col-span-2 flex justify-center items-center text-lg text-red-600 font-normal'>{changeNumberToPrice(detail['unit_price'])}</p>
                                                <p className='sm:!col-span-2 md:!col-span-2 flex justify-center items-center text-lg font-normal'>x {detail.quantity}</p>
                                                <p className='sm:!col-span-2 md:!col-span-2 flex justify-center items-center text-lg text-red-600 font-normal'>{changeNumberToPrice(detail['into_money'])}</p>

                                                <Modal
                                                    className="sm:w-full sm:!h-[90vh] md:w-full md:!h-[90vh] w-2/3 h-auto"
                                                    trigger={
                                                        <div className="sm:!col-span-6 sm:!p-2 md:!col-span-6 md:!p-2 flex justify-center">
                                                            <button onClick={handleEvaluate}
                                                                className='w-full sm:!w-1/2 md:!w-1/2 p-2 text-lg text-white font-normal rounded-sm bg-green-500'>Đánh giá</button>
                                                        </div>
                                                    }
                                                >
                                                    <ModalEvaluate name_product={detail.name_product} id_product={detail.id_product} user_id={userLogin._id} user_name={userLogin.full_name} />
                                                </Modal>
                                            </>
                                        </div>
                                    ))
                                }

                            </div>
                            <div className="col-span-3 flex justify-end">
                                <button data-id={order._id} onClick={handleConfirmOrder}
                                    disabled={order.status["confirmed"]}
                                    className="p-4 text-white font-bold rounded-md bg-[var(--primary-color)] disabled:bg-slate-400" >
                                    {Object.keys(order.status).map(key => order.status[key] === true && changeStatus[key])}
                                </button>
                            </div>
                        </div>
                    ))
            }

        </section >
    );
}

export default InfoOrder;