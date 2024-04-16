/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { images } from "~/assets";
import './contactShow.scss'

function ContactShow() {
    return (
        <div id='contact_show' className="sm:!hidden md:!hidden w-auto flex flex-col gap-2  fixed bottom-56 right-10 z-50 ">
            <div className="w-16 h-16 flex justify-end items-center rounded-full ">
                <a href='#'>
                    <img src={images.mess_contact_show} className="contact_show-icon w-full h-full rounded-full" />
                </a>
            </div>
            <div className="w-16 h-16 flex justify-center items-center rounded-full">
                <a href='#'>
                    <img src={images.zalo_contact_show} className="contact_show-icon w-full h-full rounded-full" />
                </a>
            </div>
        </div>
    );
}

export default ContactShow;