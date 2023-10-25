import config from "~/config";
import Image from "~/components/Image";
import { images } from "~/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "~/components/Button";
import { CartIcon, PhoneIcon, QuestionIcon } from "~/components/Icons";

import './header.scss'
import SearchProduct from "./searchProduct";

function Header() {
    const router = config.routes_public
    const navigate = useNavigate()

    // const handleToCart = () => {
    //     navigate('/cart')
    // }
    return (
        <div className="wrapper--header_main w-full h-[var(--header-height)] sm:bg-red-600 md:bg-green-500 bg-[var(--primary-color)] fixed top-0 left-0 z-50">
            <section className="container w-full h-full flex justify-between gap-x-10 px-4">
                <NavLink to='/' className='w-auto h-auto'>
                    <div className="w-auto h-full flex justify-center items-center">
                        <Image src={images.logo} alt='logo' className='h-full w-full ' />
                    </div>
                </NavLink>
                <div className="w-full flex flex-col items-center gap-x-10">

                    <div className="w-full h-full flex items-center justify-between gap-6">
                        <SearchProduct />
                        <div className="w-auto h-auto relative">
                            <Button leftIcon={<CartIcon width="32px" height='32px' className='text-white hover:text-blue-600 ' />}
                                to='/cart' className="hover:!text-blue-600"
                            />
                            <p className="w-5 h-5 flex justify-center items-center absolute -top-2 -right-2 rounded-full text-white font-bold bg-red-600">0</p>
                        </div>
                        <div className="w-1/2 flex items-center justify-end gap-5">
                            <div className=" flex justify-center items-center gap-2">
                                <Button href='tel:19008080' title='19008080' leftIcon={<PhoneIcon width="32px" height='32px' className='text-white' />}
                                    className="hover:text-blue-600 text-white font-bold"
                                />
                                <Button to='/policy' leftIcon={<QuestionIcon width="32px" height='32px' className='text-white hover:text-blue-600' />} />
                                {/* <Image src='https://static-images.vnncdn.net/files/publish/2022/9/3/bien-vo-cuc-thai-binh-339.jpg' alt='ảnh'
                                    className='w-10 h-10 object-cover rounded-full hover:cursor-pointer' /> */}
                                <Link to='/account'>
                                    <Image src={images.user} alt='ảnh'
                                        className='w-10 h-10 object-cover rounded-full bg-white p-2 hover:cursor-pointer' />
                                </Link>
                                <p className="md:hidden text-white font-bold uppercase">Đặng Quốc Huy</p>
                            </div>
                        </div>
                    </div>

                    <nav className='w-full flex items-center justify-start pb-4 md:gap-x-10 gap-x-20'>
                        <NavLink to={router.default} className="nav--link text-lg text-white" >Trang chủ</NavLink>
                        <NavLink to={router.introduce} className="nav--link text-lg text-white" >Giới thiệu</NavLink>
                        <NavLink to={router.product} className="nav--link text-lg text-white" >Sản phẩm</NavLink>
                        <NavLink to={router.priceLList} className="nav--link text-lg text-white" >Bảng giá</NavLink>
                        <NavLink to={router.contact} className="nav--link text-lg text-white" >Liên hệ</NavLink>
                    </nav>
                </div>

            </section >
        </div >
    );
}

export default Header;