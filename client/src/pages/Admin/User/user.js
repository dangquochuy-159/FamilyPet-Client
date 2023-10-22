
import { useEffect, useState } from "react";
import ConnectError from "~/components/ConnectError";
import { Button } from "~/components/Button";
import { InfoIcon } from "~/components/Icons";
import Modal from "~/components/Modal/modal";
import ModalInfo from "./modalInfo";

function User() {

    const [users, setUsers] = useState([])
    const [connectServer, setConnectServer] = useState(false)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/users`)
            .then(res => res.json())
            .then(data => {
                setUsers(data.data)
                setConnectServer(true)
            })
            .catch(err => {
                setConnectServer(false)
            })
    }, [])
    return (
        <>
            {
                !connectServer ? <ConnectError /> :
                    <div className="w-full h-full bg-white pb-4 px-4 ">
                        <div className="w-full h-1/6 flex items-center justify-center">
                            <h2 className="sm:!text-xl text-4xl text-center font-bold text-[#000]">Danh sách khách hàng đăng ký tài khoản</h2>
                        </div>
                        <div className="wrapper-table w-full">
                            <table>
                                <thead className="text-black font-bold text-lg bg-[#71cbe8]">
                                    <tr>
                                        <th scope='col' className="sm:hidden">Tên</th>
                                        <th scope='col'>Tài khoản</th>
                                        <th scope='col' className="sm:hidden">Giới tính</th>
                                        <th scope='col' className="sm:hidden">Địa chỉ</th>
                                        <th scope='col' className="sm:hidden">Số điện thoại</th>
                                        <th scope='col'>Chi tiết</th>
                                    </tr>
                                </thead>
                                <tbody className="font-normal text-[#000]">
                                    {
                                        users.map((user, index) => (
                                            <tr key={index}>
                                                <th className="sm:hidden">{user.full_name}</th>
                                                <th>{user.method_login.email ? user.email : user.phone_login}</th>
                                                <td className="sm:hidden">{user.gender}</td>
                                                <td className="sm:hidden">{user.address}</td>
                                                <td className="sm:hidden">{user.phone}</td>
                                                <td>
                                                    <Modal className="sm:w-full w-1/2 sm:!h-[70vh] h-auto"
                                                        trigger={
                                                            <div className="w-auto h-auto">
                                                                <Button type='primary' rightIcon={<InfoIcon width='30px' height='30px' />}
                                                                    className='bg-blue-500 text-white m-auto'
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
        </>
    );
}

export default User;