import axios from 'axios';
import PropTypes from 'prop-types'
import { useRef, useState } from 'react';
import { Button } from '~/components/Button';
import { UploadIcon } from '~/components/Icons';
import Image from '~/components/Image';

function FormUpdateAvatar({ admin }) {
    const [nameAvt, setNameAvt] = useState(admin.avatar)
    const avatarRef = useRef()
    const handleUploadAvatar = async (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            const formDataToSend = new FormData();
            formDataToSend.append('avatar', files[0]);
            try {
                axios.put(`${process.env.REACT_APP_API_URL}/api/admins/${admin._id}`, formDataToSend)
                    .then(response => {
                        window.location.reload();
                    })
            } catch (error) {
                console.error('Error sending PUT request:', error);
            }
        }
    }
    const handleGetAvatar = (e) => {
        setNameAvt(e.target.getAttribute('data-img'))
        let avt = e.target.getAttribute('data-img')
        avatarRef.current.src = `${process.env.REACT_APP_API_URL}/api/admins/${admin._id}/${avt}`

    }
    const handleChangeAvatar = () => {
        axios.put(`${process.env.REACT_APP_API_URL}/api/admins/${admin._id}/${nameAvt}`)
            .then(() => {
                window.location.reload();
            })
    }

    return (
        <div className='w-full h-auto pb-8'>
            <div className=' flex-col items-center space-y-2 mt-4'>
                <div className='flex flex-col items-center space-y-2 mt-4'>
                    <Image
                        innerRef={avatarRef}
                        src={`${process.env.REACT_APP_API_URL}/api/admins/${admin._id}/${nameAvt}`}
                        className='w-56 h-auto object-cover rounded'
                        alt='avatar'
                    />
                    <input type="file" name="avatar" id="file" className="overflow-hidden w-1 h-1 opacity-0 absolute z-10 " onChange={handleUploadAvatar} />
                    <label htmlFor="file" className='w-1/3 h-auto hover:cursor-pointer'>
                        <Button className='w-full bg-[var(--primary-color)] text-white py-4 pointer-events-none' type='primary' title='Tải ảnh từ thiết bị' rightIcon={<UploadIcon />} />
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
                                <div className='w-full h-56 mt-4 flex flex-wrap justify-center gap-2 overflow-y-auto '>
                                    {
                                        admin.avatar_old.map(avatar => (
                                            <Image
                                                key={avatar}
                                                src={`${process.env.REACT_APP_API_URL}/api/admins/${admin._id}/${avatar}`}
                                                className='w-56 h-auto object-cover rounded hover:cursor-pointer'
                                                alt='avatar'
                                                onClick={handleGetAvatar}
                                                data-img={avatar}
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

FormUpdateAvatar.prototype = {
    admin: PropTypes.object,
}

export default FormUpdateAvatar;