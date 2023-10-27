import config from "~/config";
import Image from "~/components/Image";
import { images } from "~/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "~/components/Button";
import { AccountIcon, CartIcon, CloseIcon, HomeIcon, IntroduceIcon, ListIcon, LoginIcon, LogoutIcon, MenuIcon, PhoneIcon, ProductIcon, QuestionIcon } from "~/components/Icons";

import './header.scss'
import SearchProduct from "./searchProduct";
import Login from "~/pages/Customer/Login";

function Header() {
    const router = config.routes_public
    const navigate = useNavigate()

    const handleShowMenu = () => {
        document.getElementById('menu-mobile_modal').classList.remove('hidden')
        document.getElementById('menu-mobile_content').classList.add('active')
    }
    const handleHideMenu = () => {
        document.getElementById('menu-mobile_modal').classList.add('hidden')
        document.getElementById('menu-mobile_content').classList.remove('active')

    }
    return (
        <div className="wrapper--header_main w-full h-[var(--header-height)] sm:bg-violet-600 md:bg-green-500 bg-[var(--primary-color)] fixed top-0 left-0 z-50">

            {/* begin menu mobile */}
            <div className="hidden sm:!block">
                <div id='menu-mobile_modal' className="hidden w-full h-[100vh] fixed top-0 left-0 backdrop-opacity-10 backdrop-invert bg-black/70 z-40"></div>
                <div id='menu-mobile_content' className="w-[80%] h-full p-10 fixed top-0 left-0 z-50 flex flex-col justify-between bg-white">
                    <Button leftIcon={<CloseIcon />} className="p-2 absolute top-2 right-2 bg-red-400 hover:bg-red-500 text-white" onClick={handleHideMenu} />
                    <nav className='flex flex-col items-start justify-start pb-4 md:gap-x-10 gap-4'>
                        <NavLink to={router.default} onClick={handleHideMenu} className="nav--link text-lg text-black flex gap-6" > <HomeIcon /> Trang chủ</NavLink>
                        <NavLink to={router.introduce} onClick={handleHideMenu} className="nav--link text-lg text-black flex gap-6" > <IntroduceIcon /> Giới thiệu</NavLink>
                        <NavLink to={router.product} onClick={handleHideMenu} className="nav--link text-lg text-black flex gap-6" > <ProductIcon />Sản phẩm</NavLink>
                        <NavLink to={router.priceLList} onClick={handleHideMenu} className="nav--link text-lg text-black flex gap-6" > <ListIcon /> Bảng giá</NavLink>
                        <NavLink to={router.contact} onClick={handleHideMenu} className="nav--link text-lg text-black flex gap-6" > <PhoneIcon /> Liên hệ</NavLink>
                        <NavLink to={router.cart} onClick={handleHideMenu} className="nav--link text-lg text-black flex gap-6" > <CartIcon /> Giỏ hàng</NavLink>
                        <NavLink to={router.account} onClick={handleHideMenu} className="nav--link text-lg text-black flex gap-6" > <AccountIcon /> Tài khoản</NavLink>
                    </nav>
                    <div className="flex flex-col items-start gap-4 text-lg">
                        <NavLink to={router.policy} onClick={handleHideMenu} className="nav--link text-lg text-black flex gap-2" > <QuestionIcon /> Trợ giúp</NavLink>
                        <Button href='/login' title='Đăng nhập' leftIcon={<LoginIcon />} />
                        <Button title='Đăng xuất' leftIcon={<LogoutIcon />} />
                    </div>
                </div>
            </div>
            {/* end menu mobile */}

            <section className="grid_layout wide w-full h-full sm:!h-full flex sm:!flex-col justify-between gap-x-10 !px-4">
                <NavLink to='/' className='w-auto h-auto sm:hidden'>
                    <div className="w-auto h-full flex justify-center items-center">
                        <Image src={images.logo} alt='logo' className='h-full w-full sm:!w-1/5 object-contain' />
                    </div>
                </NavLink>
                <div className="w-full sm:!h-full flex flex-col items-center gap-x-10">
                    <div className="w-full h-full flex items-center justify-between gap-6">
                        <Button leftIcon={<MenuIcon />} className="hidden sm:!block hover:brightness-0 hover:invert" onClick={handleShowMenu} />
                        <SearchProduct />
                        <div className="sm:!hidden w-auto h-auto relative">
                            <Button leftIcon={<CartIcon width="32px" height='32px' className='text-white hover:text-blue-600 ' />}
                                to='/cart' className="hover:!text-blue-600"
                            />
                            <p className="w-5 h-5 flex justify-center items-center absolute -top-2 -right-2 rounded-full text-white font-bold bg-red-600">0</p>
                        </div>
                        <div className="sm:!hidden w-1/2 flex items-center justify-end gap-5">
                            <div className="flex justify-center items-center gap-2">
                                <Button href='tel:19008080' title='19008080' leftIcon={<PhoneIcon width="32px" height='32px' className='text-white' />}
                                    className="md:!hidden hover:text-blue-600 text-white font-bold"
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

                    <nav className='sm:!hidden w-full flex items-center justify-start pb-4 md:gap-x-10 gap-x-20'>
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