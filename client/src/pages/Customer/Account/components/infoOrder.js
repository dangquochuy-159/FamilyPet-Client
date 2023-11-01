import axios from "axios";
import { useContext, useEffect, useState } from "react";
import CustomerContext from "~/context/CustomerContext";
import { changeNumberToPrice } from "~/utils/SupportFunction/supportFunction";

function InfoOrder() {
    const [userLogin] = useContext(CustomerContext)
    const [orders, setOrder] = useState([])
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/orders/filter?filter=id_customer&value=${userLogin._id}`).then(res => res.json())
            .then(data => {
                setOrder(data.data)
            })
    }, [])

    const changeDate = (date) => {
        const originalDate = new Date(date);
        const day = String(originalDate.getDate()).padStart(2, '0');
        const month = String(originalDate.getMonth() + 1).padStart(2, '0');
        const year = originalDate.getFullYear();
        return `${day}/${month}/${year}`;
    }
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

    return (
        <section id='sec-account_order' className="w-full h-auto mt-16 bg-white shadow-xl shadow-white p-8">
            <h2 className="text-3xl text-center font-bold pb-4">Đơn hàng đã mua</h2>
            {
                !orders.length > 0 ? <p className="text-center">Chưa có đơn hàng được mua</p> :
                    orders.map((order, index) => (
                        <div key={index} className="w-full h-auto grid grid-cols-3 gap-8 p-4 mb-8 rounded-sm bg-[#f5f5f5]">
                            <div className="col-span-3">
                                <p className="text-xl font-bold italic">Mã đơn hàng: {order._id}</p>
                                <p className="text-xl font-bold italic">Ngày mua hàng: {changeDate(order.createdAt)}</p>
                            </div>
                            <div className="sm:!col-span-3 md:!col-span-3 flex flex-col gap-4 text-lg font-medium">
                                <p className="font-bold text-xl">Thông tin khách hàng</p>
                                <p>Tài khoản: {order.account}</p>
                                <p>Họ và tên: {order.name}</p>
                                <p>Số điện thoại: {order.phone}</p>
                                <p>Địa chỉ: {order.address}</p>
                                <p>Tổng thanh toán: {changeNumberToPrice(order.total_pay)}</p>
                                <p>Hình thức thanh toán: {Object.keys(order.payments).map(key => order.payments[key] === true && key)}</p>
                            </div>
                            <div className="sm:!col-span-3 md:!col-span-3 col-span-2">
                                <p className="font-bold text-xl">Sản phẩm</p>
                                <div className="grid grid-cols-4 gap-2">
                                    <p className='text-lg font-medium'>Tên</p>
                                    <p className='text-lg font-medium'>Đơn giá</p>
                                    <p className='text-lg font-medium'>Số lượng</p>
                                    <p className='text-lg font-medium'>Thành tiền</p>
                                    {
                                        order.detail.map(detail => (
                                            <>
                                                <p className='mb-2 border-b border-solid border-black text-lg font-normal'>{detail['name_product']}</p>
                                                <p className='mb-2 border-b border-solid border-black text-lg font-normal'>{changeNumberToPrice(detail['unit_price'])}</p>
                                                <p className='mb-2 border-b border-solid border-black text-lg font-normal'>{detail['quantity']}</p>
                                                <p className='mb-2 border-b border-solid border-black text-lg font-normal'>{changeNumberToPrice(detail['into_money'])}</p>
                                            </>
                                        ))
                                    }
                                </div>
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

        </section>
    );
}

export default InfoOrder;