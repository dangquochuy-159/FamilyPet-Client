import PropTypes from 'prop-types'
import Image from '~/components/Image';
import { changeNumberToPrice } from '~/utils/SupportFunction/supportFunction';

function ModalInfo({ user }) {
    const changeRank = {
        diamond: 'Kim cương',
        gold: 'Vàng',
        silver: 'Bạc',
        bronze: 'Đồng',
        member: 'Thành viên'
    }
    return (
        <div className='w-full h-full overflow-auto px-8 pb-8 pt-4'>
            <div className='flex sm:flex-col items-center gap-20'>
                <Image className='w-28 h-28 object-cover rounded-full'
                    src={user.avatar[0]} />
                <h2 className="font-extrabold sm:!text-xl text-4xl text-center text-black">Thông tin khách hàng</h2>
            </div>
            <div className='flex sm:flex-col text-lg mt-10 gap-x-20'>
                <div className='sm:w-full w-1/2 flex flex-col gap-5'>
                    <p className='sm:text-center'>
                        <span className='font-bold sm:text-sm'>Họ và tên: </span>
                        <span className='text-[var(--primary-color)] font-bold sm:text-sm'>{user.full_name}</span>
                    </p>
                    <p className='sm:text-center'>
                        <span className='font-bold sm:text-sm'>Tài khoản:  </span>
                        <span className='text-[var(--primary-color)] font-bold sm:text-sm'>{user.method_login.email ? user.email : user.phone_login}</span>
                    </p>
                    <p className='sm:text-center'>
                        <span className='font-bold sm:text-sm'>Giới tính:  </span>
                        <span className='text-[var(--primary-color)] font-bold sm:text-sm'>{user.gender}</span>
                    </p>
                    <p className='sm:text-center'>
                        <span className='font-bold sm:text-sm'>Ngày sinh:  </span>
                        <span className='text-[var(--primary-color)] font-bold sm:text-sm'>{user.date_birth}</span>
                    </p>
                    <p className='sm:text-center'>
                        <span className='font-bold sm:text-sm'>Địa chỉ:  </span>
                        <span className='text-[var(--primary-color)] font-bold sm:text-sm'>{user.address}</span>
                    </p>
                </div>

                <div className='sm:w-full w-1/2 flex flex-col gap-5'>
                    <p className='sm:text-center'>
                        <span className='font-bold sm:text-sm'>Số điện thoại:  </span>
                        <span className='text-[var(--primary-color)] font-bold sm:text-sm'>{user.phone}</span>
                    </p>
                    <p className='sm:text-center'>
                        <span className='font-bold sm:text-sm'>Tổng đơn hàng đã mua:  </span>
                        <span className='text-[var(--primary-color)] font-bold sm:text-sm'>{user.total_order} (đơn)</span>
                    </p>
                    <p className='sm:text-center'>
                        <span className='font-bold sm:text-sm'>Tổng thanh toán:  </span>
                        <span className='text-[var(--primary-color)] font-bold sm:text-sm'>{changeNumberToPrice(user.total_pay)}</span>
                    </p>
                    <p className='sm:text-center'>
                        <span className='font-bold sm:text-sm'>Điểm tích lũy:  </span>
                        <span className='text-[var(--primary-color)] font-bold sm:text-sm'>{user.total_point} (điểm)</span>
                    </p>
                    <p className='sm:text-center'>
                        <span className='font-bold sm:text-sm'>Bậc xếp hạng:  </span>
                        <span className='text-[var(--primary-color)] font-bold sm:text-sm'>{Object.keys(user.rank).map(key => user.rank[key] && changeRank[key])}</span>
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