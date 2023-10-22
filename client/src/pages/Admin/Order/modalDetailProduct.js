import PropTypes from 'prop-types'

function ModalDetailProduct({ data }) {

    return (
        <div className='w-full h-auto px-8 pb-8 pt-4'>
            <h2 className="font-extrabold text-4xl text-center text-black">Chi tiết sản phẩm</h2>
            <div className="mt-8 flex gap-10 justify-center ">
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
                            data.map((detail, index) => (
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

            </div>
        </div>
    );
}

ModalDetailProduct.propsTypes = {
    data: PropTypes.object.isRequired,
}

export default ModalDetailProduct;