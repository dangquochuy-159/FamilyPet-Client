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
        <div className="wrapper--info-all h-auto">

            <h2 className="text-4xl pt-8 font-bold text-center text-[var(--primary-color)] bg-white">Danh sách quản trị viên</h2>
            <div className="w-full flex justify-center bg-white pt-6">
                {
                    adminLogin.add_admin && (
                        <Modal
                            className="sm:w-full sm:!h-[90vh] md:w-full md:!h-[90vh] w-2/3 h-auto"
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
            <div className="w-full h-auto flex flex-wrap sm:!justify-start justify-center items-center gap-8 sm:px-8 py-8 sm:overflow-auto bg-white" >
                {
                    admins.map((admin) => (
                        <div key={admin.slug} className="sm:!w-full md:w-1/4 w-1/5 h-auto p-4 flex sm:!flex-row flex-col items-center gap-y-4 gap-x-8 bg-gray-300 rounded">
                            <div className="sm:w-2/12">
                                <Image
                                    src={`${process.env.REACT_APP_API_URL}/api/admins/${admin._id}/${admin.avatar}`}
                                    className='sm:!w-12 sm:!h-12 w-24 h-24 object-cover rounded-full'
                                    alt="avatar"
                                />
                            </div>
                            <div className="sm:w-10/12 flex flex-col sm:!flex-row gap-2 sm:!justify-between items-center">
                                <p className="sm:text-sm font-bold">{admin.full_name}</p>
                                <p className="sm:hidden">{admin.phone}</p>
                                <p className="sm:hidden">{admin.gender}</p>
                                <Modal
                                    className="sm:w-full md:w-full w-1/3 h-auto"
                                    trigger={
                                        <div className="w-auto h-auto">
                                            <Button
                                                className='bg-blue-700 text-white'
                                                type='primary'
                                                rightIcon={<InfoIcon />}
                                            />
                                        </div>
                                    }
                                >
                                    <FormInfo admin={admin} />
                                </Modal>
                            </div>

                        </div>
                    ))
                }

            </div>
        </div>
    );
}

export default InfoAll;