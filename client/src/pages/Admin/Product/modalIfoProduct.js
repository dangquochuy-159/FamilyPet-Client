import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types'
import Image from "~/components/Image";

function ModalInfoProduct({ product, changeStatus }) {
    return (
        <div className='w-full h-auto sm:!h-full sm:!overflow-auto px-8 sm:pb-20 pb-8 pt-4'>
            <h2 className="font-extrabold sm:!text-xl text-4xl text-center text-black">Thông tin chi tiết sản phẩm</h2>
            <div className="mt-8 space-y-4">
                <div className="w-full flex sm:flex-col md:flex-col gap-2">
                    <div className="sm:w-full md:w-full w-1/6 flex flex-col gap-y-2">
                        <Image src={`${process.env.REACT_APP_API_URL}/api/products/${product._id}/${product.photo}`}
                            alt='ảnh vô cực'
                            className='w-full h-auto rounded object-cover m-auto' />
                        <p className="text-center text-2xl font-bold">{(product.star / product.total_eval).toFixed(1)}/5 <FontAwesomeIcon className='text-yellow-400' icon={faStar} /></p>
                    </div>
                    <div className="w-5/6 sm:w-full flex sm:flex-col justify-between gap-x-2 -mt-2">
                        <div className="  space-y-2">
                            <p className="p-2 rounded-md bg-white">
                                <span className="font-bold">Tên sản phẩm: </span>
                                <span>{product.name}</span>
                            </p>
                            <p className="p-2 rounded-md bg-white">
                                <span className="font-bold">Danh mục:  </span>
                                <span>{product.category}</span>
                            </p>
                            <p className="p-2 rounded-md bg-white">
                                <span className="font-bold">Sản phẩm nổi bật: </span>
                                <span>{product.outstand ? 'Có' : 'Không'}</span>
                            </p>
                        </div>
                        <div className=" space-y-2">

                            <p className="p-2 rounded-md bg-white">
                                <span className="font-bold">Xuất xứ: </span>
                                <span>{product.origin}</span>
                            </p>
                            <p className="p-2 rounded-md bg-white">
                                <span className="font-bold">Trạng thái: </span>
                                <span>{Object.keys(product.status).map(key => product.status[key] && changeStatus[key])}</span>
                            </p>
                            <p className="p-2 rounded-md bg-white">
                                <span className="font-bold">Số lượng: </span>
                                <span>{product.quantity}</span>
                            </p>
                        </div>
                        <div className=" space-y-2">
                            <p className="p-2 rounded-md bg-white">
                                <span className="font-bold">Giá: </span>
                                <span>{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                            </p>
                            <p className="p-2 rounded-md bg-white">
                                <span className="font-bold">Giá khuyến mãi: </span>
                                <span>{product.sale_price && product.sale_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                            </p>
                            <p className="p-2 rounded-md bg-white">
                                <span className="font-bold">Lượt đánh giá: </span>
                                <span>{product.total_eval}</span>
                            </p>
                        </div>
                    </div>

                </div>
                <div className=" w-full flex flex-col gap-y-4">
                    <div className="w-full flex flex-col gap-y-4 p-2 rounded-md bg-white">
                        <p>
                            <span className="font-bold">Chi tiết sản phẩm: </span>
                            <span >{product.des}</span>
                        </p>
                    </div>
                    <div className="w-full flex justify-center sm:flex-wrap gap-2">
                        {
                            product.photo_detail.map(ptDetail =>
                                <Image src={`${process.env.REACT_APP_API_URL}/api/products/${product._id}/${ptDetail}`}
                                    alt='ảnh vô cực'
                                    className='sm:w-full w-1/5 h-auto rounded object-cover' />
                            )
                        }
                    </div>
                </div >
            </div>
        </div>
    );
}

ModalInfoProduct.propTypes = {
    product: PropTypes.object.isRequired,
    changeStatus: PropTypes.object.isRequired,
}

export default ModalInfoProduct;