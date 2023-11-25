import { useEffect, useState } from "react";

import ConnectError from "~/components/ConnectError";
import Form, { FormGroup, Input } from "~/components/Form";
import { Button } from "~/components/Button";
import Image from "~/components/Image";
import { CloseIcon, DeleteIcon, UpdateIcon } from "~/components/Icons";
import Validator from "~/utils/Validate/validator";
import check from "~/utils/Validate/ruleCheck";
import axios from "axios";
import { handleLoadingPage } from "~/utils/SupportFunction/supportFunction";
import { images } from "~/assets";


function Category() {
    const [connectServer, setConnectServer] = useState(false)
    const [categorys, setCategorys] = useState([])
    const [idCategory, setIdCategory] = useState('')
    const ipName = document.getElementById('name')
    const ipFile = document.getElementById('photo')
    const btnAdd = document.getElementById('add-cate')
    const btnUpdate = document.getElementById('update-cate')
    const btnNoUpdate = document.getElementById('no-update-cate')
    const [oldName, setOldName] = useState('')

    // get API
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/categorys`)
            .then(res => res.json())
            .then(data => {
                setConnectServer(true)
                setCategorys(data.data)
            }).catch(err => setConnectServer(false))
    }, [])

    // Validator Form
    useEffect(() => {
        Validator({
            form: '#form-add-cate',
            formGroup: '.form-group',
            formError: '.msg-error',
            rules: [
                Validator.isRequired("#name", check.isEmpty),
            ],
            onRegister: function (data) {
                const fetchApi = async () => {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/categorys/search?name=${data.name}`)
                    const results = await response.json();
                    if (results.data.length > 0) {
                        const ele = document.getElementById('name').parentElement.querySelector('.msg-error')
                        ele.innerHTML = 'Tên danh mục đã tồn tại'
                    } else {

                        const formData = new FormData()
                        formData.append('name', data.name)
                        console.log(ipFile.files[0])
                        ipFile.files[0] && formData.append('photo', ipFile.files[0])

                        axios.post(`${process.env.REACT_APP_API_URL}/api/categorys`, formData)
                            .then(res => {
                                window.location.reload()
                            })
                    }
                }

                fetchApi()
            }
        })
    })

    // function delete Category
    const handleDelete = (e) => {
        if (window.confirm('Bạn chắc chắn muốn xóa danh mục')) {
            let id = e.target.getAttribute('data-cate')
            axios.delete(`${process.env.REACT_APP_API_URL}/api/categorys/${id}`)
                .then(res => window.location.reload())
        }
    }

    // function show form update category
    const handleShowFormUpdate = (e) => {
        document.querySelector('.msg-error').innerText = ''
        setIdCategory(e.target.getAttribute('data-id'))
        ipName.value = e.target.getAttribute('data-name')
        setOldName(e.target.getAttribute('data-name'))
        btnAdd.classList.add('hidden')
        btnUpdate.classList.remove('hidden')
        btnNoUpdate.classList.remove('hidden')
    }

    // function update category
    const handleUpdate = async (e) => {
        e.preventDefault()
        const update = () => {
            const formData = new FormData()
            formData.append('name', ipName.value)
            ipFile.files && formData.append('photo', ipFile.files[0])
            axios.put(`${process.env.REACT_APP_API_URL}/api/categorys/${idCategory}`, formData)
                .then(res => window.location.reload())
        }

        if (oldName === ipName.value) {
            update()
        }
        else {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/categorys/search?name=${ipName.value}`)
            const results = await response.json();
            if (results.data.length > 0) {
                const ele = document.getElementById('name').parentElement.querySelector('.msg-error')
                ele.innerHTML = 'Tên danh mục đã tồn tại'
            } else {
                update()
            }
        }
    }

    // function cancel update category
    const handleNoUpdate = (e) => {
        e.preventDefault()
        btnAdd.classList.remove('hidden')
        btnUpdate.classList.add('hidden')
        btnNoUpdate.classList.add('hidden')
        const ele = document.getElementById('name').parentElement.querySelector('.msg-error')
        ele.innerHTML = ''
        ipFile.value = ''
        ipName.value = ''
    }

    return (
        <>
            {
                !connectServer ? <ConnectError /> :
                    <div className="w-full h-full bg-white p-4 flex flex-col gap-y-5">
                        <div className="w-full h-1/6 sm:h-auto md:!h-auto">
                            <Form id='form-add-cate'
                                className='w-full h-full flex sm:flex-col md:flex-col items-center justify-center sm:gap-y-0 gap-x-10 p-4 border-2 border-solid border-gray-200'>
                                <FormGroup className="flex sm:flex-col sm:w-full md:flex-col md:w-full items-center gap-x-5">
                                    <Input id='name' name='name' type='text' placeholder='Nhập tên danh mục'
                                        className="sm:w-full md:w-full h-14 border-2 border-solid p-2 border-gray-300"
                                    />
                                    <span className="msg-error text-red-600"></span>
                                </FormGroup>
                                <FormGroup className="flex sm:flex-col sm:w-full md:flex-col md:w-full items-center gap-x-5">
                                    <Input id='photo' type='file' className="sm:w-full md:w-full" />
                                </FormGroup>
                                <Button id='add-cate' title='Thêm' type='primary' className='bg-blue-600 text-white hover:bg-blue-500' />
                                <div className="flex gap-5">
                                    <Button id='update-cate' title='Cập nhật' type='primary' className='hidden bg-blue-600 text-white hover:bg-blue-500' onClick={handleUpdate} />
                                    <Button id='no-update-cate' type='primary' className='hidden bg-red-600 text-white hover:bg-red-500' leftIcon={<CloseIcon />} onClick={handleNoUpdate} />
                                </div>
                            </Form>
                        </div>
                        <div className="w-full max-h-5/6 flex flex-wrap justify-center gap-5 p-4 overflow-y-scroll">
                            {
                                categorys.map((category, index) =>
                                    <div key={index}
                                        className="sm:w-full sm:flex sm:!justify-between w-1/6 md:w-1/4 h-auto p-4 rounded bg-white shadow-lg">
                                        <Image src={category.photo[0]}
                                            alt={category.photo}
                                            className='sm:!w-12 sm:!h-12 w-28 h-28 sm:m-0 m-auto rounded-full object-cover'
                                        />
                                        <p className="text-center text-lg text-black font-medium py-2">{category.name}</p>
                                        <div className="flex justify-center gap-x-2">
                                            <Button className='text-white bg-green-600 hover:bg-green-500' type='primary'
                                                data-name={category.name} data-id={category._id}
                                                leftIcon={<UpdateIcon width='16px' height='16px' />} onClick={handleShowFormUpdate} />
                                            <Button className='text-white bg-red-600 hover:bg-red-500' type='primary' data-cate={category._id}
                                                leftIcon={<DeleteIcon width='16px' height='16px' />} onClick={handleDelete} />
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
            }
        </>
    );
}

export default Category;