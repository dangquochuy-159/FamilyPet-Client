import { useEffect, useRef, useState } from 'react';
import { Button } from '~/components/Button';
import ConnectError from '~/components/ConnectError';
import { CheckIcon, DeleteIcon, FilterIcon, InfoIcon, PlusIcon, SearchIcon, UpdateIcon } from '~/components/Icons';
import Image from '~/components/Image';
import axios from 'axios';
import ModalInfoProduct from './modalIfoProduct';
import ModalAddProduct from './modalAddProduct';
import ModalUpdateProduct from './modalUpdateProduct';
import Modal from '~/components/Modal/Modal';
import { changeNumberToPrice } from '~/utils/SupportFunction/supportFunction';
import { API_CATEGORY, API_PRODUCT, API_PRODUCT_FILTER, API_PRODUCT_SEARCH } from '~/api/api';

function Product() {
    const [connectServer, setConnectServer] = useState(false)
    const [products, setProducts] = useState([])
    const [categorys, setCategorys] = useState([])
    const [filterProducts, setFilterProducts] = useState([])

    const filterEle = document.querySelectorAll('.filter')
    const searchEle = document.querySelector('.search')

    const prices = [100000, 300000, 500000, 800000, 1000000]
    const changeStatus = {
        in_stock: 'Còn hàng',
        low_stock: 'Sắp hết hàng',
        out_stock: 'Cháy hàng',
    }

    useEffect(() => {
        fetch(API_PRODUCT)
            .then(res => res.json())
            .then(data => {
                setConnectServer(true)
                setProducts(data.data)
                setFilterProducts(data.data)
            })
            .catch(err => setConnectServer(false))
        fetch(`${API_CATEGORY}`)
            .then(res => res.json())
            .then(data => {
                setConnectServer(true)
                setCategorys(data.data)
            })
            .catch(err => setConnectServer(false))
    }, [])

    // function filter product
    const handleFilterProduct = () => {
        searchEle.value = ''
        const query = []
        Array.from(filterEle).map(filter => {
            filter.value !== '' && query.push(`filter=${filter.name}&value=${filter.value}`)
            return query
        })
        const queryString = query.join('&')
        fetch(`${API_PRODUCT_FILTER}?${queryString}`)
            .then(res => res.json())
            .then(data => {
                setFilterProducts(data.data)
            })
    }

    // function search product
    const handleSearchProduct = () => {
        Array.from(filterEle).map(filter => {
            return filter.value = ''
        })
        let name = searchEle.value
        fetch(`${API_PRODUCT_SEARCH}?name=${name}`)
            .then(res => res.json())
            .then(data => {
                setFilterProducts(data.data)
            })
    }

    // function show all product
    const handleShowAllProduct = () => {
        Array.from(filterEle).map(filter => {
            return filter.value = ''
        })
        searchEle.value = ''
        setFilterProducts(products)
    }

    // function delete product
    const handleDeleteProduct = (e) => {
        let id = e.target.getAttribute('data-id')
        if (window.confirm('Bạn chắc chắn muốn xóa sản phẩm')) {
            axios.delete(`${API_PRODUCT}/${id}`)
                .then(() => {
                    alert('Xóa sản phẩm thành công')
                    window.location.reload()
                })
        }
    }

    return (
        <>
            {
                !connectServer ? <ConnectError /> :
                    <div className="w-full sm:!h-auto md:!h-auto h-full bg-white p-4 flex flex-col gap-y-5">
                        <div className="w-full sm:h-auto md:!h-auto h-1/6 flex flex-col gap-y-2 items-center justify-center">
                            <div className='flex sm:flex-col md:flex-col gap-2'>
                                <div className='flex gap-x-2'>
                                    <select className='filter sm:w-1/2 md:w-1/2 p-2 border border-solid border-black' name='category'>
                                        <option value="">Danh mục</option>
                                        {categorys.map((cate, index) => <option key={index} value={cate.name}>{cate.name}</option>)}
                                    </select>
                                    <select className='filter sm:w-1/2 md:w-1/2 p-2 border border-solid border-black' name='price' >
                                        <option value="">Giá</option>
                                        {
                                            prices.map((price, index) =>
                                                <option key={index} value={price}>{changeNumberToPrice(price)}</option>)
                                        }
                                    </select>
                                </div>
                                <div className='flex gap-x-2'>
                                    <select className='filter sm:w-1/2 md:w-1/2 p-2 border border-solid border-black' name='outstand' >
                                        <option value="">Nổi bật</option>
                                        <option value='true'>Có</option>
                                        <option value='false'>Không</option>
                                    </select>
                                    <input className='filter sm:w-1/2 md:w-1/2 p-2 border border-solid border-black' name='quantity' type='number' placeholder='Số lượng' />
                                </div>
                                <div className='flex gap-x-2'>
                                    <Button title='Lọc' type='primary' rightIcon={<FilterIcon width='14px' height='14px' />}
                                        className='bg-red-500 text-white ' onClick={handleFilterProduct}
                                    />
                                    <Button title='All' type='primary' rightIcon={<CheckIcon width='14px' height='14px' />}
                                        className='bg-green-500 text-white ' onClick={handleShowAllProduct}
                                    />
                                </div>
                                <div className='flex gap-x-2'>
                                    <input className='search p-2 border border-solid border-black' name='name' type='text' placeholder='Nhập tên sản phẩm' />
                                    <Button title='Tìm kiếm' type='primary' rightIcon={<SearchIcon width='14px' height='14px' />}
                                        className='bg-blue-500 text-white m-auto' onClick={handleSearchProduct}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='w-full h-5/6 flex flex-col gap-y-4'>
                            <Modal className="sm:w-full sm:h-[90vh] md:w-full md:!h-[90vh] w-2/3 h-auto"
                                trigger={
                                    <div className="sm:w-full md:w-full w-2/12 h-auto mx-auto bg-red-400">
                                        <Button title='Thêm sản phẩm' type='primary' rightIcon={<PlusIcon width='14px' height='14px' />}
                                            className='w-full bg-yellow-500 text-white m-auto'
                                        />
                                    </div>
                                }
                            >
                                <ModalAddProduct categorys={categorys} />
                            </Modal>
                            <h2 className='font-bold'>Tổng sản phẩn: {filterProducts.length}</h2>
                            {/* show product mobile */}
                            <div className='hidden wrapper-product sm:!flex flex-col gap-y-2'>
                                {filterProducts.length === 0 ? <tr><td colSpan='9'>Không tìm thấy kết quả</td></tr> :
                                    filterProducts.map((product, index) => (
                                        <div key={index} className={`w-full p-2 flex flex-col gap-y-2 rounded-sm`}>
                                            <div className='flex justify-start items-center gap-x-3'>
                                                <Image src={product.photo[0]} alt={product.photo}
                                                    className='w-12 h-12 rounded-full object-cover'
                                                />
                                                <p className='font-bold'>{product.name}</p>
                                                <p className={product.sale_price && 'line-through'}>{changeNumberToPrice(product.price)}</p>
                                                <p>{product.sale_price && changeNumberToPrice(product.sale_price)}</p>

                                            </div>
                                            <div className='flex justify-end gap-x-1'>
                                                <Modal className="w-full h-[90vh]"
                                                    trigger={
                                                        <div className="w-auto h-auto">
                                                            <Button type='primary' rightIcon={<InfoIcon width='14px' height='14px' />}
                                                                className='bg-blue-500 text-white m-auto'
                                                            />
                                                        </div>
                                                    }
                                                >
                                                    <ModalInfoProduct product={product} changeStatus={changeStatus} />
                                                </Modal>
                                                <Modal className="w-full !h-[90vh]"
                                                    trigger={
                                                        <div className="w-auto h-auto">
                                                            <Button type='primary' rightIcon={<UpdateIcon width='14px' height='14px' />}
                                                                className='bg-green-500 text-white m-auto'
                                                            />
                                                        </div>
                                                    }
                                                >
                                                    <ModalUpdateProduct product={product} categorys={categorys} />
                                                </Modal>
                                                <div className="w-auto h-auto">
                                                    <Button type='primary' rightIcon={<DeleteIcon width='14px' height='14px' />} data-id={product._id}
                                                        className='bg-red-500 text-white m-auto' onClick={handleDeleteProduct}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            {/* show product tablet laptop */}
                            <div className="sm:hidden wrapper-table w-full">
                                <table>
                                    <thead className="text-black font-bold text-lg bg-[#71cbe8]">
                                        <tr>
                                            <th scope='col'>#</th>
                                            <th scope='col'>Tên</th>
                                            <th scope='col' className='md:hidden'>Ảnh</th>
                                            <th scope='col' className='md:hidden'>Danh mục</th>
                                            <th scope='col'>Giá</th>
                                            <th scope='col'>Giá khuyến mãi</th>
                                            <th scope='col' className='md:hidden'>Nổi bật</th>
                                            <th scope='col'>Số lượng</th>
                                            <th scope='col' className='md:hidden'>Trạng thái</th>
                                            <th scope='col'>Hành động</th>

                                        </tr>
                                    </thead>
                                    <tbody className="font-normal text-[#000]">
                                        {
                                            filterProducts.length === 0 ? <tr><td colSpan='10'>Không tìm thấy kết quả</td></tr> :
                                                filterProducts.map((product, index) => (
                                                    <tr key={index}>
                                                        <th>{index + 1}</th>
                                                        <th className='w-48 whitespace-pre-wrap'>{product.name}</th>
                                                        <td className='md:hidden'>
                                                            <Image src={product.photo[0]} alt={product.photo}
                                                                className='w-12 h-12 rounded-full m-auto object-cover'
                                                            />
                                                        </td>
                                                        <td className='md:hidden'>{product.category}</td>
                                                        <td className={product.sale_price && 'line-through'}>{changeNumberToPrice(product.price)}</td>
                                                        <td>{product.sale_price === 0 ? '-' : changeNumberToPrice(product.sale_price)}</td>
                                                        <td className='md:hidden'>{product.outstand ? 'Có' : 'Không'}</td>
                                                        <td>{product.quantity}</td>
                                                        <td className='md:hidden'>{Object.keys(product.status).map(key => product.status[key] && changeStatus[key])}</td>
                                                        <td>
                                                            <div className='flex justify-center gap-x-1'>
                                                                <Modal className="md:w-full md:!h-[90vh] w-2/3 h-auto"
                                                                    trigger={
                                                                        <div className="w-auto h-auto">
                                                                            <Button type='primary' rightIcon={<InfoIcon width='14px' height='14px' />}
                                                                                className='bg-blue-500 text-white m-auto'
                                                                            />
                                                                        </div>
                                                                    }
                                                                >
                                                                    <ModalInfoProduct product={product} changeStatus={changeStatus} />
                                                                </Modal>
                                                                <Modal className="md:w-full md:!h-[90vh] w-2/3 h-auto"
                                                                    trigger={
                                                                        <div className="w-auto h-auto">
                                                                            <Button type='primary' rightIcon={<UpdateIcon width='14px' height='14px' />}
                                                                                className='bg-green-500 text-white m-auto'
                                                                            />
                                                                        </div>
                                                                    }
                                                                >
                                                                    <ModalUpdateProduct product={product} categorys={categorys} />
                                                                </Modal>
                                                                <div className="w-auto h-auto">
                                                                    <Button type='primary' rightIcon={<DeleteIcon width='14px' height='14px' />} data-id={product._id}
                                                                        className='bg-red-500 text-white m-auto' onClick={handleDeleteProduct}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
}

export default Product;