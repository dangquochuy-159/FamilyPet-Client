import axios from 'axios';
import PropTypes from 'prop-types'
import { useRef, useState } from 'react';
import { API_ADMIN } from '~/api/api';
import { images } from '~/assets';
import { Button } from '~/components/Button';
import { DeleteIcon, UploadIcon } from '~/components/Icons';

function FormUpdateAvatar({ admin }) {
    const [linkAvt, setLinkAvt] = useState(admin.avatar[0])
    const [public_id, setPublic_id] = useState(admin.avatar[1])
    const avatarRef = useRef()
    const handleUploadAvatar = async (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            const formDataToSend = new FormData();
            formDataToSend.append('avatar', files[0]);
            try {
                axios.put(`${API_ADMIN}/${admin._id}`, formDataToSend)
                    .then(response => {
                        window.location.reload();
                    })
            } catch (error) {
                console.error('Error sending PUT request:', error);
            }
        }
    }
    const handleGetAvatar = (e) => {
        setLinkAvt(e.target.getAttribute('data-link'))
        setPublic_id(e.target.getAttribute('data-publicId'))
        let avt = e.target.getAttribute('data-link')
        avatarRef.current.src = avt

    }
    const handleChangeAvatar = () => {

        let idAvatar = public_id.split("/").pop()
        axios.put(`${API_ADMIN}/${admin._id}/${idAvatar}`)
            .then((response) => {
                window.location.reload();
            })
    }
    const handleDeleteAvatar = () => {
        if (window.confirm('Bạn chắc chắn muốn xóa ảnh')) {
            try {
                axios.delete(`${API_ADMIN}/${admin._id}/avatar`)
                    .then(response => window.location.reload())
            } catch (error) {
                console.error('Error sending PUT request:', error);
            }
        }

    }

    return (
        <div className='w-full h-auto pb-8'>
            <div className=' flex-col items-center space-y-2 mt-4'>
                <div className='flex md:flex-col justify-center items-center gap-2 mt-4'>
                    <input type="file" name="avatar" id="file" className="overflow-hidden w-1 h-1 opacity-0 absolute z-10 " onChange={handleUploadAvatar} />
                    <label htmlFor="file" className='w-1/3 h-auto hover:cursor-pointer md:order-2'>
                        <Button className='w-full bg-[var(--primary-color)] text-white py-4 pointer-events-none' type='primary' title='Tải ảnh' rightIcon={<UploadIcon />} />
                    </label>
                    <img
                        innerRef={avatarRef}
                        src={linkAvt || images.no_image}
                        className='w-40 h-40 object-cover rounded-full md:order-1'
                        alt='avatar'
                    />
                    <label className='w-1/3 h-auto hover:cursor-pointer md:order-3'>
                        <Button className='w-full bg-red-600 text-white py-4 pointer-events-none' type='primary'
                            title='Xóa ảnh' rightIcon={<DeleteIcon />} onClick={handleDeleteAvatar} />
                    </label>
                </div>

                <div id='container--avt' className='w-full h-auto pt-4 relative '>
                    <h2 className="pb-4 text-2xl text-center text-[var(--primary-color)]">Chọn ảnh có sẵn </h2>
                    <Button className='btn--change-avt w-auto h-auto relative left-1/2 -translate-x-1/2 text-white bg-blue-500'
                        title='Thay đổi ảnh' type='primary' onClick={handleChangeAvatar} />
                    {
                        admin.avatar_old.length === 0 ?
                            (
                                <p className='mt-4 text-center'>Chưa có ảnh nào trong thư viện</p>
                            ) : (
                                <div className='w-full h-56 md:!h-full mt-4 flex sm:!flex-nowrap flex-wrap sm:!justify-start justify-center gap-2 overflow-y-auto '>
                                    {
                                        admin.avatar_old.map((avatar, index) => (
                                            <img
                                                key={index}
                                                src={avatar[0] || images.no_image}
                                                className='w-56 h-28 object-contain rounded hover:cursor-pointer'
                                                alt='avatar'
                                                onClick={handleGetAvatar}
                                                data-link={avatar[0]}
                                                data-publicId={avatar[1]}
                                            />
                                        ))
                                    }
                                </div>
                            )
                    }
                </div>
            </div>

        </div >
    );
}

FormUpdateAvatar.propTypes = {
    admin: PropTypes.object,
}

export default FormUpdateAvatar;