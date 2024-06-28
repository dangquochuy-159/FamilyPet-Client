import { useEffect, useState } from 'react';
import { Button } from '~/components/Button';
import ConnectError from '~/components/ConnectError';
import { CheckIcon, FilterIcon, InfoIcon, ListIcon } from '~/components/Icons';
import Modal from '~/components/Modal/Modal';
import ModalDetailProduct from './modalDetailProduct';
import ModalInfoOrder from './modalInfoOrder';
import { changeDate } from '~/utils/SupportFunction/supportFunction';
import { API_ORDER, API_ORDER_FILTER } from '~/api/api';


function Order() {

    const [connectServer, setConnectServer] = useState(false)
    const [orders, setOrder] = useState([])
    const [filterOrder, setFilterOrder] = useState([])

    const filterEle = document.querySelectorAll('.filter')

    const changeStatus = {
        wait_confirm: 'Đang đợi nhận hàng',
        confirmed: 'Đã nhận hàng',
    }

    const changePayments = {
        cod: 'Thanh toán tại nhà',
        shop: 'Thanh toán tại cửa hàng'
    }

    useEffect(() => {
        fetch(API_ORDER)
            .then(res => res.json())
            .then(data => {
                setConnectServer(true)
                setOrder(data.data)
                setFilterOrder(data.data)
            })
            .catch(err => setConnectServer(false))
    }, [])
    const handleShowAllOrder = () => {
        Array.from(filterEle).map(filter => {
            return filter.value = ''
        })
        setFilterOrder(orders)
    }
    const handleFilterOrder = () => {
        const query = []
        Array.from(filterEle).map(filter => {
            filter.value !== '' && query.push(`filter=${filter.name}&value=${filter.value}`)
            return query
        })
        const queryString = query.join('&')
        fetch(`${API_ORDER_FILTER}?${queryString}`)
            .then(res => res.json())
            .then(data => {
                setFilterOrder(data.data)
            })
    }

    return (
        <>
            {
                !connectServer ? <ConnectError /> :
                    <div className="w-full h-full sm:!h-full bg-white p-4 flex flex-col gap-y-5">
                        <div className="w-full h-1/6 sm:!h-1/6 flex flex-col gap-y-2 items-center justify-center">
                            <div className='flex sm:!w-full sm:flex-col gap-2'>
                                <div className='sm:!w-full flex gap-2'>
                                    <select className='sm:w-1/2 md:!h-1/2 filter p-2 border border-solid border-black' name='payments' >
                                        <option value="">Hình thức thanh toán</option>
                                        <option value="cod">Thanh toán tại nhà</option>
                                        <option value="shop">Thanh toán tại cửa hàng</option>
                                    </select>
                                    <select className='sm:w-1/2 md:!h-1/2 filter p-2 border border-solid border-black' name='status' >
                                        <option value="">Trạng thái</option>
                                        <option value="wait_confirm">Đang đợi nhận hàng</option>
                                        <option value="confirmed">Đã nhận hàng</option>
                                    </select>
                                </div>
                                <div className='sm:w-full md: flex md:flex-wrap gap-2'>
                                    <input className='sm:w-1/3 md:w-full filter p-2 border border-solid border-black' name='total_pay' type='number' placeholder='Tổng tiền' />
                                    <div className='sm:w-2/3 md:w-full flex gap-2'>
                                        <Button title='Lọc' type='primary' rightIcon={<FilterIcon width='14px' height='14px' />}
                                            className='sm:w-full md:w-full bg-red-500 text-white m-auto' onClick={handleFilterOrder}
                                        />
                                        <Button title='All' type='primary' rightIcon={<CheckIcon width='14px' height='14px' />}
                                            className='sm:w-full md:w-full bg-green-500 text-white m-auto' onClick={handleShowAllOrder}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='w-full h-5/6 sm:!h-5/6 flex flex-col gap-y-4'>
                            <h2 className='font-bold'>Tổng số đơn hàng: {filterOrder.length} </h2>
                            <div className='wrapper-table' style={{ maxHeight: '100%' }}>
                                <table>
                                    <thead className="text-black font-bold text-lg bg-[#71cbe8]">
                                        <tr>
                                            <th scope='col'>#</th>
                                            <th scope='col'>Tài khoản</th>
                                            <th scope='col' className='sm:hidden'>Tên khách hàng</th>
                                            <th scope='col' className='sm:hidden'>Số điện thoại</th>
                                            <th scope='col' className='sm:hidden md:hidden'>Địa chỉ</th>
                                            <th scope='col' className='sm:hidden'>Tổng tiền</th>
                                            <th scope='col' className='sm:hidden md:hidden'>Hinh thức thanh toán</th>
                                            <th scope='col' className='sm:hidden md:hidden'>Chi tiết sản phẩm</th>
                                            <th scope='col' className='sm:!block md:!block hidden'>Thông tin đơn hàng</th>
                                            <th scope='col' className='sm:hidden md:hidden'>Trạng thái</th>
                                            <th scope='col' className='sm:hidden md:hidden'>Ngày thanh toán</th>

                                        </tr>
                                    </thead>
                                    <tbody className="font-normal text-[#000]">

                                        {
                                            filterOrder.length === 0 ? <tr><td colSpan='10'>Không tìm thấy kết quả</td></tr> :
                                                filterOrder.map((order, index) =>
                                                    <tr key={index}>
                                                        <td className='whitespace-pre-wrap'>{index + 1}</td>
                                                        <td className='whitespace-pre-wrap'>{order.account}</td>
                                                        <td className='whitespace-pre-wrap sm:hidden'>{order.name}</td>
                                                        <td className='whitespace-pre-wrap sm:hidden'>{order.phone}</td>
                                                        <td className='whitespace-pre-wrap sm:hidden md:hidden'>{order.address}</td>
                                                        <td className='whitespace-pre-wrap sm:hidden'>{order.total_pay}</td>
                                                        <td className='whitespace-pre-wrap sm:hidden md:hidden'>
                                                            {
                                                                Object.keys(order.payments).map(key => order.payments[key] === true && changePayments[key])
                                                            }
                                                        </td>
                                                        <td className='whitespace-pre-wrap sm:hidden md:hidden'>
                                                            <Modal className="w-2/3 h-auto"
                                                                trigger={
                                                                    <div className="w-auto h-auto">
                                                                        <Button type='primary' rightIcon={<InfoIcon width='14px' height='14px' />}
                                                                            className='sm:!hidden bg-blue-500 text-white m-auto'
                                                                        />
                                                                    </div>
                                                                }
                                                            >
                                                                <ModalDetailProduct data={order.detail} />
                                                            </Modal>


                                                        </td>
                                                        <td className='hidden sm:!block md:!block'>
                                                            <Modal className="w-full h-[90vh]"
                                                                trigger={
                                                                    <div className="w-auto h-auto">
                                                                        <Button type='primary' rightIcon={<ListIcon width='14px' height='14px' />}
                                                                            className=' bg-red-500 text-white m-auto'
                                                                        />
                                                                    </div>
                                                                }
                                                            >
                                                                <ModalInfoOrder data={order} changePayments={changePayments} changeStatus={changeStatus} />
                                                            </Modal>
                                                        </td>
                                                        <td className='whitespace-pre-wrap sm:hidden md:hidden'>
                                                            {
                                                                Object.keys(order.status).map(key => order.status[key] === true && changeStatus[key])
                                                            }
                                                        </td>
                                                        <td className='whitespace-pre-wrap sm:hidden md:!hidden'>{changeDate(order.createdAt)}</td>
                                                    </tr>
                                                )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
}

export default Order;