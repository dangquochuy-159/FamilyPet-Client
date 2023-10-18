import { useEffect, useState } from "react";

import ConnectError from "~/components/ConnectError";
import Form, { FormGroup, Input } from "~/components/Form";
import { Button } from "~/components/Button";
import Image from "~/components/Image";
import { CloseIcon, DeleteIcon, UpdateIcon } from "~/components/Icons";
import Validator from "~/utils/Validate/validator";
import check from "~/utils/Validate/ruleCheck";
import axios from "axios";


function Category() {
    const [connectServer, setConnectServer] = useState(false)
    const [categorys, setCategorys] = useState([])
    const [idCategory, setIdCategory] = useState('')
    const ipName = document.getElementById('name')
    const ipFile = document.getElementById('photo')
    const btnAdd = document.getElementById('add-cate')
    const btnUpdate = document.getElementById('update-cate')
    const btnNoUpdate = document.getElementById('no-update-cate')

    // get API
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/categorys`)
            .then(res => res.json())
            .then(data => {
                setConnectServer(true)
                setCategorys(data.data)
            })
            .catch(err => setConnectServer(false))
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
                const formData = new FormData()
                formData.append('name', data.name)
                ipFile.files && formData.append('photo', ipFile.files[0])

                axios.post(`${process.env.REACT_APP_API_URL}/api/categorys`, formData)
                    .then(res => {
                        window.location.reload()
                    })
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
        btnAdd.classList.add('hidden')
        btnUpdate.classList.remove('hidden')
        btnNoUpdate.classList.remove('hidden')
    }

    // function update category
    const handleUpdate = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', ipName.value)
        ipFile.files && formData.append('photo', ipFile.files[0])
        axios.put(`${process.env.REACT_APP_API_URL}/api/categorys/${idCategory}`, formData)
            .then(res => window.location.reload())
    }

    // function cancel update category
    const handleNoUpdate = (e) => {
        e.preventDefault()
        btnAdd.classList.remove('hidden')
        btnUpdate.classList.add('hidden')
        btnNoUpdate.classList.add('hidden')
        ipFile.value = ''
        ipName.value = ''
    }

    return (
        <div className="wrapper-page flex flex-col  ">
            {
                !connectServer ? <ConnectError /> :
                    <div className="w-full h-full bg-white p-4 flex flex-col gap-y-5">
                        <div className="w-full h-1/6">
                            <Form id='form-add-cate'
                                className='w-full h-full flex items-center justify-center gap-x-10 p-4 border-2 border-solid border-gray-200'>
                                <FormGroup className="flex items-center gap-x-5">
                                    <Input id='name' name='name' label='Tên danh mục' type='text' placeholder='Nhập tên danh mục'
                                        className="h-14 border-2 border-solid p-2 border-gray-300"
                                    />
                                    <span className="msg-error text-red-600"></span>
                                </FormGroup>
                                <FormGroup className="flex items-center gap-x-5">
                                    <Input id='photo' label='Ảnh danh mục' type='file' />
                                </FormGroup>
                                <Button id='add-cate' title='Thêm' type='primary' className='bg-blue-600 text-white' />
                                <Button id='update-cate' title='Cập nhật' type='primary' className='hidden bg-blue-600 text-white' onClick={handleUpdate} />
                                <Button id='no-update-cate' type='primary' className='hidden bg-red-600 text-white' leftIcon={<CloseIcon />} onClick={handleNoUpdate} />
                            </Form>
                        </div>
                        <div className="w-full max-h-5/6 flex flex-wrap justify-center gap-5 p-4 overflow-y-scroll">
                            {
                                categorys.map((category, index) =>
                                    <div key={index}
                                        className="w-1/6 h-auto p-4 rounded bg-[var(--primary-color)] shadow-lg">
                                        <Image src={`${process.env.REACT_APP_API_URL}/api/categorys/${category._id}/${category.photo}`}
                                            alt={category.photo}
                                            className='w-28 h-28 m-auto  rounded-full object-cover'
                                        />
                                        <p className="text-center text-lg text-white font-medium py-2">{category.name}</p>
                                        <div className="flex justify-center gap-x-2">
                                            <Button className='text-white bg-green-600' type='primary'
                                                data-name={category.name} data-id={category._id}
                                                leftIcon={<UpdateIcon width='16px' height='16px' />} onClick={handleShowFormUpdate} />
                                            <Button className='text-white bg-red-600' type='primary' data-cate={category._id}
                                                leftIcon={<DeleteIcon width='16px' height='16px' />} onClick={handleDelete} />
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
            }
        </div>
    );
}

export default Category;