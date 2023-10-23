import config from "~/config";
import Image from "~/components/Image";
import { images } from "~/assets";
import { NavLink } from "react-router-dom";
import { Button } from "~/components/Button";
import { CartIcon, SearchIcon } from "~/components/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import './header.scss'

function Header() {
    const router = config.routes_public

    return (
        <div className="wrapper--header_main w-full h-[128px] bg-[var(--primary-color)]">
            <section className="container w-full h-full flex justify-between gap-x-10">
                <div className="w-auto h-full flex justify-center items-center">
                    <Image src={images.logo} alt='logo' className='h-full w-full ' />
                </div>
                <div className="w-full flex md:flex-col items-center gap-x-10">
                    <nav className='w-2/3 md:w-full h-full md:!h-1/2 flex flex-wrap items-center md:order-2 gap-x-10'>
                        <NavLink to={router.default} className="nav--link text-xl text-white" >Trang chủ</NavLink>
                        <NavLink to={router.introduce} className="nav--link text-xl text-white" >Giới thiệu</NavLink>
                        <NavLink to={router.product} className="nav--link text-xl text-white" >Sản phẩm</NavLink>
                        <NavLink to={router.priceLList} className="nav--link text-xl text-white" >Bảng giá</NavLink>
                        <NavLink to={router.contact} className="nav--link text-xl text-white" >Liên hệ</NavLink>
                    </nav>
                    <div className="w-1/3 md:w-full h-full md:!h-1/2 flex items-center justify-end md:order-1 gap-6">
                        <div className="flex bg-white rounded-full">
                            <input type='text' placeholder='Tìm kiếm' className="h-auto py-2 px-4 font-bold outline-none rounded-tl-full rounded-bl-full"></input>
                            <Button leftIcon={<SearchIcon width="32px" height='32px' className='text-[var(--primary-color)]' />}
                                className='p-2 border-l border-solid border-[#ccc] rounded-tr-full rounded-br-full hover:bg-gray-100 hover:text-white' />
                        </div>
                        <div className="w-12 h-12 flex justify-center items-center rounded-full bg-white hover:cursor-pointer">
                            {/* <FontAwesomeIcon icon={faUser} /> */}
                            <Image src='https://static-images.vnncdn.net/files/publish/2022/9/3/bien-vo-cuc-thai-binh-339.jpg' alt='ảnh' className='w-full h-full object-cover rounded-full' />
                        </div>
                        <div className="w-auto h-auto relative">
                            <Button leftIcon={<CartIcon width="32px" height='32px' className='text-white' />} />
                            <p className="w-5 h-5 flex justify-center items-center absolute -top-2 -right-2 rounded-full text-white font-bold bg-red-600">0</p>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
}

export default Header;