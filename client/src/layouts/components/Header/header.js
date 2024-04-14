import PropTypes from 'prop-types'
import config from "~/config";
import Image from "~/components/Image";
import TippyHeadless from '@tippyjs/react/headless';
import { images } from "~/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "~/components/Button";
import { AccountIcon, CartIcon, CloseIcon, HomeIcon, IntroduceIcon, ListIcon, LoginIcon, LogoutIcon, MenuIcon, PhoneIcon, ProductIcon, QuestionIcon } from "~/components/Icons";
import SearchProduct from "./SearchProduct";
import './header.scss'
import { handleLoadingPage } from '~/utils/SupportFunction/supportFunction';

function Header({ avatar, id, cartsLength, categorys }) {
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

    const handleLogout = () => {
        window.sessionStorage.removeItem('userLogin')
        window.location.href = '/login';
    }

    const handleChangePage = async (e) => {
        await handleLoadingPage()
        navigate(e.target.getAttribute('data-url'))
    }

    return (
        <div className="wrapper--header_main w-full h-[var(--header-height)] 
          bg-[var(--primary-color)] fixed top-0 left-0 z-40">

            {/* begin menu mobile */}
            <div className="hidden sm:!block md:!block">
                <div onClick={handleHideMenu} id='menu-mobile_modal' className="hidden w-full h-[100vh] fixed top-0 left-0 backdrop-opacity-10 backdrop-invert bg-black/70 z-40"></div>
                <div id='menu-mobile_content' className="w-[80%] md:!w-2/3 h-full p-10 fixed top-0 left-0 z-50 flex flex-col justify-between bg-white">
                    <Button leftIcon={<CloseIcon />} className="p-2 absolute top-2 right-2 bg-red-400 hover:bg-red-500 text-white" onClick={handleHideMenu} />
                    <SearchProduct />
                    <nav className='flex flex-col items-start justify-start pb-4 md:gap-x-10 gap-8'>
                        <NavLink to={router.default} onClick={handleHideMenu} className="nav--link text-lg text-black flex gap-6" > <HomeIcon /> Trang chủ</NavLink>
                        <NavLink to={router.introduce} onClick={handleHideMenu} className="nav--link text-lg text-black flex gap-6" > <IntroduceIcon /> Giới thiệu</NavLink>
                        <NavLink to={router.product} onClick={handleHideMenu} className="nav--link text-lg text-black flex gap-6" > <ProductIcon />Sản phẩm</NavLink>
                        <NavLink to={router.priceLList} onClick={handleHideMenu} className="nav--link text-lg text-black flex gap-6" > <ListIcon /> Bảng giá</NavLink>
                        <NavLink to={router.contact} onClick={handleHideMenu} className="nav--link text-lg text-black flex gap-6" > <PhoneIcon /> Liên hệ</NavLink>
                        <NavLink to={router.policy} onClick={handleHideMenu} className="nav--link text-lg text-black flex gap-6" > <QuestionIcon /> Chính sách</NavLink>

                        <div className='flex items-center gap-2'>
                            <NavLink to={router.cart} onClick={handleHideMenu} className="nav--link text-lg text-black flex gap-6" > <CartIcon /> Giỏ hàng</NavLink>
                            {
                                id && <p className="w-5 h-5 flex justify-center items-center rounded-full text-white font-bold bg-red-600">{cartsLength}</p>
                            }
                        </div>
                        <NavLink to={router.account} onClick={handleHideMenu} className="nav--link text-lg text-black flex gap-6" > <AccountIcon /> Tài khoản</NavLink>
                        <NavLink to={router.register} className="nav--link text-lg text-black flex gap-6"> <IntroduceIcon /> Đăng ký </NavLink>
                    </nav>
                    <div className='w-full flex justify-between'>
                        {
                            id ?
                                <Button onClick={handleLogout} title='Đăng xuất' leftIcon={<LogoutIcon />} /> :
                                <Button href='/login' title='Đăng nhập' leftIcon={<LoginIcon />} />
                        }
                        {
                            avatar ?
                                <Image src={avatar[0]} alt='avatar'
                                    className='w-10 h-10 object-cover border border-solid border-black rounded-full bg-white hover:cursor-pointer' /> :
                                <Image src={images.user} alt='ảnh'
                                    className='w-10 h-10 object-cover border border-solid border-black rounded-full bg-white p-2 hover:cursor-pointer' />
                        }
                    </div>

                </div>
            </div>
            {/* end menu mobile */}

            <section className="grid_layout wide w-full h-full sm:!h-full flex justify-between gap-x-10 !px-4">
                <Button leftIcon={<MenuIcon />} className="hidden md:!block sm:!block hover:brightness-0 hover:invert" onClick={handleShowMenu} />
                <NavLink to='/' className='w-auto h-auto '>
                    <div className="w-auto h-full flex justify-center items-center">
                        <Image src={images.logo} alt='logo' className='h-full w-full object-contain' />
                    </div>
                </NavLink>
                <div className="w-full sm:!h-full flex flex-col items-center gap-x-10">
                    <div className="w-full h-full flex items-center sm:!justify-end md:!justify-end justify-between gap-6">
                        <div className='w-auto h-auto md:!hidden sm:hidden'>
                            <SearchProduct />
                        </div>
                        <div className="sm:!hidden md:!hidden w-auto h-auto relative">
                            <Button leftIcon={<CartIcon width="32px" height='32px' className='text-white hover:text-blue-600 pointer-events-none' />}
                                data-url='/cart' onClick={handleChangePage} className="hover:!text-blue-600"
                            />
                            {
                                id && <p className="w-5 h-5 flex justify-center items-center absolute -top-2 -right-2 rounded-full text-white font-bold bg-red-600">
                                    {cartsLength}
                                </p>
                            }
                        </div>
                        <div className=" w-1/2 flex items-center justify-end gap-5">
                            <div className="flex justify-center items-center gap-2">
                                <Button href='tel:19008080' title='19008080' leftIcon={<PhoneIcon width="32px" height='32px' className='text-[var(--primary-color)]' />}
                                    className=" hover:text-blue-600 text-[var(--primary-color)] font-bold bg-white p-2 rounded-lg"
                                />

                                <TippyHeadless
                                    appendTo={() => document.body}
                                    // visible={true}
                                    trigger="mouseenter"
                                    offset={[14, 10]}
                                    delay={[200, 500]}
                                    placement='bottom-end'
                                    interactive={true}
                                    render={attrs => (
                                        <div className='md:!hidden tippy-account w-[200px] h-auto bg-white pt-4 space-y-4 rounded-sm shadow-xl shadow-white' tabIndex="-1" {...attrs}>
                                            {
                                                id ?
                                                    <>
                                                        <NavLink to='/account' className="flex gap-2 font-bold p-2 hover:bg-gray-400 hover:text-white"> <AccountIcon /> Tài khoản</NavLink>
                                                        <button onClick={handleLogout} className="w-full flex gap-2 font-bold p-2 hover:bg-gray-400 hover:text-white"> <LogoutIcon /> Đăng xuất </button>
                                                    </>
                                                    :
                                                    <>
                                                        <NavLink to='/login' className="flex gap-2 font-bold p-2 hover:bg-gray-400 hover:text-white"> <LoginIcon /> Đăng nhập </NavLink>
                                                    </>
                                            }
                                            <NavLink to='/register' className="flex gap-2 font-bold p-2 hover:bg-gray-400 hover:text-white"> <IntroduceIcon /> Đăng ký </NavLink>
                                        </div>
                                    )}
                                >
                                    <div className='sm:!hidden md:!hidden w-10 h-10'>
                                        <button onClick={handleChangePage} data-url='/account' className='w-full h-full'>
                                            {
                                                avatar ?
                                                    <Image src={avatar[0]} alt='avatar'
                                                        className='w-full h-full object-cover rounded-full bg-white hover:cursor-pointer pointer-events-none' /> :
                                                    <Image src={images.user} alt='ảnh'
                                                        className='w-full h-full object-cover rounded-full bg-white p-2 hover:cursor-pointer pointer-events-none' />
                                            }
                                        </button>
                                    </div>
                                </TippyHeadless>
                            </div>
                        </div>
                    </div>

                    <nav className='sm:!hidden md:!hidden w-full flex items-center justify-start flex-wrap gap-y-2 pb-4 md:gap-x-10 gap-x-20'>
                        <NavLink to={router.default} className="nav--link text-lg text-white" >Trang chủ</NavLink>
                        <NavLink to={router.introduce} className="nav--link text-lg text-white" >Giới thiệu</NavLink>

                        <TippyHeadless
                            appendTo={() => document.body}
                            // visible={true}
                            trigger="mouseenter"
                            offset={[0, 2]}
                            delay={[50, 50]}
                            placement='auto'
                            interactive={true}
                            render={attrs => (
                                <div className='w-[400px] h-auto bg-white space-y-4 rounded-sm shadow-xl shadow-white' tabIndex="-1" {...attrs}>
                                    <div className='grid grid-cols-2 gap-4'>
                                        <a href='/product' className='col-span-2 border-b border-solid border-[#ccc] p-4 hover:text-[var(--primary-color)] hover:cursor-pointer'>Tất cả sản phẩm</a>
                                        <p className='col-span-2 px-4 font-bold'>Danh mục sản phẩm</p>

                                        {
                                            categorys.length > 0 && categorys.map(category => (

                                                <a href={`/product?category=${category.name}`} className='px-4 hover:text-[var(--primary-color)] hover:cursor-pointer'>{category.name}</a>
                                            ))
                                        }
                                        <a href='/product?outstand=true' className='col-span-2 border-y border-solid border-[#ccc] p-4 hover:text-[var(--primary-color)] hover:cursor-pointer'>Sản phẩm khuyến mãi</a>
                                        <a href='/product?promote=true' className='col-span-2 border-b border-solid border-[#ccc] px-4 pb-4 hover:text-[var(--primary-color)] hover:cursor-pointer'>Sản phẩm nổi bật</a>
                                    </div>
                                </div>
                            )}
                        >
                            <NavLink to={router.product} className="nav--link text-lg text-white" >Sản phẩm</NavLink>
                        </TippyHeadless>

                        <NavLink to={router.priceLList} className="nav--link text-lg text-white" >Bảng giá</NavLink>
                        <NavLink to={router.contact} className="nav--link text-lg text-white" >Liên hệ</NavLink>
                        <NavLink to={router.policy} className="nav--link text-lg text-white" >Chính sách</NavLink>
                    </nav>
                </div >
            </section >
        </div >
    );

}

Header.propTypes = {
    avatar: PropTypes.node.isRequired,
    id: PropTypes.node.isRequired,
    cartsLength: PropTypes.node.isRequired,
}

export default Header;