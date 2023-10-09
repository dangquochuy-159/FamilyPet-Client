import { useContext } from "react";
import { Header } from "~/layouts/AdminLayout/components";
import AdminContext from '~/context/AdminContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStop } from "@fortawesome/free-solid-svg-icons";
import { ImageIcon, InfoIcon } from "~/components/Icons";
import { ButtonAdmin } from "~/components/Button";
import Image from "~/components/Image";

function Info() {
    const context = useContext(AdminContext)
    // console.log(context.admin);
    return (
        <>
            <Header title='Thông tin quản trị viên' name={context.name} avatar={context.avatar} />
            <div className="wrapper-page w-full h-full flex flex-col  pb-8">
                <div className=" flex bg-white mb-2">
                    <div className="w-2/5 h-full flex flex-col items-center p-8 ">
                        <Image
                            src={`${process.env.REACT_APP_API_URL}/api/admins/${context.admin._id}/${context.admin.avatar}`}
                            className='w-full h-64 object-contain'
                            alt="avatar"
                        />
                        <div className="w-full flex mt-4 space-x-2">
                            <ButtonAdmin className='w-1/2 bg-[var(--primary-color)]' title='Thay dổi ảnh' icon={<ImageIcon />} />
                            <ButtonAdmin className='w-1/2 bg-[var(--primary-color)]' title='Thay đổi thông tin' icon={<InfoIcon />} />
                        </div>
                    </div>
                    <div className="w-3/5 h-full p-8 space-y-2">
                        <h2 className="text-4xl pb-2 font-bold text-[#71cbe8]">Thông tin cá nhân</h2>
                        <p className="ml-4 text-lg">
                            <FontAwesomeIcon className="text-sm" icon={faStop} />
                            <span className="ml-2 font-semibold">Họ và tên: </span>
                            <span className="text-[var(--primary-color)]">Đặng Quốc Huy</span>
                        </p>
                        <p className="ml-4 text-lg">
                            <FontAwesomeIcon className="text-sm" icon={faStop} />
                            <span className="ml-2 font-semibold">Tài khoản: </span>
                            <span className="text-[var(--primary-color)]">admin@gmail.com</span>
                        </p>
                        <p className="ml-4 text-lg">
                            <FontAwesomeIcon className="text-sm" icon={faStop} />
                            <span className="ml-2 font-semibold">Giới tính: </span>
                            <span className="text-[var(--primary-color)]">Nam</span>
                        </p>
                        <p className="ml-4 text-lg">
                            <FontAwesomeIcon className="text-sm" icon={faStop} />
                            <span className="ml-2 font-semibold">Số điện thoại: </span>
                            <span className="text-[var(--primary-color)]">0854395048</span>
                        </p>
                        <p className="ml-4 text-lg">
                            <FontAwesomeIcon className="text-sm" icon={faStop} />
                            <span className="ml-2 font-semibold">Ngày sinh: </span>
                            <span className="text-[var(--primary-color)]">22/12/2002</span>
                        </p>
                        <p className="ml-4 text-lg">
                            <FontAwesomeIcon className="text-sm" icon={faStop} />
                            <span className="ml-2 font-semibold">Địa chỉ: </span>
                            <span className="text-[var(--primary-color)]">số 4 đường số 4 phường 7 gò vấp</span>
                        </p>
                        <p className="ml-4 text-lg">
                            <FontAwesomeIcon className="text-sm" icon={faStop} />
                            <span className="ml-2 font-semibold">Quyền đăng kí tài khoản: </span>
                            <span className="text-[var(--primary-color)]">Có</span>
                        </p>

                    </div>
                </div>
                {/* <h2>Danh sách quản trị viên</h2>
                <div className="h-2/3">huy</div> */}

            </div>
        </>
    );
}

export default Info;