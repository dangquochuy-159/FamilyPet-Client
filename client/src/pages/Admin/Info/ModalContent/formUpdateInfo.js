import axios from 'axios';
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from "react";
import Form, { FormGroup, Input, Option, Select } from "~/components/Form";
import check from '~/utils/Validate/ruleCheck';
import Validator from '~/utils/Validate/validator';

function FormUpdateInfo({ admin }) {
    const [provinces, setProvinces] = useState([])
    const [valueProvince, setValueProvince] = useState()
    const [districts, setDistricts] = useState([])
    const [valueDistrict, setValueDistrict] = useState()
    const [wards, setWards] = useState([])
    const ipAddressRef = useRef()

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
            form: '#form-update-info',
            formGroup: '.form-group',
            formError: '.msg-error',
            rules: [],
            onRegister: function (data) {
                const formDataToSend = new FormData();
                if (data) {
                    for (let key in data) {
                        formDataToSend.append(key, data[key]);
                    }
                }
                try {
                    axios.put(`${process.env.REACT_APP_API_URL}/api/admins/${admin._id}`, formDataToSend)
                        .then(response => {
                            alert('Cập nhật thông tin quản trị viên thành công')
                            window.location.reload();
                        })
                } catch (error) {
                    console.error('Error sending PUT request:', error);
                }
            }
        })
    })

    const handleInputChange = (event) => {
        const { name, value, type } = event.target;

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
                ipAddressRef.current.value = ''
                break
            case "district":
                districts.map((dis) => {
                    if (value === dis.name) {
                        return ValueItem = dis
                    }
                    return ValueItem
                })
                setValueDistrict(ValueItem)
                ipAddressRef.current.value = ''
                break
            case "ward":
                ipAddressRef.current.value = ''
                break
            default:
                break;
        }
    }

    return (
        <div className='w-full h-auto px-8 pb-8 pt-4 sm:!pb-20 sm:overflow-auto sm:!h-full'>
            <h2 className="sm:!text-xl text-4xl text-center text-[var(--primary-color)]">Chỉnh sửa thông tin cá nhân</h2>
            <Form id="form-update-info" action="" method="POST" className="form flex flex-wrap space-y-4 mt-2">
                <div className='w-full flex sm:!flex-col gap-x-12 gap-y-2'>
                    <FormGroup className='sm:w-full w-1/2 flex flex-col space-y-1'>
                        <Input
                            id='full_name' name='full_name' type='text' placeholder='Nhập họ và tên'
                            className='w-full h-12 px-4 border-b-2 border-solid border-gray-400'
                        />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                    <FormGroup className='sm:w-full w-1/2 flex flex-col space-y-1'>
                        <Input
                            id='email' name='email' type='text' placeholder='Nhập email' defaultValue={admin.email} disabled
                            className='w-full h-12 px-4 text-gray-400 bg-transparent'
                        />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                    <FormGroup className='sm:w-full w-1/2 flex flex-col space-y-1'>
                        <Input
                            id='phone' name='phone' type='text' placeholder='Nhập số điện thoại'
                            className='w-full h-12 px-4 border-b-2 border-solid border-gray-400'
                        />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                </div>

                <FormGroup className='w-full flex justify-between flex-wrap'>
                    <Select className='w-1/4 p-2 outline-none border-2' name='province' onChange={handleInputChange}>
                        <Option value='' name='Tỉnh/ Thành Phố' />
                        {
                            provinces.map(pro => <Option key={pro.code} value={pro.name} name={pro.name} />)
                        }
                    </Select>
                    <Select className='w-1/4 p-2 outline-none border-2' name='district' onChange={handleInputChange}>
                        <Option value='' name='Quận/ Huyện' />
                        {
                            districts.map(pro => <Option key={pro.code} value={pro.name} name={pro.name} />)
                        }
                    </Select>
                    <Select className='w-1/4 p-2 outline-none border-2' name='ward' onChange={handleInputChange}>
                        <Option value='' name='Phường/ Xã' />
                        {
                            wards.map(pro => <Option key={pro.code} value={pro.name} name={pro.name} />)
                        }
                    </Select>
                </FormGroup>
                <div className='w-full flex sm:flex-col gap-x-12 gap-y-2'>
                    <FormGroup className='w-full flex flex-col space-y-1'>
                        <Input
                            innerRef={ipAddressRef}
                            id='address' name='address' type='text' placeholder='Nhập số nhà, tên đường'
                            className='w-full h-12 px-4 border-b-2 border-solid border-gray-400'
                        />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                    <FormGroup className='w-full flex flex-col space-y-1'>
                        <Input
                            id='date_birth' name='date_birth' type='date'
                            className='w-full h-12 px-4 border-b-2 border-solid border-gray-400 hover:cursor-pointer'
                        />
                        <span className="msg-error text-red-600"></span>
                    </FormGroup>
                </div>
                <button className='bg-orange-500 text-sm active:bg-gray-700 cursor-pointer font-regular text-white px-4 py-2 rounded uppercase'>Cập nhật</button>
            </Form >
        </div >
    );
}

FormUpdateInfo.prototype = {
    admin: PropTypes.object,
}

export default FormUpdateInfo;