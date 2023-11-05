/* eslint-disable jsx-a11y/iframe-has-title */
import { faEnvelope, faLocationDot, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Button } from "~/components/Button";
import ButtonToTop from "~/components/ButtonToTop";

function Contact() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <section id='sec-contact_page' className="grid_layout wide my-16 sm:!px-4">
            <ButtonToTop />
            <h2 className="text-2xl text-center font-bold uppercase">Liên hệ</h2>
            <div className="grid grid-cols-3 mt-8 gap-y-4">
                <div className="sm:!col-span-3 w-full flex flex-col items-center gap-4">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-300">
                        <FontAwesomeIcon className="w-full text-3xl text-white" icon={faPhone} />
                    </div>
                    <p className="text-xl font-bold">Hỗ trợ tư vấn</p>
                    <p className="text-center">
                        19008080 - 19006969
                    </p>
                </div>
                <div className="sm:!col-span-3 w-full flex flex-col items-center gap-4">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-500">

                        <FontAwesomeIcon className="w-full text-3xl text-white" icon={faLocationDot} />
                    </div>
                    <p className="text-xl font-bold">Cửa hàng</p>
                    <p className="text-center">
                        128-140 Đ. Điện Biên Phủ, Đa Kao, Quận 1, Thành phố Hồ Chí Minh, Việt Nam
                    </p>
                </div>
                <div className="sm:!col-span-3 w-full flex flex-col items-center gap-4">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-600">
                        <FontAwesomeIcon className="w-full text-3xl text-white" icon={faEnvelope} />
                    </div>
                    <p className="text-xl font-bold">Thư góp ý</p>
                    <p className="text-center">
                        petshop@gmail.com
                    </p>
                </div>
            </div>


            <div className="mt-8">
                <p className="pb-8 text-xl font-bold">Bạn hãy điền nội dung tin nhắn vào form dưới đây. Chúng tôi sẽ liên hệ sau khi nhận được</p>
                <form className="grid grid-cols-3 gap-4">
                    <div className="sm:!col-span-3 w-full flex gap-2 items-center p-2 rounded-sm border border-solid border-[var(--primary-color)] bg-white">
                        <FontAwesomeIcon icon={faUser} className="text-[var(--primary-color)]" />
                        <input className="w-full outline-none" type='text' placeholder="Họ tên:" required />
                    </div>
                    <div className="sm:!col-span-3 w-full flex gap-2 items-center p-2 rounded-sm border border-solid border-[var(--primary-color)] bg-white">
                        <FontAwesomeIcon icon={faPhone} className="text-[var(--primary-color)]" />
                        <input className="w-full outline-none" type='number' placeholder="Số điện thoại:" required />
                    </div>
                    <div className="sm:!col-span-3 w-full flex gap-2 items-center p-2 rounded-sm border border-solid border-[var(--primary-color)] bg-white">
                        <FontAwesomeIcon icon={faEnvelope} className="text-[var(--primary-color)]" />
                        <input className="w-full outline-none" type='email' placeholder="Email:" required />
                    </div>
                    <div className="col-span-3 w-full flex gap-2 items-start p-2 rounded-sm border border-solid border-[var(--primary-color)] bg-white">
                        <textarea className="w-full h-40 outline-none resize-none" placeholder="Nội dung:" required />
                    </div>
                    <div className="col-span-3">
                        <Button type='primary' title='Gửi tin nhắn' className="bg-[var(--primary-color)] text-white" />
                    </div>
                </form>
            </div>
            <div className="w-full mt-8">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2896276718257!2d106.69347307577618!3d10.789115158958031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f34cdc651d3%3A0xfc7fe0fd6ea92a7b!2zMTI4IMSQLiDEkGnhu4duIEJpw6puIFBo4bunLCDEkGEgS2FvLCBRdeG6rW4gMywgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2sus!4v1698424110236!5m2!1svi!2sus"
                    className="sm:!rounded-none rounded-md w-full md:!h-full h-[400px]">
                </iframe>
            </div>
        </section>
    );
}

export default Contact