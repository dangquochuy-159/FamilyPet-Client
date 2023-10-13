import axios from 'axios';
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react';
import Form from '~/components/Form';
import FormGroup from '~/components/Form/FormGroup';
import Input from '~/components/Form/Input';
import { Option, Select } from '~/components/Form/Select';
import Modal from '~/components/Modal/modal';
import check from '~/utils/Validate/ruleCheck';
import Validator from '~/utils/Validate/validator';


function ModalAddAdmin({ trigger, className }) {
    const [provinces, setProvinces] = useState([])
    const [valueProvince, setValueProvince] = useState()
    const [districts, setDistricts] = useState([])
    const [valueDistrict, setValueDistrict] = useState()
    const [wards, setWards] = useState([])
    const [avatar, setAvatar] = useState(null)

    const ipEmail = useRef()

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_ADDRESS}?depth=3`)
            .then(res => res.json())
            .then(data => setProvinces(data))
    }, [])
    useEffect(() => {
        if (valueProvince !== undefined) {
            setDistricts(valueProvince.districts)
        }
    }, [valueProvince])

    useEffect(() => {
        if (valueDistrict !== undefined) {
            setWards(valueDistrict.wards)
        }
    }, [valueDistrict])

    useEffect(() => {
        Validator({
            form: '#form-add-admin',
            formGroup: '.form-group',
            formError: '.msg-error',
            rules: [
                Validator.isRequired("#full_name", check.isEmpty),
                Validator.isRequired("#email", check.isEmpty),
                Validator.isEmail("#email", check.isEmail),
                Validator.isRequired("#phone", check.isEmpty),
                Validator.isRequired("#password", check.isEmpty),
                Validator.isMinLength("#password", check.minPass, check.isPass()),
                Validator.isRequired("#confirm_password", check.isEmpty),
                Validator.isConfirmed("#confirm_password", function () {
                    return document.querySelector('#form-add-admin #password').value
                }, check.isConfirmPass),
                Validator.isRequired("#address", check.isEmpty),
                Validator.isRequired("#date_birth", check.isEmpty),
                Validator.isRequired('input[name="gender"]', check.isEmpty),
                Validator.isRequired('input[name="add_admin"]', check.isEmpty),
            ],
            onRegister: function (data) {
                let exits

                const fetchApi = async () => {
                    try {
                        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/search/?email=${data.email}`)
                        const results = await response.json();
                        if (results.exits) {
                            const ele = document.getElementById('email').parentElement.querySelector('.msg-error')
                            ele.innerHTML = 'Email đã được đăng ký'
                        } else {
                            const formDataToSend = new FormData();
                            if (data) {
                                for (let key in data) {
                                    if (key !== 'avatar') {
                                        formDataToSend.append(key, data[key]);
                                    }
                                }
                            }
                            if (avatar) {
                                formDataToSend.append('avatar', avatar);
                            }
                            try {
                                axios.post(`${process.env.REACT_APP_API_URL}/api/admins`, formDataToSend)
                                    .then(response => {
                                        alert('Đăng ký quản trị viên thành công')
                                        window.location.reload();
                                        console.log(response.data)
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

    const showPassWord = (e) => {
        let type = e.target.checked ? 'text' : 'password'
        document.getElementById('password').type = type
        document.getElementById('confirm_password').type = type

    }

    const handleInputChange = (event) => {
        const { name, value, type, files } = event.target;
        if (type === 'file') {
            setAvatar(files[0]);
        }
    };


    const handleChangeOption = (e) => {
        const { name, value } = e.target
        let ValueItem
        switch (name) {
            case "province":
                provinces.map((pro) => {
                    if (value === pro.name) {
                        return ValueItem = pro
                    }
                    return ValueItem
                })
                setValueProvince(ValueItem)
                break
            case "district":
                districts.map((dis) => {
                    if (value === dis.name) {
                        return ValueItem = dis
                    }
                    return ValueItem
                })
                setValueDistrict(ValueItem)
                break
            default:
                break;
        }
    }

    return (
        <Modal trigger={trigger} className={className}>
            <div className='w-full h-auto px-8 pb-8 pt-4'>
                <h2 className="text-4xl text-center text-[var(--primary-color)]">Thêm quản trị viên</h2>
                <Form id="form-add-admin" action="" method="POST" enctype="multipart/form-data" className="form flex flex-wrap space-y-4 mt-2">
                    <div className='w-full flex space-x-12'>
                        <FormGroup className='w-1/2 flex flex-col space-y-1'>
                            <Input
                                id='full_name' name='full_name' type='text' placeholder='Nhập họ và tên'
                                className='w-full h-12 px-4 border-b-2 border-solid border-gray-400'
                            />
                            <span className="msg-error text-red-600"></span>
                        </FormGroup>
                        <FormGroup className='w-1/2 flex flex-col space-y-1'>
                            <Input
                                ref={ipEmail} id='email' name='email' type='text' placeholder='Nhập email'
                                className='w-full h-12 px-4 border-b-2 border-solid border-gray-400'
                            />
                            <span className="msg-error text-red-600"></span>
                        </FormGroup>
                        <FormGroup className='w-1/2 flex flex-col space-y-1'>
                            <Input
                                id='phone' name='phone' type='text' placeholder='Nhập số điện thoại'
                                className='w-full h-12 px-4 border-b-2 border-solid border-gray-400'
                            />
                            <span className="msg-error text-red-600"></span>
                        </FormGroup>
                    </div>
                    <div className='w-full flex space-x-12'>
                        <FormGroup className='w-1/2 flex flex-col space-y-1'>
                            <Input
                                id='password' name='password' type='password' placeholder='Nhập mật khẩu'
                                className='w-full h-12 px-4 border-b-2 border-solid border-gray-400'
                            />
                            <span className="msg-error text-red-600"></span>
                        </FormGroup>
                        <FormGroup className='w-1/2 flex flex-col space-y-1'>
                            <Input
                                id='confirm_password' type='password' placeholder='Xác nhận mật khẩu'
                                className='w-full h-12 px-4 border-b-2 border-solid border-gray-400'
                            />
                            <span className="msg-error text-red-600"></span>
                        </FormGroup>
                    </div>
                    <FormGroup className='w-full flex justify-end space-y-1'>
                        <Input
                            id='show_pass' type='checkbox' title='Hiện mật khẩu'
                            className='w-6 h-6 px-4 border-b-2 border-solid border-gray-400'
                            onChange={showPassWord}
                        />
                    </FormGroup>

                    <FormGroup className='w-full flex justify-between flex-wrap'>
                        <Select className='w-1/4 p-2 outline-none border-2' name='province' onChange={handleChangeOption}>
                            <Option name='Tỉnh/ Thành Phố' />
                            {
                                provinces.map(pro => <Option key={pro.code} value={pro.name} name={pro.name} />)
                            }
                        </Select>
                        <Select className='w-1/4 p-2 outline-none border-2' name='district' onChange={handleChangeOption}>
                            <Option name='Quận/ Huyện' />
                            {
                                districts.map(pro => <Option key={pro.code} value={pro.name} name={pro.name} />)
                            }
                        </Select>
                        <Select className='w-1/4 p-2 outline-none border-2' name='ward' onChange={handleChangeOption}>
                            <Option name='Phường/ Xã' />
                            {
                                wards.map(pro => <Option key={pro.code} value={pro.name} name={pro.name} />)
                            }
                        </Select>
                    </FormGroup>
                    <div className='w-full flex space-x-12'>
                        <FormGroup className='w-full flex flex-col space-y-1'>
                            <Input
                                id='address' name='address' type='text' placeholder='Nhập số nhà, tên đường'
                                className='w-full h-12 px-4 border-b-2 border-solid border-gray-400'
                            />
                            <span className="msg-error text-red-600"></span>
                        </FormGroup>
                        <FormGroup className='w-full flex flex-col space-y-1'>
                            <Input
                                id='date_birth' name='date_birth' type='date'
                                className='w-full h-12 px-4 border-b-2 border-solid border-gray-400'
                            />
                            <span className="msg-error text-red-600"></span>
                        </FormGroup>
                    </div>
                    <FormGroup className='w-full flex space-x-2'>
                        <Input
                            name='gender' type='radio' value='Nam' title='Nam' label='Giới tính: '
                            className='w-4 h-4'
                        />
                        <Input
                            name='gender' type='radio' value='Nữ' title='Nữ'
                            className='w-4 h-4'
                        />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                    <FormGroup className='w-full flex space-x-2'>
                        <Input
                            name='add_admin' type='radio' value='true' title='Có' label='Quyền đăng kí tài khoản quản trị viên: '
                            className='w-4 h-4'
                        />
                        <Input
                            name='add_admin' type='radio' value='false' title='Không'
                            className='w-4 h-4'
                        />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                    <FormGroup className='w-full flex space-x-2'>
                        <Input
                            id='avatar' type='file' label='Ảnh đại diện: '
                            className='w-1/2 h-12'
                            onChange={handleInputChange}
                        />
                    </FormGroup>
                    <button className='bg-orange-500 text-sm active:bg-gray-700 cursor-pointer font-regular text-white px-4 py-2 rounded uppercase'>Dang ky</button>
                </Form >
            </div >
        </Modal >
    );
}

ModalAddAdmin.prototype = {
    trigger: PropTypes.node.isRequired,
    className: PropTypes.string,
}

export default ModalAddAdmin;