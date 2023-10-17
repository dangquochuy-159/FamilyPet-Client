import PropTypes from 'prop-types'
import Image from '~/components/Image';

function ModalInfo({ user }) {
    const changeRank = {
        diamond: 'Kim cương',
        gold: 'Vàng',
        silver: 'Bạc',
        bronze: 'Đồng',
        member: 'Thành viên'
    }
    return (
        <div className='w-full h-auto px-8 pb-8 pt-4'>
            <div className='flex items-center gap-20'>
                <Image className='w-28 h-28 object-cover rounded-full'
                    src={`${process.env.REACT_APP_API_URL}/api/users/${user._id}/${user.avatar}`} />
                <h2 className="font-extrabold text-4xl text-center text-black">Thông tin khách hàng</h2>
            </div>
            <div className='flex text-lg mt-10 space-x-20'>
                <div className='w-1/2 flex flex-col gap-5'>
                    <p>
                        <span className='font-bold'>Họ và tên: </span>
                        <span className='text-[var(--primary-color)] font-bold'>{user.full_name}</span>
                    </p>
                    <p>
                        <span className='font-bold'>Tài khoản:  </span>
                        <span className='text-[var(--primary-color)] font-bold'>{user.method_login.email ? user.email : user.phone_login}</span>
                    </p>
                    <p>
                        <span className='font-bold'>Giới tính:  </span>
                        <span className='text-[var(--primary-color)] font-bold'>{user.gender}</span>
                    </p>
                    <p>
                        <span className='font-bold'>Ngày sinh:  </span>
                        <span className='text-[var(--primary-color)] font-bold'>{user.date_birth}</span>
                    </p>
                    <p>
                        <span className='font-bold'>Địa chỉ:  </span>
                        <span className='text-[var(--primary-color)] font-bold'>{user.address}</span>
                    </p>
                </div>

                <div className='w-1/2 flex flex-col gap-5'>
                    <p>
                        <span className='font-bold'>Số điện thoại:  </span>
                        <span className='text-[var(--primary-color)] font-bold'>{user.phone}</span>
                    </p>
                    <p>
                        <span className='font-bold'>Tổng đơn hàng đã mua:  </span>
                        <span className='text-[var(--primary-color)] font-bold'>{user.total_order} (đơn)</span>
                    </p>
                    <p>
                        <span className='font-bold'>Tổng thanh toán:  </span>
                        <span className='text-[var(--primary-color)] font-bold'>{user.total_pay.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        })}</span>
                    </p>
                    <p>
                        <span className='font-bold'>Điểm tích lũy:  </span>
                        <span className='text-[var(--primary-color)] font-bold'>{user.total_point} (điểm)</span>
                    </p>
                    <p>
                        <span className='font-bold'>Bậc xếp hạng:  </span>
                        <span className='text-[var(--primary-color)] font-bold'>{Object.keys(user.rank).map(key => user.rank[key] && changeRank[key])}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

ModalInfo.propTypes = {
    user: PropTypes.object.isRequired
}

export default ModalInfo;