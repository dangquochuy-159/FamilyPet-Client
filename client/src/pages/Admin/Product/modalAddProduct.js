import axios from 'axios';
import PropTypes from 'prop-types'
import { useEffect } from 'react';
import Form, { FormGroup, Input, Option, Select } from "~/components/Form";
import check from '~/utils/Validate/ruleCheck';
import Validator from '~/utils/Validate/validator';

function ModalAddProduct({ categorys }) {

    useEffect(() => {
        Validator({
            form: '#form-add-product',
            formGroup: '.form-group',
            formError: '.msg-error',
            rules: [
                Validator.isRequired("#name", check.isEmpty),
                Validator.isRequired("#quantity", check.isEmpty),
                Validator.isRequired("#des", check.isEmpty),
                Validator.isRequired("#origin", check.isEmpty),
                Validator.isRequired("#price", check.isEmpty),
                Validator.isRequired("#sale_price", check.isEmpty),
                Validator.isRequired("#photo", check.isEmpty),
                Validator.isRequired("#photo_detail", check.isEmpty),
            ],
            onRegister: function (data) {

                const fetchApi = async () => {
                    try {
                        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/filter?filter=name&value=${data.name}`)
                        const results = await response.json();
                        if (results.data.length > 0) {
                            const ele = document.getElementById('name').parentElement.querySelector('.msg-error')
                            ele.innerHTML = 'Tên sản phẩm đã tồn tại'
                        }
                        else {
                            const photoEle = document.getElementById('photo');
                            const photoDetailEle = document.getElementById('photo_detail');
                            const formData = new FormData();
                            formData.append('photo', photoEle.files[0]);
                            for (let file of photoDetailEle.files) {
                                formData.append('photo_detail', file);
                            }
                            for (let key in data) {
                                formData.append(key, data[key]);
                            }
                            try {
                                axios.post(`${process.env.REACT_APP_API_URL}/api/products`, formData)
                                    .then(response => {
                                        alert('Thêm sản phẩm thành công')
                                        window.location.reload();
                                    })
                            } catch (error) {
                                console.error('Error sending PUT request:', error);
                            }
                        }
                    }
                    catch (error) {
                        console.error('There was a problem with the fetch operation:', error);
                    }
                }
                fetchApi();
            }
        })
    })

    return (
        <div className='w-full h-auto px-8 pb-8 pt-4'>
            <h2 className="font-extrabold text-4xl text-center text-black">Thêm sản phẩm</h2>
            <Form id='form-add-product' className='mt-5 flex flex-col gap-y-2' enctype="multipart/form-data">
                <div className='w-full flex justify-between gap-x-2'>
                    <FormGroup className='w-1/2' >
                        <Input id='name' name='name' type='text' placeholder='Nhập tên sản phẩm' label='Tên sản phẩm'
                            className='w-full h-12 px-4 border-2 border-solid border-gray-400' />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                    <FormGroup className='w-1/2'>
                        <Select className='w-full h-12 p-2 outline-none border-2 border-solid border-gray-400' name='category' label='Danh mục sản phẩm'>
                            {
                                categorys.map((cate, index) => <Option key={index} value={cate.name} name={cate.name} />)
                            }
                        </Select>
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                    <FormGroup className='w-1/2'>
                        <Input id='quantity' name='quantity' type='number' placeholder='Nhập số lượng' label='Số lượng'
                            className='w-full h-12 px-4 border-2 border-solid border-gray-400' />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                </div>
                <FormGroup>
                    <Input id='des' name='des' type='textarea' placeholder='Nhập mô tả sản phẩm' label='Mô tả sản phẩm'
                        className='w-full h-40 px-4 border-2 border-solid border-gray-400' />
                    <span className="msg-error text-red-600"></span>
                </FormGroup>
                <div className='w-full flex justify-between gap-x-2'>
                    <FormGroup className='w-1/2'>
                        <Input id='origin' name='origin' type='text' placeholder='Nhập xuất xứ' label='Xuất xứ'
                            className='w-full h-12 px-4 border-2 border-solid border-gray-400' />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                    <FormGroup className='w-1/2'>
                        <Input id='price' name='price' type='text' placeholder='Nhập giá' label='Giá'
                            className='w-full h-12 px-4 border-2 border-solid border-gray-400' />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                    <FormGroup className='w-1/2'>
                        <Input id='sale_price' name='sale_price' type='text' placeholder='Nhập giá khuyến mãi' label='Giá khuyến mãi'
                            className='w-full h-12 px-4 border-2 border-solid border-gray-400' />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                </div>
                <div className='w-full flex justify-between gap-x-2'>
                    <FormGroup className='w-1/2'>
                        <Input id='photo' type='file' label='Ảnh'
                            className='w-full p-2 border-2 border-solid border-gray-400' />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                    <FormGroup className='w-1/2'>
                        <Input id='photo_detail' multiple type='file' label='Ảnh chi tiết'
                            className='w-full p-2 border-2 border-solid border-gray-400' />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                </div>
                <button className='w-1/4 bg-orange-500 text-sm active:bg-gray-700 cursor-pointer font-regular text-white px-4 py-2 rounded uppercase'>Thêm</button>
            </Form>
        </div>
    );
}

ModalAddProduct.propTypes = {
    categorys: PropTypes.array.isRequired,
}

export default ModalAddProduct;