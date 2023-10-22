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
    const [filterPromotes, setFilterPromotes] = useState([])
    const [currentBtn, setCurrentBtn] = useState('btn-add')
    const [currentId, setCurrentId] = useState('')
    const [oldCode, setOldCode] = useState('')

    const points = [500, 800, 1000, 1200, 1500, 2000]
    const reduces = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

    const filterEles = document.querySelectorAll('.filter')
    const errorEles = document.querySelectorAll('.msg-error')
    const nameEle = document.getElementById('name')
    const codeELe = document.getElementById('code')
    const desEle = document.getElementById('des')
    const pointEle = document.getElementById('point')
    const reduceEle = document.getElementById('reduce')
    const timeEndEle = document.getElementById('time_end')
    const btnAdd = document.querySelector('.btn-add')
    const btnUpdate = document.querySelector('.btn-update')
    const btnNoUpdate = document.querySelector('.btn-cancel')


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/promotes`)
            .then(res => res.json())
            .then(data => {
                setConnectServer(true)
                setPromotes(data.data)
                setFilterPromotes(data.data)
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
                const errorCodeEle = codeELe.parentElement.querySelector('.msg-error')
                const postRequest = () => {
                    try {
                        axios.post(`${process.env.REACT_APP_API_URL}/api/promotes`, data)
                            .then(res => {
                                alert('Thêm khuyến mãi thành công')
                                window.location.reload();
                            })
                    } catch (error) {
                        console.error('Error sending PUT request:', error);
                    }
                }
                const putRequest = () => {
                    try {
                        axios.put(`${process.env.REACT_APP_API_URL}/api/promotes/${currentId}`, data)
                            .then(res => {
                                alert('Cập nhật khuyến mãi thành công')
                                window.location.reload();
                            })
                    } catch (error) {
                        console.error('Error sending PUT request:', error);
                    }
                }
                const messageError = () => errorCodeEle.innerHTML = 'Mã khuyến mãi đã tồn tại'

                const addPromote = async () => {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/promotes/search?code=${data.code}`)
                    const results = await response.json();
                    results.data.length > 0 ? messageError() : postRequest()
                }
                const updatePromote = async () => {
                    if (oldCode === data.code) {
                        putRequest()
                    } else {
                        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/promotes/search?code=${data.code}`)
                        const results = await response.json();
                        results.data.length > 0 ? messageError() : putRequest()
                    }
                }
                currentBtn === 'btn-add' ? addPromote() : updatePromote()
            }
        })
    })

    // function show all promotes
    const handleShowAllPromote = () => {
        Array.from(filterEles).map(filter => filter.value = '')
        setFilterPromotes(promotes)
    }

    //function filter promotes
    const handleFilterPromote = () => {
        const query = []
        Array.from(filterEles).map(filter => {
            filter.value !== '' && query.push(`filter=${filter.name}&value=${filter.value}`)
            return query
        })
        const queryString = query.join('&')
        fetch(`${process.env.REACT_APP_API_URL}/api/promotes/filter?${queryString}`)
            .then(res => res.json())
            .then(data => {
                setFilterPromotes(data.data)
            })
    }

    // function show update promote
    const handleShowUpdatePromote = (e) => {
        Array.from(errorEles).map(error => error.innerHTML = '')
        let id = e.target.getAttribute('data-id')
        setCurrentBtn('btn-update')
        setCurrentId(id)
        btnUpdate.classList.remove('hidden')
        btnNoUpdate.classList.remove('hidden')
        btnAdd.classList.add('hidden')
        promotes.forEach(promote => {
            if (promote._id === id) {
                setOldCode(promote.code)
                nameEle.value = promote.name
                codeELe.value = promote.code
                desEle.value = promote.des
                pointEle.value = promote.point
                reduceEle.value = promote.reduce
                timeEndEle.value = promote.time_end
            }
        })

    }

    // function cancel Update promote
    const handleCancelUpdate = (e) => {
        e.preventDefault();
        Array.from(errorEles).map(error => error.innerHTML = '')
        const errorCodeEle = codeELe.parentElement.querySelector('.msg-error')
        errorCodeEle.innerHTML = ''
        setCurrentBtn('btn-add')
        btnUpdate.classList.add('hidden')
        btnNoUpdate.classList.add('hidden')
        btnAdd.classList.remove('hidden')
        nameEle.value = ''
        codeELe.value = ''
        desEle.value = ''
        pointEle.value = ''
        reduceEle.value = ''
        timeEndEle.value = ''
    }

    // function deletePromote
    const handleDeletePromote = (e) => {
        if (window.confirm('Bạn chắn chắn muốn xóa mã khuyến mãi')) {
            let id = e.target.getAttribute('data-id')
            axios.delete(`${process.env.REACT_APP_API_URL}/api/promotes/${id}`)
                .then(() => {
                    alert('Xóa mã khuyến mãi thành công')
                    window.location.reload()
                })
        }
    }

    return (
        <>
            {
                !connectServer ? <ConnectError /> :
                    <div className="w-full h-auto bg-white sm:!px-0 p-4 flex flex-col gap-y-5">
                        <div className='w-full h-4/6 flex flex-col gap-y-5'>
                            <div className='w-full sm:!h-auto h-1/6 flex items-center'>
                                <div className='m-auto flex sm:flex-col gap-2 justify-center items-center'>
                                    <div className='flex gap-2 sm:w-full'>
                                        <select className='filter sm:w-1/2 p-2 border border-solid border-black' name='point' >
                                            <option value="">Điểm</option>
                                            {
                                                points.map((point, index) =>
                                                    <option key={index} value={point}>{point} điểm</option>)
                                            }
                                        </select>
                                        <select className='filter sm:w-1/2 p-2 border border-solid border-black' name='reduce' >
                                            <option value="">Giảm (%)</option>
                                            {
                                                reduces.map((reduce, index) =>
                                                    <option key={index} value={reduce}>{reduce} %</option>)
                                            }
                                        </select>
                                    </div>
                                    <input className='filter sm:w-full p-2 border border-solid border-black' name='time_end' type='number' placeholder='Nhập thời hạn (ngày)' />
                                    <div className='flex gap-2 sm:w-full'>
                                        <Button title='Lọc' type='primary' rightIcon={<FilterIcon width='14px' height='14px' />}
                                            className='sm:w-1/2 bg-red-500 text-white m-auto' onClick={handleFilterPromote}
                                        />
                                        <Button title='All' type='primary' rightIcon={<CheckIcon width='14px' height='14px' />}
                                            className='sm:w-1/2 bg-green-500 text-white m-auto' onClick={handleShowAllPromote}
                                        />
                                    </div>
                                </div>
                            </div>
                            <h2 className='font-bold sm:px-4'>Tổng mã khuyến mãi: {filterPromotes.length}</h2>
                            <div className='hidden sm:!flex sm:w-full overflow-x-auto space-x-4 bg-gray-200'>
                                {
                                    filterPromotes.map((promote, index) => (
                                        <div key={index} className='min-w-full p-8 relative'>
                                            <div className='bg-white px-4 pb-2 pt-4 rounded-md'>
                                                <p className='w-10 h-10 absolute top-1 left-1/2 -translate-x-1/2 p-2 flex justify-center items-center rounded-full text-black font-bold bg-gray-200'>
                                                    <span className='w-full h-full flex justify-center items-center rounded-full bg-white '>{index + 1}</span>
                                                </p>
                                                <p>
                                                    <span className='font-bold'>Tên khuyến mãi: </span>
                                                    <span>{promote.name}</span>
                                                </p>
                                                <p>
                                                    <span className='font-bold'>Mã khuyến mãi: </span>
                                                    <span>{promote.code}</span>
                                                </p>
                                                <p>
                                                    <span className='font-bold'>Giảm giá: </span>
                                                    <span>{promote.reduce}</span>
                                                </p>
                                                <p>
                                                    <span className='font-bold'>Điểm đổi: </span>
                                                    <span>{promote.point}</span>
                                                </p>
                                                <p>
                                                    <span className='font-bold'>Thời hạn: </span>
                                                    <span>{promote.time_end}</span>
                                                </p>
                                                <div className='flex justify-start w-full gap-2'>
                                                    <Button type='primary' rightIcon={<UpdateIcon width='14px' height='14px' />} data-id={promote._id}
                                                        className='w-1/2 bg-green-500 text-white m-auto' onClick={handleShowUpdatePromote}
                                                    />
                                                    <Button type='primary' rightIcon={<DeleteIcon width='14px' height='14px' />} data-id={promote._id}
                                                        className='w-1/2 bg-red-500 text-white m-auto' onClick={handleDeletePromote}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='wrapper-table sm:hidden'>
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
                                        {
                                            filterPromotes.length === 0 ? <tr><td colSpan='9'>Không tìm thấy kết quả</td></tr> :
                                                filterPromotes.map((promote, index) =>
                                                    <tr key={index}>
                                                        <td className='whitespace-pre-wrap'>{index + 1}</td>
                                                        <td className='whitespace-pre-wrap'>{promote.name}</td>
                                                        <td className='whitespace-pre-wrap'>{promote.code}</td>
                                                        <td className='whitespace-pre-wrap'>{promote.des}</td>
                                                        <td className='whitespace-pre-wrap'>{promote.reduce}</td>
                                                        <td className='whitespace-pre-wrap'>{promote.point}</td>
                                                        <td className='whitespace-pre-wrap'>{promote.time_end}</td>
                                                        <td className='whitespace-pre-wrap'>
                                                            <div className='flex justify-center gap-2'>
                                                                <Button type='primary' rightIcon={<UpdateIcon width='14px' height='14px' />} data-id={promote._id}
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
                        <div className='w-full h-auto sm:!p-4 p-2 sm:bg-white bg-gray-100'>
                            <h2 className='text-center text-2xl font-bold my-4'>Thêm khuyến mãi</h2>
                            <Form id='form-add-promote' enctype="multipart/form-data">
                                <div className='flex flex-col gap-y-5'>
                                    <div className='flex sm:flex-col gap-2'>
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
                                    <div className='flex sm:flex-col gap-2'>
                                        <FormGroup className=' sm:w-full w-1/3'>
                                            <Input id='reduce' name='reduce' type='number' placeholder='Nhập giá trị giảm' label='Giá trị giảm'
                                                className='w-full h-12 px-4 border-2 border-solid border-gray-400' />
                                            <span className="msg-error text-red-600"></span>
                                        </FormGroup>
                                        <FormGroup className=' sm:w-full w-1/3'>
                                            <Input id='point' name='point' type='number' placeholder='Nhập điểm đổi' label='Điểm đổi'
                                                className='w-full h-12 px-4 border-2 border-solid border-gray-400' />
                                            <span className="msg-error text-red-600"></span>
                                        </FormGroup>
                                        <FormGroup className=' sm:w-full w-1/3'>
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
                                    <div className='w-full flex justify-center gap-x-2 p-2'>
                                        <button className='btn-add w-auto bg-orange-500 text-sm active:bg-gray-700 cursor-pointer font-regular text-white px-4 py-2 rounded uppercase'>Thêm</button>
                                        <button className='btn-update hidden w-auto bg-green-500 text-sm active:bg-gray-700 cursor-pointer font-regular text-white px-4 py-2 rounded uppercase'>Cập nhật</button>
                                        <button onClick={handleCancelUpdate} className='btn-cancel hidden w-auto bg-red-500 text-sm active:bg-gray-700 cursor-pointer font-regular text-white px-4 py-2 rounded uppercase'>Cancel</button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div >
            }
        </ >
    );
}

export default Promote;