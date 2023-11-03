import PropTypes from 'prop-types'
import { changeDate } from '~/utils/SupportFunction/supportFunction';

function ModalInfoOrder({ data, changeStatus, changePayments }) {


    return (
        <div className="px-4 h-full pb-20 overflow-auto">
            <h2 className="font-extrabold text-xl text-center text-black">Thông tin đơn hàng</h2>
            <p className="p-2 rounded-md bg-white">
                <span className="font-bold">Tài khoản: </span>
                <span>{data.account}</span>
            </p>
            <p className="p-2 rounded-md bg-white">
                <span className="font-bold">Tên khách hàng: </span>
                <span>{data.name}</span>
            </p>
            <p className="p-2 rounded-md bg-white">
                <span className="font-bold">Số điện thoại: </span>
                <span>{data.phone}</span>
            </p>
            <p className="p-2 rounded-md bg-white">
                <span className="font-bold">Địa chỉ: </span>
                <span>{data.address}</span>
            </p>
            <p className="p-2 rounded-md bg-white">
                <span className="font-bold">Tổng tiền: </span>
                <span>{data.total_pay}</span>
            </p>
            <p className="p-2 rounded-md bg-white">
                <span className="font-bold">Hình thức thanh toán: </span>
                <span>{Object.keys(data.payments).map(key => data.payments[key] === true && changePayments[key])}</span>
            </p>
            <p className="p-2 rounded-md bg-white">
                <span className="font-bold">Trạng thái đơn hàng: </span>
                <span>{Object.keys(data.status).map(key => data.status[key] === true && changeStatus[key])}</span>
            </p>
            <p className="p-2 rounded-md bg-white">
                <span className="font-bold">Ngày thanh toán: </span>
                <span>{changeDate(data.createdAt)}</span>
            </p>
            <p className="p-2 rounded-md bg-white">
                <span className="font-bold">Chi tiết sản phẩm: </span>
                <table className='w-full'>
                    <thead className='w-full bg-yellow-400'>
                        <tr>
                            <th scope='col' className='w-1/5 border border-solid border-black p-4'>#</th>
                            <th scope='col' className='w-1/5 border border-solid border-black p-4'>Tên sản phẩm</th>
                            <th scope='col' className='w-1/5 border border-solid border-black p-4'>Đơn giá</th>
                            <th scope='col' className='w-1/5 border border-solid border-black p-4'>Số lượng</th>
                            <th scope='col' className='w-1/5 border border-solid border-black p-4'>Thành tiền</th>


                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.detail.map((detail, index) => (
                                <tr key={index}>
                                    <td className='border border-solid border-black p-4'>{index}</td>
                                    <td className='border border-solid border-black p-4'>{detail['name_product']}</td>
                                    <td className='border border-solid border-black p-4'>{detail['unit_price']}</td>
                                    <td className='border border-solid border-black p-4'>{detail['quantity']}</td>
                                    <td className='border border-solid border-black p-4'>{detail['into_money']}</td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </p>

        </div>
    );
}

ModalInfoOrder.propTypes = {
    data: PropTypes.object.isRequired,
    changeStatus: PropTypes.object.isRequired,
    changePayments: PropTypes.object.isRequired,
}

export default ModalInfoOrder;