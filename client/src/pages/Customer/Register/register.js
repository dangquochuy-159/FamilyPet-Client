import axios from "axios";
import { useEffect, useState } from "react";
import Form, { FormGroup, Input, Option, Select } from "~/components/Form";
import check from "~/utils/Validate/ruleCheck";
import Validator from "~/utils/Validate/validator";
import ConnectServer from "~/components/ConnectError";

function Register() {
    const [connectServer, setConnectServer] = useState(false)
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [avatar, setAvatar] = useState(null)
    const [emailLogin, setEmailLogin] = useState(true)
    useEffect(() => {
        fetch(`https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1`)
            .then(res => res.json())
            .then(data => {
                setProvinces(data.data.data)
                setConnectServer(true)
            })
            .catch(error => {
                console.log('Lỗi >>>', error)
                setConnectServer(false)
            })
    }, [])

    useEffect(() => {
        Validator({
            form: '#form-register-user',
            formGroup: '.form-group',
            formError: '.msg-error',
            rules: [
                Validator.isRequired("#full_name", check.isEmpty),
                emailLogin ? Validator.isRequired("#email", check.isEmpty) : Validator.isRequired("#full_name", check.isEmpty),
                emailLogin ? Validator.isEmail("#email", check.isEmail) : Validator.isRequired("#full_name", check.isEmpty),
                !emailLogin ? Validator.isRequired("#phone_login", check.isEmpty) : Validator.isRequired("#full_name", check.isEmpty),
                Validator.isRequired("#phone", check.isEmpty),
                Validator.isRequired("#password", check.isEmpty),
                Validator.isMinLength("#password", check.minPass, check.isPass()),
                Validator.isRequired("#confirm_password", check.isEmpty),
                Validator.isConfirmed("#confirm_password", function () {
                    return document.querySelector('#form-register-user #password').value
                }, check.isConfirmPass),
                Validator.isRequired("#address", check.isEmpty),
                Validator.isRequired("#date_birth", check.isEmpty),
            ],
            onRegister: function (data) {
                console.log(data)
                const fetchApi = async () => {
                    const query = emailLogin ? `email=${data.email}` : `phone_login=${data.phone_login}`
                    try {
                        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/search?${query}`)
                        const results = await response.json();
                        if (results.exits) {
                            const ele = document.getElementById(`${emailLogin ? 'email' : 'phone_login'}`).parentElement.querySelector('.msg-error')
                            ele.innerHTML = emailLogin ? 'Email đã được đăng ký' : 'Số điện thoại đã được đăng ký'
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
                                console.log('send data')
                                axios.post(`${process.env.REACT_APP_API_URL}/api/users`, formDataToSend)
                                    .then(response => {
                                        alert('Đăng ký tài khoản thành công')
                                        window.location.href = '/login';
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

    const handleInputChange = (event) => {
        const { name, value, type, files } = event.target;
        switch (type) {
            case 'select-one':
                switch (name) {
                    case "province":
                        provinces.map((pro) => {
                            return value === pro.name_with_type &&
                                fetch(`https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${pro.code}&limit=-1`)
                                    .then(res => res.json())
                                    .then(data => setDistricts(data.data.data))
                                    .catch(error => console.log('Lỗi >>>', error))
                        })
                        break
                    case "district":
                        districts.map((dis) => {
                            return value === dis.name_with_type &&
                                fetch(`https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${dis.code}&limit=-1`)
                                    .then(res => res.json())
                                    .then(data => setWards(data.data.data))
                                    .catch(error => console.log('Lỗi >>>', error))
                        })
                        break
                    case 'method_login':
                        emailLogin ? document.getElementById('email').parentElement.querySelector('.msg-error').innerHTML = '' :
                            document.getElementById('phone_login').parentElement.querySelector('.msg-error').innerHTML = ''
                        emailLogin ? document.getElementById('email').value = '' :
                            document.getElementById('phone_login').value = ''
                        setEmailLogin(!emailLogin)
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
        <div id='page-register' className="grid_layout wide !p-8 bg-white">
            <h2 className="text-center text-4xl font-bold uppercase py-6 ">Đăng kí tài khoản</h2>
            {!connectServer ? <ConnectServer /> :
                <Form id="form-register-user" enctype="multipart/form-data" className="form p-4 grid sm:!grid-cols-1 grid-cols-2 gap-y-4 gap-x-8">
                    <FormGroup className='w-full flex flex-col gap-2'>
                        <label className='font-semibold italic text-[var(--primary-color)]'>Họ và tên </label>
                        <Input
                            id='full_name' name='full_name' type='text' placeholder='Nhập họ và tên'
                            className='w-full h-12 px-4 rounded-full border-2 border-solid border-[var(--primary-color)]'
                        />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                    <FormGroup className='w-full flex flex-col gap-2'>
                        <label className='font-semibold italic text-[var(--primary-color)]'>Phương thức đăng nhập</label>
                        <Select className='w-full h-12 p-2 outline-none rounded-full border-2 border-solid border-[var(--primary-color)]' name='method_login' onChange={handleInputChange}>
                            <Option value='email' name='Email' />
                            <Option value='phone_login' name='Số điện thoại' />
                        </Select>
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                    <FormGroup className='w-full flex flex-col gap-2'>
                        <label className='font-semibold italic text-[var(--primary-color)]'>Email </label>
                        <Input
                            disabled={!emailLogin}
                            id={emailLogin ? 'email' : ''} name='email' type='text' placeholder='Nhập Email'
                            className='w-full h-12 px-4 rounded-full border-2 border-solid border-[var(--primary-color)]'
                        />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                    <FormGroup className='w-full flex flex-col gap-2'>
                        <label className='font-semibold italic text-[var(--primary-color)]'>Số điện thoại đăng nhập </label>
                        <Input
                            disabled={emailLogin}
                            id={emailLogin ? '' : 'phone_login'} name='phone_login' type='text' placeholder='Nhập số điện thoại đăng nhập'
                            className='w-full h-12 px-4 rounded-full border-2 border-solid border-[var(--primary-color)]'
                        />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                    <FormGroup className='w-full flex flex-col space-y-1'>
                        <label className='font-semibold italic text-[var(--primary-color)]'>Mật khẩu</label>
                        <Input
                            id='password' name='password' type='password' placeholder='Nhập mật khẩu'
                            className='w-full h-12 px-4 rounded-full border-2 border-solid border-[var(--primary-color)]'
                        />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                    <FormGroup className='w-full flex flex-col space-y-1'>
                        <label className='font-semibold italic text-[var(--primary-color)]'>Nhập lại mật khẩu </label>
                        <Input
                            id='confirm_password' type='password' placeholder='Nhập lại mật khẩu'
                            className='w-full h-12 px-4 rounded-full border-2 border-solid border-[var(--primary-color)]'
                        />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                    <FormGroup className='w-full flex flex-col gap-2'>
                        <label className='font-semibold italic text-[var(--primary-color)]'>Địa chỉ </label>
                        <div className="w-full flex sm:!flex-col md:!flex-col gap-2">
                            <Select className='sm:!w-full md:!w-full w-1/3 h-12 p-2 outline-none rounded-full border-2 border-solid border-[var(--primary-color)]' name='province' onChange={handleInputChange}>
                                <Option name='Tỉnh/ Thành Phố' />
                                {
                                    provinces.length > 0 && provinces.map(pro => <Option key={pro.code} value={pro.name_with_type} name={pro.name_with_type} />)
                                }
                            </Select>
                            <Select className='sm:!w-full md:!w-full w-1/3 h-12 p-2 outline-none rounded-full border-2 border-solid border-[var(--primary-color)]' name='district' onChange={handleInputChange}>
                                <Option name='Quận/ Huyện' />
                                {
                                    districts.length > 0 && districts.map(pro => <Option key={pro.code} value={pro.name_with_type} name={pro.name_with_type} />)
                                }
                            </Select>
                            <Select className='sm:!w-full md:!w-full w-1/3 h-12 p-2 outline-none rounded-full border-2 border-solid border-[var(--primary-color)]' name='ward' onChange={handleInputChange}>
                                <Option name='Phường/ Xã' />
                                {
                                    wards.length > 0 && wards.map(pro => <Option key={pro.code} value={pro.name_with_type} name={pro.name_with_type} />)
                                }
                            </Select>
                        </div>
                    </FormGroup>
                    <FormGroup className='w-full flex flex-col gap-2'>
                        <label className='font-semibold italic text-[var(--primary-color)]'>Số nhà, tên đường</label>
                        <Input
                            id='address' name='address' type='text' placeholder='Nhập số nhà, tên đường'
                            className='w-full h-12 px-4 rounded-full border-2 border-solid border-[var(--primary-color)]'
                        />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                    <FormGroup className='w-full flex flex-col gap-2'>
                        <label className='font-semibold italic text-[var(--primary-color)]'>Số điện thoại đặt hàng</label>
                        <Input
                            id='phone' name='phone' type='text' placeholder='Nhập số điện thoại đặt hàng'
                            className='w-full h-12 px-4 rounded-full border-2 border-solid border-[var(--primary-color)]'
                        />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                    <FormGroup className='w-full flex flex-col gap-2'>
                        <label className='font-semibold italic text-[var(--primary-color)]'>Gới tính </label>
                        <Select className='w-full h-12 p-2 outline-none rounded-full border-2 border-solid border-[var(--primary-color)]' name='gender'>
                            <Option value='Nam' name='Nam' />
                            <Option value='Nữ' name='Nứ' />
                        </Select>
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                    <FormGroup className='w-full flex flex-col gap-2'>
                        <label className='font-semibold italic text-[var(--primary-color)]'>Ngày sinh </label>
                        <Input
                            id='date_birth' name='date_birth' type='date'
                            className='w-full h-12 px-4 rounded-full border-2 border-solid border-[var(--primary-color)]'
                        />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                    <FormGroup className='w-full flex flex-col gap-2'>
                        <label className='font-semibold italic text-[var(--primary-color)]'>Ảnh đại diện</label>
                        <Input
                            id='avatar' type='file'
                            className='w-full py-2 px-4 rounded-full border-2 border-solid border-[var(--primary-color)]'
                            onChange={handleInputChange}
                        />
                    </FormGroup>
                    <div className='flex-col'>
                        <p className="notify-error mb-2 text-red-600"></p>
                        <button className='bg-orange-500 text-sm active:bg-gray-700 cursor-pointer font-regular text-white px-4 py-2 rounded uppercase'
                            onClick={handleSubmitForm}
                        >Đăng ký</button>
                    </div>
                </Form>
            }
        </div>
    );
}

export default Register;