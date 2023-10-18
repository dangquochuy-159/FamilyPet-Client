import { useEffect, useRef, useState } from 'react';
import { Button } from '~/components/Button';
import ConnectError from '~/components/ConnectError';
import { CheckIcon, DeleteIcon, FilterIcon, InfoIcon, PlusIcon, SearchIcon, UpdateIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Modal from '~/components/Modal/modal';
import axios from 'axios';
import ModalInfoProduct from './modalIfoProduct';
import ModalAddProduct from './modalAddProduct';
import ModalUpdateProduct from './modalUpdateProduct';



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
        fetch(`${process.env.REACT_APP_API_URL}/api/products`)
            .then(res => res.json())
            .then(data => {
                setConnectServer(true)
                setProducts(data.data)
                setFilterProducts(data.data)
            })
            .catch(err => setConnectServer(false))
        fetch(`${process.env.REACT_APP_API_URL}/api/categorys`)
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
        fetch(`${process.env.REACT_APP_API_URL}/api/products/filter?${queryString}`)
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
        fetch(`${process.env.REACT_APP_API_URL}/api/products/search?name=${name}`)
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
            axios.delete(`${process.env.REACT_APP_API_URL}/api/products/${id}`)
                .then(() => {
                    alert('Xóa sản phẩm thành công')
                    window.location.reload()
                })
        }
    }

    return (
        <div className="wrapper-page flex flex-col  ">
            {
                !connectServer ? <ConnectError /> :
                    <div className="w-full h-full bg-white p-4 flex flex-col gap-y-5">
                        <div className="w-full h-1/6 flex flex-col gap-y-2 items-center justify-center">
                            <h2 className="text-4xl text-center font-bold text-[#000]">Danh sách sản phẩm</h2>
                            <div className='flex gap-x-2'>
                                <Button title='All' type='primary' rightIcon={<CheckIcon width='14px' height='14px' />}
                                    className='bg-green-500 text-white m-auto' onClick={handleShowAllProduct}
                                />
                                <select className='filter p-2 border border-solid border-black' name='category'>
                                    <option value="">Danh mục</option>
                                    {categorys.map((cate, index) => <option key={index} value={cate.name}>{cate.name}</option>)}
                                </select>
                                <select className='filter p-2 border border-solid border-black' name='price' >
                                    <option value="">Giá</option>
                                    {
                                        prices.map((price, index) =>
                                            <option key={index} value={price}>{price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</option>)
                                    }
                                </select>
                                <select className='filter p-2 border border-solid border-black' name='outstand' >
                                    <option value="">Nổi bật</option>
                                    <option value='true'>Có</option>
                                    <option value='false'>Không</option>
                                </select>
                                <input className='filter p-2 border border-solid border-black' name='quantity' type='number' placeholder='Số lượng' />
                                <Button title='Lọc' type='primary' rightIcon={<FilterIcon width='14px' height='14px' />}
                                    className='bg-red-500 text-white m-auto' onClick={handleFilterProduct}
                                />
                                <input className='search p-2 border border-solid border-black' name='name' type='text' placeholder='Nhập tên sản phẩm' />
                                <Button title='Tìm kiếm' type='primary' rightIcon={<SearchIcon width='14px' height='14px' />}
                                    className='bg-blue-500 text-white m-auto' onClick={handleSearchProduct}
                                />
                            </div>
                        </div>
                        <div className="wrapper-table w-full">
                            <table>
                                <thead className="text-black font-bold text-lg bg-[#71cbe8]">
                                    <tr>
                                        <th scope='col'>Tên</th>
                                        <th scope='col'>Ảnh</th>
                                        <th scope='col'>Danh mục</th>
                                        <th scope='col'>Giá</th>
                                        <th scope='col'>Giá khuyến mãi</th>
                                        <th scope='col'>Nổi bật</th>
                                        <th scope='col'>Số lượng</th>
                                        <th scope='col'>Trạng thái</th>
                                        <th scope='col'>Hành động</th>

                                    </tr>
                                </thead>
                                <tbody className="font-normal text-[#000]">
                                    {
                                        filterProducts.length === 0 ? <tr><td colSpan='9'>Không tìm thấy kết quả</td></tr> :
                                            filterProducts.map((product, index) => (
                                                <tr key={index}>
                                                    <th className='w-48 whitespace-pre-wrap'>{product.name}</th>
                                                    <td>
                                                        <Image src={`${process.env.REACT_APP_API_URL}/api/products/${product._id}/${product.photo}`} alt={product.photo}
                                                            className='w-12 h-12 rounded-full m-auto object-cover'
                                                        />
                                                    </td>
                                                    <td>{product.category}</td>
                                                    <td>{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                                    <td>{product.sale_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                                    <td>{product.outstand ? 'Có' : 'Không'}</td>
                                                    <td>{product.quantity}</td>
                                                    <td>{Object.keys(product.status).map(key => product.status[key] && changeStatus[key])}</td>
                                                    <td>
                                                        <div className='flex justify-center gap-x-1'>
                                                            <Modal className="w-2/3 h-auto"
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
                                                            <Modal className="w-1/2 h-auto"
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

                        <Modal className="w-2/3 h-auto"
                            trigger={
                                <div className="w-auto h-auto">
                                    <Button title='Thêm sản phẩm' type='primary' rightIcon={<PlusIcon width='14px' height='14px' />}
                                        className='bg-yellow-500 text-white m-auto'
                                    />
                                </div>
                            }
                        >
                            <ModalAddProduct categorys={categorys} />
                        </Modal>
                    </div>
            }
        </div>
    );
}

export default Product;