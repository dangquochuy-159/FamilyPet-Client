import Image from "~/components/Image";
import { useContext, useEffect, useState } from "react";
import AdminContext from '~/context/AdminContext';
import { Button } from "~/components/Button";
import { InfoIcon, PlusIcon } from "~/components/Icons";
import { FormAddAdmin, FormInfo } from "./ModalContent";
import Modal from "~/components/Modal/modal";

function InfoAll() {
    const context = useContext(AdminContext)
    const [adminLogin] = context
    const [admins, setAdmins] = useState([])


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/admins`)
            .then(res => res.json())
            .then(data => {
                setAdmins(data.data)
            })
            .catch(err => { })
    }, [])

    return (
        <div className="wrapper--info-all h-full  ">
            <h2 className="text-4xl pt-8 font-bold text-center text-[var(--primary-color)] bg-white">Danh sách quản trị viên</h2>
            <div className="w-full h-auto flex flex-wrap justify-center items-center gap-8 py-8 bg-white" >
                {
                    admins.map((admin) => (
                        <div key={admin.slug} className="w-1/5 h-auto p-8 flex flex-col items-center space-y-2 bg-gray-300 rounded">
                            <div className="">
                                <Image
                                    src={`${process.env.REACT_APP_API_URL}/api/admins/${admin._id}/${admin.avatar}`}
                                    className='w-24 h-24 object-cover rounded-full'
                                    alt="avatar"
                                />
                            </div>
                            <p className="font-bold">{admin.full_name}</p>
                            <p>{admin.phone}</p>
                            <p>{admin.gender}</p>
                            <Modal
                                className="w-1/3 h-auto"
                                trigger={
                                    <div className="w-auto h-auto">
                                        <Button
                                            className='bg-blue-700 text-white'
                                            type='primary'
                                            title='Xem Thêm'
                                            rightIcon={<InfoIcon />}
                                        />
                                    </div>
                                }
                            >
                                <FormInfo admin={admin} />
                            </Modal>
                        </div>
                    ))
                }
                <div className="w-full flex justify-center ">
                    {
                        adminLogin.add_admin && (
                            <Modal
                                className="w-2/3 h-auto"
                                trigger={
                                    <div className="w-auto h-auto" >
                                        <Button
                                            className='bg-[var(--primary-color)] text-white button'
                                            type='primary' title='Thêm quản trị viên' rightIcon={<PlusIcon />}
                                        />
                                    </div>
                                }
                            >
                                <FormAddAdmin />
                            </Modal>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default InfoAll;