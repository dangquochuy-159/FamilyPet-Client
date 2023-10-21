import React from "react";
import { useEffect, useState } from 'react';
import _ from 'lodash';
import ConnectError from '~/components/ConnectError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faClipboardList, faPaste, faPenNib, faUsers } from '@fortawesome/free-solid-svg-icons';
import { BarChart, PieChart } from "~/components/Chart";

function Dashboard() {
    const [connectServer, setConnectServer] = useState(false)
    const [categorys, setCategorys] = useState([])
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [users, setUser] = useState([])
    const [evaluates, setEvaluates] = useState([])

    const [dataChartProduct, setDataChartProduct] = useState({ labels: "", datasets: [{ label: "", data: 0 }] })
    const [dataChartOrder, setDataChartOrder] = useState({ labels: "", datasets: [{ label: "", data: 0 }] })


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/users`).then(res => res.json()).then(data => {
            setConnectServer(true)
            setUser(data.data)
        }).catch(err => setConnectServer(false))

        fetch(`${process.env.REACT_APP_API_URL}/api/products`).then(res => res.json()).then(data => {
            setProducts(data.data)
            processDataProduct(data.data)
        })

        fetch(`${process.env.REACT_APP_API_URL}/api/orders`).then(res => res.json()).then(data => {
            setOrders(data.data)
            processDataOrder(data.data)
        })

        fetch(`${process.env.REACT_APP_API_URL}/api/categorys`).then(res => res.json()).then(data => { setCategorys(data.data) })

        fetch(`${process.env.REACT_APP_API_URL}/api/evaluates`).then(res => res.json()).then(data => { setEvaluates(data.data) })
    }, [])

    const processDataProduct = (data) => {
        const groupedData = _.groupBy(data, 'category');
        setDataChartProduct({
            labels: (Object.keys(groupedData)),
            datasets: [
                {
                    label: 'Số lượng',
                    data: Object.values(groupedData).map((group) => group.length),
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                    ],
                    borderWidth: 1,
                    display: true,
                    align: 'center',
                    font: {
                        size: "18px",
                    }
                },
            ],
        })
    };
    const processDataOrder = (data) => {
        const data_month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        const data_order = {}
        data.map(order => {
            const date = new Date(order.createdAt);
            const month = date.getUTCMonth() + 1;
            data_order[month] ? data_order[month] = data_order[month] + order.total_pay : data_order[month] = order.total_pay
            return data_order
        })
        setDataChartOrder({
            labels: data_month.map(month => 'Tháng' + month),
            datasets: [
                {
                    label: 'Doanh thu sản phẩm 2023',
                    data: data_month.map(month => Object.keys(data_order).includes(month.toString()) ? data_order[month] : 0),
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                    ],
                    borderWidth: 1,
                    display: true,
                    align: 'center',
                    font: {
                        size: "18px",
                    }
                },
            ],
        })
    };
    return (
        <>
            {
                !connectServer ? <ConnectError /> :
                    <div className="w-full sm:!h-auto h-full bg-white sm:!pb-[64px] p-4 flex flex-col gap-y-5">
                        <div className='w-full sm:h-auto h-1/6 flex sm:flex-col gap-x-2'>
                            <div className='sm:w-full w-1/5 h-full py-2 pl-4 flex justify-start items-center gap-x-5 sm:!border-0 border border-solid border-[#ccc] rounded'>
                                <div className='w-[50px] h-[50px] shadow-lg shadow-current flex justify-center items-center bg-red-500 rounded-full'>
                                    <FontAwesomeIcon icon={faUsers} className='w-1/2 h-1/2 text-white' />
                                </div>
                                <div className="sm:flex items-center justify-center gap-x-5">
                                    <p className='text-sm text-[#777] font-medium '>Khách hàng đăng ký</p>
                                    <p className='text-xl font-bold'>{users.length}</p>
                                </div>
                            </div>
                            <div className='sm:w-full w-1/5 h-full py-2 pl-4 flex justify-start items-center gap-x-5 sm:!border-0 border border-solid border-[#ccc] rounded'>
                                <div className='w-[50px] h-[50px] shadow-lg shadow-current flex justify-center items-center bg-green-500 rounded-full'>
                                    <FontAwesomeIcon icon={faBox} className='w-1/2 h-1/2 text-white' />

                                </div>
                                <div className="sm:flex items-center justify-center gap-x-5">
                                    <p className='text-sm text-[#777] font-medium '>Tổng sản phẩm</p>
                                    <p className='text-xl font-bold'>{products.length}</p>
                                </div>
                            </div>
                            <div className='sm:w-full w-1/5 h-full py-2 pl-4 flex justify-start items-center gap-x-5 sm:!border-0 border border-solid border-[#ccc] rounded'>
                                <div className='w-[50px] h-[50px] shadow-lg shadow-current flex justify-center items-center bg-blue-500 rounded-full'>
                                    <FontAwesomeIcon icon={faPaste} className='w-1/2 h-1/2 text-white' />
                                </div>
                                <div className="sm:flex items-center justify-center gap-x-5">
                                    <p className='text-sm text-[#777] font-medium '>Tổng đơn hàng</p>
                                    <p className='text-xl font-bold'>{orders.length}</p>
                                </div>
                            </div>
                            <div className='sm:w-full w-1/5 h-full py-2 pl-4 flex justify-start items-center gap-x-5 sm:!border-0 border border-solid border-[#ccc] rounded'>
                                <div className='w-[50px] h-[50px] shadow-lg shadow-current flex justify-center items-center bg-yellow-500 rounded-full'>
                                    <FontAwesomeIcon icon={faClipboardList} className='w-1/2 h-1/2 text-white' />
                                </div>
                                <div className="sm:flex items-center justify-center gap-x-5">
                                    <p className='text-sm text-[#777] font-medium '>Tổng danh mục</p>
                                    <p className='text-xl font-bold'>{categorys.length}</p>
                                </div>
                            </div>
                            <div className='sm:w-full w-1/5 h-full py-2 pl-4 flex justify-start items-center gap-x-5 sm:!border-0 border border-solid border-[#ccc] rounded'>
                                <div className='w-[50px] h-[50px] shadow-lg shadow-current flex justify-center items-center bg-violet-500 rounded-full'>
                                    <FontAwesomeIcon icon={faPenNib} className='w-1/2 h-1/2 text-white' />
                                </div>
                                <div className="sm:flex items-center justify-center gap-x-5">
                                    <p className='text-sm text-[#777] font-medium '>Tổng lượt đánh giá</p>
                                    <p className='text-xl font-bold'>{evaluates.length}</p>
                                </div>
                            </div>
                        </div>
                        <div className='w-full sm:h-full h-5/6 flex sm:flex-col gap-y-2'>
                            <div className="sm:w-full w-1/3 h-full flex flex-col justify-center items-center p-4 ">
                                <h2 className="py-2 text-xl text-center font-bold">Biểu đồ sản phẩm theo phân loại</h2>
                                <PieChart dataChart={dataChartProduct} />
                            </div>
                            <div className="sm:w-full w-2/3 h-full flex flex-col justify-center items-center p-4 ">
                                <h2 className="py-2 text-xl text-center font-bold">Biểu đồ doanh thu năm 2023</h2>
                                <BarChart dataChart={dataChartOrder} />
                            </div>
                        </div>
                    </div >
            }
        </>
    );
}

export default Dashboard;