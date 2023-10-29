/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/iframe-has-title */
import { Link } from "react-router-dom";
import { images } from "~/assets";
import { MapIcon, MapPinIcon, PhoneIcon } from "~/components/Icons";

function Footer() {
    return (
        <div className="wrapper-footer bg-[var(--primary-color)] text-white pt-16 pb-8">
            <div className="grid_layout wide">
                <div className="grid grid-cols-5 gap-10">
                    <div className="sm:!col-span-5 md:!col-span-5 col-span-2 grid sm:!grid-cols-1 md:!grid-cols-2 grid-cols-1 gap-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-4">
                                <p className="flex gap-2 sm:!text-xs text-xl">
                                    <span className="w-1/12"> <MapPinIcon /></span>
                                    <span className="w-11/12">PetShop</span>
                                </p>
                                <p className="flex gap-2 sm:!text-xs text-xl">
                                    <span className="w-1/12"><MapIcon /></span>
                                    <span className="w-11/12">Địa chỉ: 128-140 Đ. Điện Biên Phủ, Đa Kao, Quận 1, Thành phố Hồ Chí Minh, Việt Nam</span>
                                </p>
                                <p className="flex gap-2 sm:!text-xs text-xl">
                                    <span className="w-1/12"><PhoneIcon /></span>
                                    <span className="w-11/12">Hotline:19008080</span>
                                </p>
                            </div>
                            <div className="sm:!w-2/5 md:!w-full w-1/2 flex gap-4">
                                <a href="" className="w-1/5"><img src={images.facebook} alt="facebook" className="w-full brightness-0 invert" /></a>
                                <a href="" className="w-1/5"><img src={images.twitter} alt="twitter" className="w-full brightness-0 invert" /></a>
                                <a href="" className="w-1/5"><img src={images.instagram} alt="instagram" className="w-full brightness-0 invert" /></a>
                                <a href="" className="w-1/5"><img src={images.pinterest} alt="pinterest" className="w-full brightness-0 invert" /></a>
                                <a href="" className="w-1/5"><img src={images.youtube} alt="youtube" className="w-full brightness-0 invert" /></a>
                            </div>
                            <div className="w-full grid grid-cols-6 gap-2">
                                <div className=" flex items-start text-right gap-2">
                                    <img src={images.site_footer1} alt='site_footer1' className="w-full h-auto object-contain" />
                                    <img src={images.site_footer2} alt='site_footer2' className="w-full h-auto object-contain" />
                                    <img src={images.site_footer3} alt='site_footer3' className="w-full h-auto object-contain" />
                                    <img src={images.site_footer4} alt='site_footer4' className="w-full h-auto object-contain" />
                                    <img src={images.site_footer4} alt='site_footer4' className="w-full h-auto object-contain" />
                                    <img src={images.site_footer6} alt='site_footer6' className="w-full h-auto object-contain" />
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2896276718257!2d106.69347307577618!3d10.789115158958031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f34cdc651d3%3A0xfc7fe0fd6ea92a7b!2zMTI4IMSQLiDEkGnhu4duIEJpw6puIFBo4bunLCDEkGEgS2FvLCBRdeG6rW4gMywgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2sus!4v1698424110236!5m2!1svi!2sus"
                                className="sm:!rounded-none rounded-md w-full md:!h-full h-[200px]">
                            </iframe>
                        </div>
                    </div>

                    <div className="sm:!mx-auto sm:!col-span-5 md:!col-span-5 col-span-3 grid sm:!grid-cols-1 grid-cols-3 sm:!gap-2 gap-6">
                        <div className="sm:!text-xs sm:!col-span-1 flex flex-col sm:items-center sm:!gap-2 md:!gap-4 gap-6">
                            <h4 className="sm:!text-xl text-2xl font-bold">Tổng đài hỗ trợ </h4>
                            <p>Hotline hỗ trợ 24/7</p>
                            <p>Tư vấn khách hàng:</p>
                            <p className="underline">19008080</p>
                            <p>Khiếu nại, góp ý liên hệ:</p>
                            <p className="underline">19006969</p>
                            <p>petshop@gmail.com</p>
                        </div>
                        <div className="sm:!text-xs sm:!col-span-1 flex flex-col sm:items-center sm:!gap-2 md:!gap-4 gap-6">
                            <h4 className="sm:!text-xl text-2xl font-bold">Chính sách</h4>
                            <Link to='' className="hover:text-black" >Chính sách đổi trả</Link>
                            <Link to='' className="hover:text-black" >Chính sách bảo mật</Link>
                            <Link to='' className="hover:text-black" >Chính sách giao hàng</Link>
                            <Link to='' className="hover:text-black" >Quy chế hoạt động</Link>
                            <Link to='' className="hover:text-black" >Quy trình đặt hàng và thanh toán</Link>
                        </div>
                        <div className="sm:!text-xs sm:!col-span-1 flex flex-col sm:items-center sm:!gap-2 md:!gap-4 gap-6 ">
                            <h4 className="sm:!text-xl text-2xl font-bold">Về chúng tôi</h4>
                            <Link to="" className="hover:text-black">Trang chủ</Link>
                            <Link to="" className="hover:text-black">Giới thiệu</Link>
                            <Link to="" className="hover:text-black">Sản phẩm</Link>
                            <Link to="" className="hover:text-black">Bảng giá</Link>
                            <Link to="" className="hover:text-black">Liên hệ</Link>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-center pt-8">&copy; Bản quyền thuộc về PetShop</p>
                </div>
            </div>
        </div >
    );
}

export default Footer;