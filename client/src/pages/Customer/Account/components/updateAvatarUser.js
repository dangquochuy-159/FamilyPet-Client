import axios from "axios";
import { useRef, useState } from "react";
import { API_USER } from "~/api/api";
import { images } from "~/assets";
import { Button } from "~/components/Button";
import { DeleteIcon, UploadIcon } from "~/components/Icons";
import Image from "~/components/Image";

function UpdateAvatarUser({ user }) {
    const [nameAvt, setNameAvt] = useState(user.avatar[0])
    const [public_id, setPublic_id] = useState(user.avatar[1])

    const avatarRef = useRef()
    const handleUploadAvatar = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            const formDataToSend = new FormData();
            formDataToSend.append('avatar', files[0]);
            try {
                axios.put(`${API_USER}/${user._id}`, formDataToSend)
                    .then(response => {
                        window.location.reload();
                    })
            } catch (error) {
                console.error('Error sending PUT request:', error);
            }
        }
    }
    const handleGetAvatar = (e) => {
        setNameAvt(e.target.getAttribute('data-link'))
        setPublic_id(e.target.getAttribute('data-publicId'))
        let avt = e.target.getAttribute('data-link')
        avatarRef.current.src = avt
    }
    const handleChangeAvatar = () => {
        let idAvatar = public_id.split("/").pop()
        axios.put(`${API_USER}/${user._id}/${idAvatar}`)
            .then(() => {
                window.location.reload();
            })
    }
    const handleDeleteAvatar = () => {
        if (window.confirm('Bạn chắc chắn muốn xóa ảnh')) {
            try {
                axios.delete(`${API_USER}/${user._id}/avatar`)
                    .then(response => window.location.reload())
            } catch (error) {
                console.error('Error sending PUT request:', error);
            }
        }
    }
    return (
        <div className="h-full grid grid-cols-5 pb-8 bg-[#f5f5f5] overflow-auto">
            <div className="w-full h-auto col-span-5 p-4 flex sm:!flex-col justify-center items-center gap-2 ">
                <input type="file" name="avatar" id="file" className="overflow-hidden w-1 h-1 opacity-0 absolute z-10 " onChange={handleUploadAvatar} />
                <label htmlFor="file" className='w-1/2 h-auto hover:cursor-pointer md:order-2 sm:!order-2'>
                    <Button className='w-full bg-[var(--primary-color)] text-white py-4 pointer-events-none' type='primary' title='Tải ảnh' rightIcon={<UploadIcon />} />
                </label>
                <Image innerRef={avatarRef}
                    src={user.avatar[0] || images.no_image} alt='avatar'
                    className='w-[200px] h-[200px] rounded-full border border-solid border-[#ccc] object-cover sm:!order-1'
                />
                <label className='w-1/2 h-auto  hover:cursor-pointer md:order-3 sm:!order-3'>
                    <Button className='w-full bg-red-600 text-white py-4 pointer-events-none' type='primary'
                        title='Xóa ảnh' rightIcon={<DeleteIcon />} onClick={handleDeleteAvatar} />
                </label>
            </div>
            <div className="w-full h-auto col-span-5">
                <h2 className="pb-4 text-3xl text-center font-bold">Chọn ảnh có sẵn </h2>
                <Button className='btn--change-avt w-auto h-auto mb-4 relative left-1/2 -translate-x-1/2 text-white bg-blue-500'
                    title='Thay đổi ảnh' type='primary' onClick={handleChangeAvatar} />
                {
                    user.avatar_old.length === 0 ? <p className='mt-4 text-center'>Chưa có ảnh nào trong thư viện</p> :
                        <div className="w-auto sm:!h-48 h-60 overflow-auto grid sm:!grid-cols-2 grid-cols-4 gap-2 p-4">
                            {
                                user.avatar_old.map((avatar, index) => (
                                    <div className="w-auto h-auto p-2 flex justify-center items-center bg-white shadow-xl shadow-white">
                                        <Image
                                            key={index}
                                            src={avatar[0]}
                                            className='w-56 h-28 object-contain rounded hover:cursor-pointer'
                                            alt='avatar'
                                            onClick={handleGetAvatar}
                                            data-link={avatar[0]}
                                            data-publicId={avatar[1]}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                }

            </div>
        </div>
    );
}

export default UpdateAvatarUser;