import { useContext, useEffect, useState } from "react";
import { Button } from "~/components/Button";
import ConnectServer from "~/components/ConnectError";
import { ImageIcon, IntroduceIcon } from "~/components/Icons";
import Image from "~/components/Image";
import Modal from "~/components/Modal/modal";
import CustomerContext from "~/context/CustomerContext";
import UpdateAvatarUser from "./updateAvatarUser";
import UpdateInfoUser from "./updateInfoUser";

function InfoAccount() {

    // const [user, setUser] = useState({})
    const [userLogin] = useContext(CustomerContext)
    const changeRank = {
        diamond: 'Kim cương',
        gold: 'Vàng',
        silver: 'Bạc',
        bronze: 'Đồng',
        member: 'Thành viên'
    }

    return (
        <section id='sec-account_info' className="w-full h-auto bg-white shadow-xl shadow-white relative">
            <div div className="w-full h-auto grid sm:!grid-cols-1 md:!grid-cols-1 grid-cols-4">
                <div className="col-span-1 w-full h-full p-4 flex justify-center items-center">
                    <Image src={`${process.env.REACT_APP_API_URL}/api/users/${userLogin._id}/${userLogin.avatar}`} alt='avatar'
                        className='w-[200px] h-[200px] rounded-full object-cover'
                    />
                </div>
                <div className="col-span-3 p-8 grid grid-cols-1 gap-4">
                    <p className="text-3xl sm:!text-center md:!text-center font-bold">{userLogin.full_name}</p>
                    <div className="grid sm:!grid-cols-1 md:!grid-cols-2 grid-cols-4 gap-2">
                        <p>Tài khoản: {userLogin.email ? userLogin.email : userLogin.phone_login}</p>
                        <p>Số điện thoại: {userLogin.phone}</p>
                        <p>Giới tính: {userLogin.gender}</p>
                        <p>Ngày sinh: {userLogin.date_birth}</p>
                        <p className="sm:!col-span-1 md:!col-span-2 col-span-4">Địa chỉ: {userLogin.address}</p>
                    </div>
                    <div className=" grid sm:!grid-cols-1 md:!grid-cols-2 grid-cols-4 gap-2">
                        <p>Bậc xếp hạng: {Object.keys(userLogin.rank).map(key => userLogin.rank[key] && changeRank[key])}</p>
                        <p>Tổng hóa đơn: {userLogin.total_order}</p>
                        <p className="col-span-1">Tổng thanh toán: {userLogin.total_pay.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                        <p className="col-span-1">Điểm tích lũy: {userLogin.total_point} điểm</p>
                    </div>
                    <div className="grid sm:!grid-cols-2 md:!grid-cols-2 grid-cols-12 gap-2">
                        <Modal className="sm:!w-full sm:!h-[90vh] md:!w-full w-2/3 h-auto "
                            trigger={
                                <Button type='outline' leftIcon={<ImageIcon />} className="bg-white shadow-xl shadow-white hover:bg-red-500 hover:text-white" />
                            }>
                            <UpdateAvatarUser user={userLogin} />
                        </Modal>
                        <Modal className="sm:!w-full sm:!h-[90vh] md:!w-full  w-2/3 h-auto "
                            trigger={
                                <Button type='outline' leftIcon={<IntroduceIcon />} className="bg-white shadow-xl shadow-white hover:bg-red-500 hover:text-white" />
                            }>
                            <UpdateInfoUser user={userLogin} />
                        </Modal>
                    </div>
                </div>
            </div>
        </section >
    );
}

export default InfoAccount;