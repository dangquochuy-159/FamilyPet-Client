import axios from 'axios';
import { useEffect, useState } from 'react';
import Form, { FormGroup, Input, Option, Select } from '~/components/Form';
import check from '~/utils/Validate/ruleCheck';
import Validator from '~/utils/Validate/validator';


function FormAddAdmin() {
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [avatar, setAvatar] = useState(null)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_ADDRESS}/province`)
            .then(res => res.json())
            .then(data => setProvinces(data.results))
            .catch(error => console.log('Lỗi >>>', error))
    }, [])


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

        switch (type) {
            case 'select-one':
                switch (name) {
                    case "province":
                        provinces.map((pro) => {
                            return value === pro.province_name &&
                                fetch(`${process.env.REACT_APP_API_ADDRESS}/province/district/${pro.province_id}`)
                                    .then(res => res.json())
                                    .then(data => setDistricts(data.results))
                                    .catch(error => console.log('Lỗi >>>', error))
                        })
                        break
                    case "district":
                        districts.map((dis) => {
                            return value === dis.district_name &&
                                fetch(`${process.env.REACT_APP_API_ADDRESS}/province/ward/${dis.district_id}`)
                                    .then(res => res.json())
                                    .then(data => setWards(data.results))
                                    .catch(error => console.log('Lỗi >>>', error))
                        })
                        break
                    default:
                        break;
                }
                break;
            case 'file':
                setAvatar(files[0]);
                break;
            default:
                break;
        }
    };

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
        <div className='w-full h-auto px-8 pb-8 pt-4 sm:!h-full sm:!pb-20 sm:overflow-auto md:!h-full md:!pb-20 md:overflow-auto'>
            <h2 className="text-4xl text-center text-[var(--primary-color)]">Thêm quản trị viên</h2>
            <Form id="form-add-admin" action="" method="POST" enctype="multipart/form-data" className="form flex flex-wrap space-y-4 mt-2">
                <div className='w-full flex sm:flex-col md:flex-col gap-x-12 gap-y-2'>
                    <FormGroup className='sm:!w-full md:w-full w-1/2 flex flex-col space-y-1'>
                        <Input
                            id='full_name' name='full_name' type='text' placeholder='Nhập họ và tên'
                            className='w-full h-12 px-4 border-b-2 border-solid border-gray-400'
                        />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                    <FormGroup className='sm:!w-full md:w-full w-1/2 flex flex-col space-y-1'>
                        <Input
                            id='email' name='email' type='text' placeholder='Nhập email'
                            className='w-full h-12 px-4 border-b-2 border-solid border-gray-400'
                        />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                    <FormGroup className='sm:!w-full md:w-full w-1/2 flex flex-col space-y-1'>
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
                    <Select className='w-1/4 p-2 outline-none border-2' name='province' onChange={handleInputChange}>
                        <Option name='Tỉnh/ Thành Phố' />
                        {
                            provinces.map(pro => <Option key={pro.province_id} value={pro.province_name} name={pro.province_name} />)
                        }
                    </Select>
                    <Select className='w-1/4 p-2 outline-none border-2' name='district' onChange={handleInputChange}>
                        <Option name='Quận/ Huyện' />
                        {
                            districts.map(dis => <Option key={dis.district_id} value={dis.district_name} name={dis.district_name} />)
                        }
                    </Select>
                    <Select className='w-1/4 p-2 outline-none border-2' name='ward' onChange={handleInputChange}>
                        <Option name='Phường/ Xã' />
                        {
                            wards.map(ward => <Option key={ward.ward_id} value={ward.ward_name} name={ward.ward_name} />)
                        }
                    </Select>
                </FormGroup>
                <div className='w-full flex sm:flex-col gap-x-12 gap-y-2'>
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
                <FormGroup className='w-full flex flex sm:flex-col gap-2'>
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
                <FormGroup className='w-full flex sm:flex-col gap-2'>
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
                <div className='flex-col'>
                    <p className="notify-error mb-2 text-red-600"></p>
                    <button className='bg-orange-500 text-sm active:bg-gray-700 cursor-pointer font-regular text-white px-4 py-2 rounded uppercase'
                        onClick={handleSubmitForm}
                    >Đăng ký</button>
                </div>
            </Form >
        </div >
    );
}

export default FormAddAdmin;