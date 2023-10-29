import axios from "axios";
import { useEffect, useState } from "react";
import Form, { FormGroup, Input, Option, Select } from "~/components/Form";
import Validator from "~/utils/Validate/validator";

function UpdateInfoUser({ user }) {
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [avatar, setAvatar] = useState(null)
    const [addressArr, setAddressArr] = useState([])
    useEffect(() => {
        fetch(`https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1`)
            .then(res => res.json())
            .then(data => {
                setProvinces(data.data.data)
            })
            .catch(error => {
                console.log('Lỗi >>>', error)
            })

        setAddressArr(user.address.split(' - '))
    }, [])
    useEffect(() => {
        Validator({
            form: '#form-update-user',
            formGroup: '.form-group',
            formError: '.msg-error',
            rules: [],
            onRegister: function (data) {
                const fetchApi = async () => {
                    const formDataToSend = new FormData();
                    if (data) {
                        for (let key in data) {
                            formDataToSend.append(key, data[key]);
                        }
                    }
                    if (avatar) {
                        formDataToSend.append('avatar', avatar);
                    }
                    try {
                        axios.put(`${process.env.REACT_APP_API_URL}/api/users/${user._id}`, formDataToSend)
                            .then(response => {
                                alert('Cập nhật thông tin tài khoản thành công')
                                window.location.href = '/account';
                            })
                    } catch (error) {
                        console.error('Error sending PUT request:', error);
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

                    default:
                        break;
                }
                break;
            default:
                break;
        }
    };

    return (
        <div className="h-full overflow-auto pb-16">
            <h2 className="text-center text-4xl font-bold uppercase py-6 ">Thay đổi thông tin cá nhân</h2>
            <Form id="form-update-user" enctype="multipart/form-data" className="form p-4 grid sm:!grid-cols-1 grid-cols-2 gap-y-4 gap-x-8">
                <FormGroup className='w-full flex flex-col gap-2'>
                    <label className='font-semibold italic text-[var(--primary-color)]'>Họ và tên </label>
                    <Input
                        defaultValue={user.full_name}
                        id='full_name' name='full_name' type='text' placeholder='Nhập họ và tên'
                        className='w-full h-12 px-4 rounded-full border-2 border-solid border-[var(--primary-color)]'
                    />
                    <span className="msg-error text-red-600"></span>
                </FormGroup>
                <FormGroup className='w-full flex flex-col gap-2'>
                    <label className='font-semibold italic text-[var(--primary-color)]'>Số điện thoại đặt hàng</label>
                    <Input
                        defaultValue={user.phone}
                        id='phone' name='phone' type='text' placeholder='Nhập số điện thoại đặt hàng'
                        className='w-full h-12 px-4 rounded-full border-2 border-solid border-[var(--primary-color)]'
                    />
                    <span className="msg-error text-red-600"></span>
                </FormGroup>
                <FormGroup className='w-full flex flex-col gap-2'>
                    <label className='font-semibold italic text-[var(--primary-color)]'>Địa chỉ </label>
                    <div className="w-full flex sm:!flex-col md:!flex-col gap-2">
                        <Select className='sm:!w-full md:!w-full w-1/3 h-12 p-2 outline-none rounded-full border-2 border-solid border-[var(--primary-color)]' name='province' onChange={handleInputChange}>
                            <Option name={addressArr[3]} value={addressArr[3]} />
                            {/* <Option name='Tỉnh/ Thành Phố' /> */}
                            {
                                provinces.length > 0 && provinces.map(pro => <Option key={pro.code} value={pro.name_with_type} name={pro.name_with_type} />)
                            }
                        </Select>
                        <Select className='sm:!w-full md:!w-full w-1/3 h-12 p-2 outline-none rounded-full border-2 border-solid border-[var(--primary-color)]' name='district' onChange={handleInputChange}>
                            <Option name={addressArr[2]} value={addressArr[2]} />
                            {/* <Option name='Quận/ Huyện' /> */}
                            {
                                districts.length > 0 && districts.map(pro => <Option key={pro.code} value={pro.name_with_type} name={pro.name_with_type} />)
                            }
                        </Select>
                        <Select className='sm:!w-full md:!w-full w-1/3 h-12 p-2 outline-none rounded-full border-2 border-solid border-[var(--primary-color)]' name='ward' onChange={handleInputChange}>
                            <Option name={addressArr[1]} value={addressArr[1]} />
                            {/* <Option name='Phường/ Xã' /> */}
                            {
                                wards.length > 0 && wards.map(pro => <Option key={pro.code} value={pro.name_with_type} name={pro.name_with_type} />)
                            }
                        </Select>
                    </div>
                </FormGroup>
                <FormGroup className='w-full flex flex-col gap-2'>
                    <label className='font-semibold italic text-[var(--primary-color)]'>Số nhà, tên đường</label>
                    <Input
                        defaultValue={addressArr[0]}
                        id='address' name='address' type='text' placeholder='Nhập số nhà, tên đường'
                        className='w-full h-12 px-4 rounded-full border-2 border-solid border-[var(--primary-color)]'
                    />
                    <span className="msg-error text-red-600"></span>
                </FormGroup>

                <FormGroup className='w-full flex flex-col gap-2'>
                    <label className='font-semibold italic text-[var(--primary-color)]'>Gới tính </label>
                    <Select className='w-full h-12 p-2 outline-none rounded-full border-2 border-solid border-[var(--primary-color)]' name='gender'>
                        <Option value={user.gender} name={user.gender} />
                        {user.gender.toLowerCase() === 'nam' ? <Option value='Nữ' name='Nữ' /> : <Option value='Nam' name='Nam' />}
                    </Select>
                    <span className="msg-error text-red-600"></span>
                </FormGroup>
                <FormGroup className='w-full flex flex-col gap-2'>
                    <label className='font-semibold italic text-[var(--primary-color)]'>Ngày sinh </label>
                    <Input
                        defaultValue={user.date_birth}
                        id='date_birth' name='date_birth' type='date'
                        className='w-full h-12 px-4 rounded-full border-2 border-solid border-[var(--primary-color)]'
                    />
                    <span className="msg-error text-red-600"></span>
                </FormGroup>
                <div className='flex-col'>
                    <p className="notify-error mb-2 text-red-600"></p>
                    <button className='bg-orange-500 text-sm active:bg-gray-700 cursor-pointer font-regular text-white px-4 py-2 rounded uppercase'
                    >Đăng ký</button>
                </div>
            </Form>
        </div>
    );
}

export default UpdateInfoUser;