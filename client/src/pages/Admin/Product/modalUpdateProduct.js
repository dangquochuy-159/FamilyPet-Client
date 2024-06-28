import axios from 'axios';
import PropTypes from 'prop-types'
import { useEffect } from 'react';
import { API_PRODUCT, API_PRODUCT_FILTER } from '~/api/api';
import Form, { FormGroup, Input, Option, Select } from "~/components/Form";
import check from '~/utils/Validate/ruleCheck';
import Validator from '~/utils/Validate/validator';

function ModalUpdateProduct({ categorys, product }) {
    const oldName = product.name;
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
            ],
            onRegister: function (data) {
                const update = () => {
                    const photoEle = document.getElementById('photo');
                    const photoDetailEle = document.getElementById('photo_detail');
                    const formData = new FormData();
                    photoEle.files.length > 0 && formData.append('photo', photoEle.files[0]);
                    if (photoDetailEle.files.length > 0) {
                        for (let file of photoDetailEle.files) {
                            formData.append('photo_detail', file);
                        }
                    }
                    for (let key in data) {
                        formData.append(key, data[key]);
                    }
                    try {
                        axios.put(`${API_PRODUCT}/${product._id}`, formData)
                            .then(response => {
                                alert('Cập nhật sản phẩm thành công')
                                window.location.reload();
                            })
                    } catch (error) {
                        console.error('Error sending PUT request:', error);
                    }
                }
                const fetchApi = async () => {
                    let results
                    try {
                        if (oldName !== data.name) {
                            const response = await fetch(`${API_PRODUCT_FILTER}?filter=name&value=${data.name}`)
                            results = await response.json();
                            if (results.data.length > 0) {
                                const ele = document.getElementById('name').parentElement.querySelector('.msg-error')
                                ele.innerHTML = 'Tên sản phẩm đã tồn tại'
                            } else {
                                update()
                            }
                        } else {
                            update()
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

    const handleSubmitForm = (e) => {
        const elements = document.querySelectorAll('.msg-error');
        let targetElement = null;
        elements.forEach((element) => {
            if (element.innerHTML !== '') {
                targetElement = element;
            }
        });
        const notifyError = document.querySelector('.notify-error')
        if (targetElement) {
            e.preventDefault()
            notifyError.innerHTML = 'Xảy ra lỗi khi nhập dữ liệu'
        } else {
            notifyError.innerHTML = ''
        }
    }
    return (
        <div className='w-full h-auto sm:!h-full sm:!overflow-auto px-8 pb-8 pt-4 sm:pb-20'>
            <h2 className="font-extrabold text-4xl text-center text-black">Chỉnh sửa sản phẩm</h2>
            <Form Form id='form-add-product' className='mt-5 flex flex-col gap-y-2' enctype="multipart/form-data" >
                <div className='w-full flex sm:flex-col md:flex-col justify-between gap-2'>
                    <FormGroup className='sm:w-full md:w-full w-1/2' >
                        <Input id='name' name='name' type='text' placeholder='Nhập tên sản phẩm' label='Tên sản phẩm'
                            className='w-full h-12 px-4 border-2 border-solid border-gray-400' defaultValue={product.name} />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                    <FormGroup className='sm:w-full md:w-full w-1/2'>
                        <Select className='w-full h-12 p-2 outline-none border-2 border-solid border-gray-400' name='category' label='Danh mục sản phẩm'>
                            <Option value={product.category} name={product.category} />
                            {
                                categorys.map((cate, index) => <Option key={index} value={cate.name} name={cate.name} />)
                            }
                        </Select>
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                    <FormGroup className='sm:w-full md:w-full w-1/2'>
                        <Input id='quantity' name='quantity' type='number' placeholder='Nhập số lượng' label='Số lượng'
                            className='w-full h-12 px-4 border-2 border-solid border-gray-400' defaultValue={product.quantity} />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                </div>
                <FormGroup>
                    <Input id='des' name='des' type='textarea' placeholder='Nhập mô tả sản phẩm' label='Mô tả sản phẩm'
                        className='w-full h-40 px-4 border-2 border-solid border-gray-400' defaultValue={product.des} />
                    <span className="msg-error text-red-600"></span>
                </FormGroup>
                <div className='w-full flex sm:flex-col md:flex-col justify-between gap-2'>
                    <FormGroup className='sm:w-full md:w-full w-1/2'>
                        <Input id='origin' name='origin' type='text' placeholder='Nhập xuất xứ' label='Xuất xứ'
                            className='w-full h-12 px-4 border-2 border-solid border-gray-400' defaultValue={product.origin} />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                    <FormGroup className='sm:w-full md:w-full w-1/2'>
                        <Input id='price' name='price' type='text' placeholder='Nhập giá' label='Giá'
                            className='w-full h-12 px-4 border-2 border-solid border-gray-400' defaultValue={product.price} />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                    <FormGroup className='sm:w-full md:w-full w-1/2'>
                        <Input id='sale_price' name='sale_price' type='text' placeholder='Nhập giá khuyến mãi' label='Giá khuyến mãi'
                            className='w-full h-12 px-4 border-2 border-solid border-gray-400' defaultValue={product.sale_price} />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                </div>
                <FormGroup className='w-full flex sm:flex-col gap-2'>
                    {product.outstand ? (
                        <>
                            <Input
                                checked
                                name='outstand' type='radio' value='true' title='Có' label='Sản phẩm nổi bật: '
                                className='w-4 h-4'
                            />
                            <Input
                                name='outstand' type='radio' value='false' title='Không'
                                className='w-4 h-4'
                            />
                        </>
                    ) : (
                        <>
                            <Input
                                name='outstand' type='radio' value='true' title='Có' label='Sản phẩm nổi bật: '
                                className='w-4 h-4'
                            />
                            <Input
                                checked
                                name='outstand' type='radio' value='false' title='Không'
                                className='w-4 h-4'
                            />
                        </>
                    )}

                    <span className="msg-error text-red-600"></span>
                </FormGroup>
                <div className='w-full flex sm:flex-col md:flex-col justify-between gap-2'>
                    <FormGroup className='sm:w-full md:w-full w-1/2'>
                        <Input id='photo' type='file' label='Ảnh'
                            className='w-full p-2 border-2 border-solid border-gray-400' />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                    <FormGroup className='sm:w-full md:w-full w-1/2'>
                        <Input id='photo_detail' multiple type='file' label='Ảnh chi tiết'
                            className='w-full p-2 border-2 border-solid border-gray-400' />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                </div>
                <span className="notify-error text-red-600"></span>
                <button className='sm:w-full w-1/4 bg-orange-500 text-sm active:bg-gray-700 cursor-pointer font-regular text-white px-4 py-2 rounded uppercase'
                    onClick={handleSubmitForm}
                >Cập nhật</button>
            </Form >
        </div >
    );
}

ModalUpdateProduct.propTypes = {
    categorys: PropTypes.array.isRequired,
    product: PropTypes.object.isRequired,
}

export default ModalUpdateProduct;