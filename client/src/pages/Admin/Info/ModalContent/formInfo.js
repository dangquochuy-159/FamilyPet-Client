import PropTypes from 'prop-types'
import { faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InfoIcon } from '~/components/Icons';

function FormInfo({ admin }) {
    return (
        <div className="w-full h-full px-8 pb-8 space-y-2">
            <h2 className="flex items-center text-4xl pb-2 font-bold text-[var(--primary-color)]">
                <InfoIcon className='w-12 h-12' />
                <span className='ml-2'>Thông tin cá nhân</span>
            </h2>
            <div className='w-auto h-auto space-y-2 ml-12'>
                <p className="ml-4 text-lg">
                    <FontAwesomeIcon className="text-sm" icon={faStop} />
                    <span className="ml-2 font-bold">Họ và tên: </span>
                    <span className="text-[var(--primary-color)] font-bold">{admin.full_name}</span>
                </p>
                <p className="ml-4 text-lg">
                    <FontAwesomeIcon className="text-sm" icon={faStop} />
                    <span className="ml-2 font-bold">Tài khoản: </span>
                    <span className="text-[var(--primary-color)] font-bold">{admin.email}</span>
                </p>
                <p className="ml-4 text-lg">
                    <FontAwesomeIcon className="text-sm" icon={faStop} />
                    <span className="ml-2 font-bold">Giới tính: </span>
                    <span className="text-[var(--primary-color)] font-bold">{admin.gender}</span>
                </p>
                <p className="ml-4 text-lg">
                    <FontAwesomeIcon className="text-sm" icon={faStop} />
                    <span className="ml-2 font-bold">Số điện thoại: </span>
                    <span className="text-[var(--primary-color)] font-bold">{admin.phone}</span>
                </p>
                <p className="ml-4 text-lg">
                    <FontAwesomeIcon className="text-sm" icon={faStop} />
                    <span className="ml-2 font-bold">Ngày sinh: </span>
                    <span className="text-[var(--primary-color)] font-bold">{admin.date_birth}</span>
                </p>
                <p className="ml-4 text-lg">
                    <FontAwesomeIcon className="text-sm" icon={faStop} />
                    <span className="ml-2 font-bold">Địa chỉ: </span>
                    <span className="text-[var(--primary-color)] font-bold">{admin.address}</span>
                </p>
                <p className="ml-4 text-lg">
                    <FontAwesomeIcon className="text-sm" icon={faStop} />
                    <span className="ml-2 font-bold">Quyền đăng kí tài khoản: </span>
                    {
                        admin.add_admin ? (
                            <span className="text-[var(--primary-color)] font-bold">Có</span>
                        ) : (
                            <span className="text-[var(--primary-color)] font-bold">Không</span>
                        )
                    }
                </p>
            </div>
        </div>
    );
}

FormInfo.propTypes = {
    admin: PropTypes.object.isRequired,
}

export default FormInfo;