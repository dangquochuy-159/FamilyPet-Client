import { useEffect, useState } from 'react';
import { Button } from '~/components/Button';
import ConnectError from '~/components/ConnectError';
import { CheckIcon, FilterIcon } from '~/components/Icons';
import { changeDate } from '~/utils/SupportFunction/supportFunction';


function Evaluate() {

    const [connectServer, setConnectServer] = useState(false)
    const [evaluates, setEvaluates] = useState([])
    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([])
    const [filterEvaluates, setFilterEvaluates] = useState([])

    const filterEle = document.querySelectorAll('.filter')

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/evaluates`)
            .then(res => res.json())
            .then(data => {
                setConnectServer(true)
                setEvaluates(data.data)
                setFilterEvaluates(data.data)
            })
            .catch(err => setConnectServer(false))
        fetch(`${process.env.REACT_APP_API_URL}/api/users`)
            .then(res => res.json())
            .then(data => {
                setConnectServer(true)
                setUsers(data.data)
            })
            .catch(err => setConnectServer(false))
        fetch(`${process.env.REACT_APP_API_URL}/api/products`)
            .then(res => res.json())
            .then(data => {
                setConnectServer(true)
                setProducts(data.data)
            })
            .catch(err => setConnectServer(false))
    }, [])

    const handleShowAllEvaluate = () => {
        Array.from(filterEle).map(filter => {
            return filter.value = ''
        })
        setFilterEvaluates(evaluates)
    }
    const handleFilterEvaluate = () => {
        const query = []
        Array.from(filterEle).map(filter => {
            filter.value !== '' && query.push(`filter=${filter.name}&value=${filter.value}`)
            return query
        })
        const queryString = query.join('&')
        fetch(`${process.env.REACT_APP_API_URL}/api/evaluates/filter?${queryString}`)
            .then(res => res.json())
            .then(data => {
                setFilterEvaluates(data.data)
            })
    }


    return (
        <>
            {
                !connectServer ? <ConnectError /> :
                    <div className="w-full h-full sm:!h-auto bg-white p-4 flex flex-col gap-y-5">
                        <div className='w-full sm:!h-auto h-1/6 flex items-center '>
                            <div className='m-auto flex sm:w-full sm:flex-col gap-2 justify-center items-center'>
                                <select className='filter sm:w-full p-2 border border-solid border-black' name='star' >
                                    <option value="">Điểm đánh giá</option>
                                    <option value="1">1 sao</option>
                                    <option value="2">2 sao</option>
                                    <option value="3">3 sao</option>
                                    <option value="4">4 sao</option>
                                    <option value="5">5 sao</option>
                                </select>
                                <select className='filter sm:w-full p-2 border border-solid border-black' name='name_product' >
                                    <option value="">Sản phẩm</option>
                                    {
                                        products.map((product, index) =>
                                            <option key={index} value={product.name}>{product.name}</option>)
                                    }
                                </select>
                                <Button title='Lọc' type='primary' rightIcon={<FilterIcon width='14px' height='14px' />}
                                    className='sm:w-full bg-red-500 text-white m-auto' onClick={handleFilterEvaluate}
                                />
                                <Button title='All' type='primary' rightIcon={<CheckIcon width='14px' height='14px' />}
                                    className='sm:w-full bg-green-500 text-white m-auto' onClick={handleShowAllEvaluate}
                                />
                            </div>
                        </div>
                        <h2 className='font-bold'>Tổng số lượt đánh giá: {filterEvaluates.length}</h2>
                        <div className='hidden sm:!flex flex-col gap-4'>
                            {
                                filterEvaluates.map((evaluate, index) => (
                                    <div key={index} className='flex flex-col gap-2 p-4 rounded-md bg-gray-200'>
                                        <p><span className='font-bold'>Khách hàng: </span>{evaluate.name_user}</p>
                                        <p><span className='font-bold'>Sản phẩm: </span>{evaluate.name_product}</p>
                                        <p><span className='font-bold'>Nội dung: </span>{evaluate.content}</p>
                                        <p><span className='font-bold'>Điểm đánh giá: </span>{evaluate.star}/5</p>
                                        <p><span className='font-bold'>Ngày dánh giá: </span>{changeDate(evaluate.createdAt)}/5</p>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='wrapper-table sm:hidden'>
                            <table>
                                <thead className="text-black font-bold text-lg bg-[#71cbe8]">
                                    <tr>
                                        <th scope='col'>#</th>
                                        <th scope='col'>Khách hàng</th>
                                        <th scope='col'>Sản phẩm</th>
                                        <th scope='col'>Nội dung</th>
                                        <th scope='col'>Điểm đánh giá</th>
                                        <th scope='col'>Ngày đánh giá</th>
                                    </tr>
                                </thead>
                                <tbody className="font-normal text-[#000]">

                                    {
                                        filterEvaluates.length === 0 ? <tr><td colSpan='9'>Không tìm thấy kết quả</td></tr> :
                                            filterEvaluates.map((evaluate, index) =>
                                                <tr key={index}>
                                                    <td className='whitespace-pre-wrap'>{index + 1}</td>
                                                    <td className='whitespace-pre-wrap'>{evaluate.name_user}</td>
                                                    <td className='whitespace-pre-wrap'>{evaluate.name_product}</td>
                                                    <td className='whitespace-pre-wrap'>{evaluate.content}</td>
                                                    <td className='whitespace-pre-wrap'>{evaluate.star}</td>
                                                    <td className='whitespace-pre-wrap'>{changeDate(evaluate.createdAt)}</td>
                                                </tr>
                                            )}
                                </tbody>
                            </table>
                        </div>
                    </div>
            }
        </>
    );
}

export default Evaluate;