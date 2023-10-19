import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from '~/components/Button';
import ConnectError from '~/components/ConnectError';
import Form, { FormGroup, Input } from '~/components/Form';
import { CheckIcon, DeleteIcon, FilterIcon, UpdateIcon } from '~/components/Icons';
import check from '~/utils/Validate/ruleCheck';
import Validator from '~/utils/Validate/validator';


function Promote() {
    const [connectServer, setConnectServer] = useState(false)
    const [promotes, setPromotes] = useState([])
    const [currentBtn, setCurrentBtn] = useState('btn-add')

    const points = [500, 800, 1000, 1200, 1500, 2000]
    const reduces = [20, 40, 60, 80, 100]

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/promotes`)
            .then(res => res.json())
            .then(data => {
                setConnectServer(true)
                setPromotes(data.data)
            })
            .catch(err => setConnectServer(false))
    }, [])

    useEffect(() => {
        Validator({
            form: '#form-add-promote',
            formGroup: '.form-group',
            formError: '.msg-error',
            rules: [
                Validator.isRequired("#name", check.isEmpty),
                Validator.isRequired("#des", check.isEmpty),
                Validator.isRequired("#code", check.isEmpty),
                Validator.isRequired("#reduce", check.isEmpty),
                Validator.isRequired("#point", check.isEmpty),
                Validator.isRequired("#time_end", check.isEmpty),
            ],
            onRegister: function (data) {

                const postRequest = () => {
                    try {
                        axios.post(`${process.env.REACT_APP_API_URL}/api/promotes`, data)
                            .then(res => {
                                alert('Thêm mã khuyến mãi thành công')
                                window.location.reload();
                            })
                    } catch (error) {
                        console.error('Error sending PUT request:', error);
                    }
                }
                const fetchApi = async () => {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/promotes/search?code=${data.code}`)
                    const results = await response.json();
                    if (results.data.length > 0) {
                        console.log(results.data)
                        const ele = document.getElementById('code').parentElement.querySelector('.msg-error')
                        ele.innerHTML = 'Mã khuyến mãi đã tồn tại'
                    } else {
                        postRequest()
                    }
                }
                fetchApi()

            }


        })
    })
    const handleShowUpdatePromote = () => { }
    const handleDeletePromote = () => { }

    return (
        <div className="wrapper-page flex flex-col  ">
            {
                !connectServer ? <ConnectError /> :
                    <div className="w-full h-auto bg-white p-4 flex flex-col gap-y-5">
                        <div className='w-full h-4/6 flex flex-col gap-y-5'>
                            <div className='w-full h-1/6 flex items-center'>
                                <div className='m-auto flex gap-x-2 justify-center items-center'>
                                    <Button title='All' type='primary' rightIcon={<CheckIcon width='14px' height='14px' />}
                                        className='bg-green-500 text-white m-auto'
                                    />
                                    <select className='filter p-2 border border-solid border-black' name='point' >
                                        <option value="">Điểm</option>
                                        {
                                            points.map((point, index) =>
                                                <option key={index} value={point}>{point} điểm</option>)
                                        }
                                    </select>
                                    <select className='filter p-2 border border-solid border-black' name='reduce' >
                                        <option value="">Giảm (%)</option>
                                        {
                                            reduces.map((reduce, index) =>
                                                <option key={index} value={reduce}>{reduce} %</option>)
                                        }
                                    </select>
                                    <input className='filter p-2 border border-solid border-black' name='time_end' type='number' placeholder='Nhập thời hạn (ngày)' />
                                    <Button title='Lọc' type='primary' rightIcon={<FilterIcon width='14px' height='14px' />}
                                        className='bg-red-500 text-white m-auto'
                                    />
                                </div>
                            </div>
                            <div className='wrapper-table'>
                                <table>
                                    <thead className="text-black font-bold text-lg bg-[#71cbe8]">
                                        <tr>
                                            <th scope='col'>#</th>
                                            <th scope='col'>Tên</th>
                                            <th scope='col'>Mã khuyến mãi</th>
                                            <th scope='col'>Mô tả</th>
                                            <th scope='col'>Giảm (%)</th>
                                            <th scope='col'>Điểm đổi</th>
                                            <th scope='col'>Thời hạn</th>
                                            <th scope='col'>Hành động</th>


                                        </tr>
                                    </thead>
                                    <tbody className="font-normal text-[#000]">
                                        {promotes.map((promote, index) =>
                                            <tr key={index}>
                                                <td className='whitespace-pre-wrap'>{index + 1}</td>
                                                <td className='whitespace-pre-wrap'>{promote.name}</td>
                                                <td className='whitespace-pre-wrap'>{promote.code}</td>
                                                <td className='whitespace-pre-wrap'>{promote.des}</td>
                                                <td className='whitespace-pre-wrap'>{promote.reduce}</td>
                                                <td className='whitespace-pre-wrap'>{promote.point}</td>
                                                <td className='whitespace-pre-wrap'>{promote.time_end}</td>
                                                <td className='whitespace-pre-wrap'>
                                                    <div className='flex justify-center'>
                                                        <Button type='primary' rightIcon={<UpdateIcon width='14px' height='14px' />}
                                                            className='bg-green-500 text-white m-auto' onClick={handleShowUpdatePromote}
                                                        />
                                                        <Button type='primary' rightIcon={<DeleteIcon width='14px' height='14px' />} data-id={promote._id}
                                                            className='bg-red-500 text-white m-auto' onClick={handleDeletePromote}
                                                        />
                                                    </div>
                                                </td>


                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='w-full h-auto p-2 bg-gray-100'>
                            <h2 className='text-center text-2xl font-bold my-4'>Thêm mã khuyến mãi</h2>
                            <Form id='form-add-promote' enctype="multipart/form-data">
                                <div className='flex flex-col gap-y-5'>
                                    <div className='flex gap-x-2'>
                                        <FormGroup className='w-full'>
                                            <Input id='name' name='name' type='text' placeholder='Nhập tên khuyến mãi' label='Tên khuyến mãi'
                                                className='w-full h-12 px-4 border-2 border-solid border-gray-400' />
                                            <span className="msg-error text-red-600"></span>
                                        </FormGroup>
                                        <FormGroup className='w-full'>
                                            <Input id='code' name='code' type='text' placeholder='Nhập mã khuyến mãi' label='Mã khuyến mãi'
                                                className='w-full h-12 px-4 border-2 border-solid border-gray-400' />
                                            <span className="msg-error text-red-600"></span>
                                        </FormGroup>
                                    </div>
                                    <div className='flex gap-x-2'>
                                        <FormGroup className='w-1/3'>
                                            <Input id='reduce' name='reduce' type='number' placeholder='Nhập giá trị giảm' label='Giá trị giảm'
                                                className='w-full h-12 px-4 border-2 border-solid border-gray-400' />
                                            <span className="msg-error text-red-600"></span>
                                        </FormGroup>
                                        <FormGroup className='w-1/3'>
                                            <Input id='point' name='point' type='number' placeholder='Nhập điểm đổi' label='Điểm đổi'
                                                className='w-full h-12 px-4 border-2 border-solid border-gray-400' />
                                            <span className="msg-error text-red-600"></span>
                                        </FormGroup>
                                        <FormGroup className='w-1/3'>
                                            <Input id='time_end' name='time_end' type='number' placeholder='Nhập thời gian khuyễn mãi (ngày)' label='Thời gian khuyến mãi (ngày)'
                                                className='w-full h-12 px-4 border-2 border-solid border-gray-400' />
                                            <span className="msg-error text-red-600"></span>
                                        </FormGroup>
                                    </div>
                                    <div className='flex gap-x-2'>
                                        <FormGroup className='w-full'>
                                            <Input id='des' name='des' type='textarea' placeholder='Nhập mô tả' label='Mô tả'
                                                className='w-full h-24 p-4 border-2 border-solid border-gray-400' />
                                            <span className="msg-error text-red-600"></span>
                                        </FormGroup>
                                    </div>
                                    <div className='w-full flex justify-center p-2'>
                                        <button className=' w-auto bg-orange-500 text-sm active:bg-gray-700 cursor-pointer font-regular text-white px-4 py-2 rounded uppercase'>Thêm</button>
                                        <button className='hidden w-auto bg-orange-500 text-sm active:bg-gray-700 cursor-pointer font-regular text-white px-4 py-2 rounded uppercase'>Cập nhật</button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div >
            }
        </div >
    );
}

export default Promote;