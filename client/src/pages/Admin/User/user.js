
import { useContext, useEffect, useState } from "react";
import AdminContext from '~/context/AdminContext';
import ConnectError from "~/components/ConnectError";
import { Header } from "~/layouts/AdminLayout/components";
import Image from "~/components/Image";
import { Button } from "~/components/Button";
import { InfoIcon } from "~/components/Icons";
import Modal from "~/components/Modal/modal";
import ModalInfo from "./modalInfo";

function User() {
    const context = useContext(AdminContext)
    const [adminLogin] = context
    const [users, setUsers] = useState([])
    const [connectServer, setConnectServer] = useState(true)

    useEffect(() => {

        fetch(`${process.env.REACT_APP_API_URL}/api/users`)
            .then(res => res.json())
            .then(data => {
                setUsers(data.data)
                setConnectServer(true)
            })
            .catch(err => setConnectServer(false))
    }, [])
    return (

        <div className="wrapper-user">
            <Header title='Khách hàng' avatar={adminLogin.avatar} name={adminLogin.full_name} id={adminLogin._id} />
            <div className="wrapper-page flex flex-col  ">
                {
                    !connectServer ? <ConnectError /> :
                        <div className="w-full h-full bg-white pb-4 px-4 ">
                            <div className="w-full h-1/6 flex items-center justify-center">
                                <h2 className="text-4xl text-center font-bold text-[#000]">Danh sách khách hàng đăng ký tài khoản</h2>
                            </div>
                            <div className="wrapper-table w-full">
                                <table>
                                    <thead className="text-black font-bold text-lg bg-[#71cbe8]">
                                        <tr>
                                            <th scope='col'>Họ và tên</th>
                                            <th scope='col'>Tài khoản</th>
                                            <th scope='col'>Giới tính</th>
                                            <th scope='col'>Địa chỉ</th>
                                            <th scope='col'>Số điện thoại</th>
                                            <th scope='col'>Chi tiết</th>
                                        </tr>
                                    </thead>
                                    <tbody className="font-normal text-[#000]">
                                        {
                                            users.map((user, index) => (
                                                <tr key={index}>
                                                    <th>{user.full_name}</th>
                                                    <th>{user.method_login.email ? user.email : user.phone_login}</th>
                                                    <td>{user.gender}</td>
                                                    <td>{user.address}</td>
                                                    <td>{user.phone}</td>
                                                    <td>
                                                        <Modal className="w-1/2 h-auto"
                                                            trigger={
                                                                <div className="w-auto h-auto">
                                                                    <Button type='primary' rightIcon={<InfoIcon width='30px' height='30px' />}
                                                                        className='bg-[var(--primary-color)] text-white m-auto'
                                                                    />
                                                                </div>
                                                            }
                                                        >
                                                            <ModalInfo user={user} />
                                                        </Modal>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                }
            </div>
        </div >

    );
}

export default User;