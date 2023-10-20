import { useEffect, useState } from 'react';
import { Button } from '~/components/Button';
import ConnectError from '~/components/ConnectError';
import { CheckIcon, FilterIcon, InfoIcon } from '~/components/Icons';
import Modal from '~/components/Modal/modal';
import ModalInfoOrder from './modalInfoOrder';


function Order() {

    const [connectServer, setConnectServer] = useState(false)
    const [orders, setOrder] = useState([])
    const [filterOrder, setFilterOrder] = useState([])

    const filterEle = document.querySelectorAll('.filter')

    const changeStatus = {
        wait_confirm: 'Đang đợi nhận hàng',
        confirmed: 'Đã nhận hàng',
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/orders`)
            .then(res => res.json())
            .then(data => {
                setConnectServer(true)
                setOrder(data.data)
                setFilterOrder(data.data)
            })
            .catch(err => setConnectServer(false))
    }, [])
    const handleShowAllOrder = () => { }
    const handleFilterOrder = () => {
        const query = []
        Array.from(filterEle).map(filter => {
            filter.value !== '' && query.push(`filter=${filter.name}&value=${filter.value}`)
            return query
        })
        const queryString = query.join('&')
        fetch(`${process.env.REACT_APP_API_URL}/api/orders/filter?${queryString}`)
            .then(res => res.json())
            .then(data => {
                setFilterOrder(data.data)
            })
    }
    const changeDate = (date) => {
        const originalDate = new Date(date);
        const day = String(originalDate.getDate()).padStart(2, '0');
        const month = String(originalDate.getMonth() + 1).padStart(2, '0');
        const year = originalDate.getFullYear();
        const hours = String(originalDate.getHours()).padStart(2, '0');
        const minutes = String(originalDate.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes} - ${day}/${month}/${year}`;
    }
    return (
        <div className="wrapper-page flex flex-col  ">
            {
                !connectServer ? <ConnectError /> :
                    <div className="w-full h-full bg-white p-4 flex flex-col gap-y-5">
                        <div className="w-full h-1/6 flex flex-col gap-y-2 items-center justify-center">
                            <div className='flex gap-x-2'>
                                <Button title='All' type='primary' rightIcon={<CheckIcon width='14px' height='14px' />}
                                    className='bg-green-500 text-white m-auto' onClick={handleShowAllOrder}
                                />
                                <select className='filter p-2 border border-solid border-black' name='payments' >
                                    <option value="">Hình thức thanh toán</option>
                                    <option value="cod">COD</option>
                                    <option value="atm">ATM</option>
                                    <option value="e_wallet">E-wallet</option>
                                </select>
                                <select className='filter p-2 border border-solid border-black' name='status' >
                                    <option value="">Trạng thái</option>
                                    <option value="wait_confirm">Đang đợi nhận hàng</option>
                                    <option value="confirmed">Đã nhận hàng</option>
                                </select>
                                <input className='filter p-2 border border-solid border-black' name='total_pay' type='number' placeholder='Tổng tiền' />
                                <Button title='Lọc' type='primary' rightIcon={<FilterIcon width='14px' height='14px' />}
                                    className='bg-red-500 text-white m-auto' onClick={handleFilterOrder}
                                />
                            </div>

                        </div>
                        <div className='w-full h-5/6 flex flex-col gap-y-4'>
                            <div className='wrapper-table'>
                                <table>
                                    <thead className="text-black font-bold text-lg bg-[#71cbe8]">
                                        <tr>
                                            <th scope='col'>#</th>
                                            <th scope='col'>Tài khoản</th>
                                            <th scope='col'>Tên khách hàng</th>
                                            <th scope='col'>Số điện thoại</th>
                                            <th scope='col'>Địa chỉ</th>
                                            <th scope='col'>Tổng tiền</th>
                                            <th scope='col'>Hinh thức thanh toán</th>
                                            <th scope='col'>Chi tiết</th>
                                            <th scope='col'>Trạng thái</th>
                                            <th scope='col' className='w-1/5 border border-solid border-black p-4'>Ngày thanh toán</th>

                                        </tr>
                                    </thead>
                                    <tbody className="font-normal text-[#000]">

                                        {
                                            filterOrder.length === 0 ? <tr><td colSpan='9'>Không tìm thấy kết quả</td></tr> :
                                                filterOrder.map((order, index) =>
                                                    <tr key={index}>
                                                        <td className='whitespace-pre-wrap'>{index + 1}</td>
                                                        <td className='whitespace-pre-wrap'>{order.account}</td>
                                                        <td className='whitespace-pre-wrap'>{order.name}</td>
                                                        <td className='whitespace-pre-wrap'>{order.phone}</td>
                                                        <td className='whitespace-pre-wrap'>{order.address}</td>
                                                        <td className='whitespace-pre-wrap'>{order.total_pay}</td>
                                                        <td className='whitespace-pre-wrap'>
                                                            {
                                                                Object.keys(order.payments).map(key => order.payments[key] === true && key)
                                                            }
                                                        </td>
                                                        <td className='whitespace-pre-wrap'>
                                                            <Modal className="w-2/3 h-auto"
                                                                trigger={
                                                                    <div className="w-auto h-auto">
                                                                        <Button type='primary' rightIcon={<InfoIcon width='14px' height='14px' />}
                                                                            className=' bg-blue-500 text-white m-auto'
                                                                        />
                                                                    </div>
                                                                }
                                                            >
                                                                <ModalInfoOrder data={order.detail} />
                                                            </Modal>
                                                        </td>
                                                        <td className='whitespace-pre-wrap'>
                                                            {
                                                                Object.keys(order.status).map(key => order.status[key] === true && changeStatus[key])
                                                            }
                                                        </td>
                                                        <td className='whitespace-pre-wrap'>{changeDate(order.createdAt)}</td>
                                                    </tr>
                                                )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
}

export default Order;