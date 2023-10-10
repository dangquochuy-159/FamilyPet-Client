import { useContext, useEffect, useState } from "react";
import AdminContext from '~/context/AdminContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStop } from "@fortawesome/free-solid-svg-icons";
import { ImageIcon, InfoIcon } from "~/components/Icons";
import { Button } from "~/components/Button";
import Image from "~/components/Image";


function InfoPersonal() {
    const context = useContext(AdminContext)
    const [admin, setAdmin] = useState({})

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/admins/${context.admin._id}`)
            .then(res => res.json())
            .then(data => {
                setAdmin(data.data)
            })
    })
    return (
        <div className="wrapper-info-admin flex bg-white mb-2">
            <div className="w-2/5 h-full flex flex-col items-center py-8 pl-8">
                <Image
                    src={`${process.env.REACT_APP_API_URL}/api/admins/${admin._id}/${admin.avatar}`}
                    className='w-56 h-56 object-cover rounded-full'
                    alt="avatar"
                />
                <div className="w-full flex mt-4 space-x-2">
                    <Button onClick={() => console.log(`${process.env.REACT_APP_API_URL}/api/admins/${admin._id}/${admin.avatar}`)} className='w-1/2 bg-[var(--primary-color)] text-white py-4' type='primary' title='Thay dổi ảnh' rightIcon={<ImageIcon />} />
                    <Button className='w-1/2 bg-[var(--primary-color)] text-white py-4' type='primary' title='Thay đổi thông tin' rightIcon={<InfoIcon />} />
                </div>
            </div>
            <div className="w-3/5 h-full p-8 space-y-2">
                <h2 className="text-4xl pb-2 font-bold text-[#71cbe8]">Thông tin cá nhân</h2>
                <p className="ml-4 text-lg">
                    <FontAwesomeIcon className="text-sm" icon={faStop} />
                    <span className="ml-2 font-semibold">Họ và tên: </span>
                    <span className="text-[var(--primary-color)]">{admin.full_name}</span>
                </p>
                <p className="ml-4 text-lg">
                    <FontAwesomeIcon className="text-sm" icon={faStop} />
                    <span className="ml-2 font-semibold">Tài khoản: </span>
                    <span className="text-[var(--primary-color)]">{admin.email}</span>
                </p>
                <p className="ml-4 text-lg">
                    <FontAwesomeIcon className="text-sm" icon={faStop} />
                    <span className="ml-2 font-semibold">Giới tính: </span>
                    <span className="text-[var(--primary-color)]">{admin.gender}</span>
                </p>
                <p className="ml-4 text-lg">
                    <FontAwesomeIcon className="text-sm" icon={faStop} />
                    <span className="ml-2 font-semibold">Số điện thoại: </span>
                    <span className="text-[var(--primary-color)]">{admin.phone}</span>
                </p>
                <p className="ml-4 text-lg">
                    <FontAwesomeIcon className="text-sm" icon={faStop} />
                    <span className="ml-2 font-semibold">Ngày sinh: </span>
                    <span className="text-[var(--primary-color)]">{admin.date_birth}</span>
                </p>
                <p className="ml-4 text-lg">
                    <FontAwesomeIcon className="text-sm" icon={faStop} />
                    <span className="ml-2 font-semibold">Địa chỉ: </span>
                    <span className="text-[var(--primary-color)]">{admin.address}</span>
                </p>
                <p className="ml-4 text-lg">
                    <FontAwesomeIcon className="text-sm" icon={faStop} />
                    <span className="ml-2 font-semibold">Quyền đăng kí tài khoản: </span>
                    {
                        admin.add_admin ? (
                            <span className="text-[var(--primary-color)]">Có</span>
                        ) : (
                            <span className="text-[var(--primary-color)]">Không</span>
                        )
                    }
                </p>

            </div>
        </div>
    );
}

export default InfoPersonal;