import PropTypes from 'prop-types'
import Image from '~/components/Image';

function ModalInfo({ user }) {

    return (
        <div className='w-full h-auto px-8 pb-8 pt-4'>
            {/* <h2 className="text-4xl text-center text-[var(--primary-color)]">Thông tin khách hàng</h2> */}
            <Image className='w-28 h-28 object-cover m-auto rounded-full'
                src={`${process.env.REACT_APP_API_URL}/api/users/${user._id}/${user.avatar}`} />
            <div className='flex space-x-10'>
                <p>
                    <span>Họ và tên: </span>
                    <span>{user.full_name}</span>
                </p>
                <p>
                    <span>Tài khoản: </span>
                    <span>{user.method_login.email ? user.email : user.phone_login}</span>
                </p>
            </div>
        </div>
    );
}

ModalInfo.propTypes = {
    user: PropTypes.object.isRequired
}

export default ModalInfo;