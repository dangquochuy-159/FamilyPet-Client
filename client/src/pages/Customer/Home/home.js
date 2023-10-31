import { useContext } from "react";
import ButtonToTop from "~/components/ButtonToTop";
import CustomerContext from "~/context/CustomerContext";

import './style_home.scss'
import { images } from "~/assets";
import { AllProduct, CategoryProduct, OutstandProduct, PromoteProduct, Service } from "./components";



function Home() {
    const contextCustomer = useContext(CustomerContext)
    const [value] = contextCustomer

    const handleClick = () => {
    }
    return (
        <div id='page-home' className="page pb-16">
            <ButtonToTop />
            <section id='sec-home_banner' className='grid_layout h-auto md:h-auto overflow-hidden shadow-md shadow-black'>
                <img src={images.banner1} alt='banner' className='w-full object-contain' />
            </section>

            <CategoryProduct />
            <OutstandProduct />
            <PromoteProduct />
            <AllProduct />
            <Service />
            <section id='sec-home_logo' className="grid_layout wide mt-16">
                <div className="w-full grid sm:!grid-cols-3 grid-cols-5 gap-4">
                    <img src={images.logo_home_01} alt='logo-home' className="w-full h-auto object-contain" />
                    <img src={images.logo_home_02} alt='logo-home' className="w-full h-auto object-contain" />
                    <img src={images.logo_home_03} alt='logo-home' className="w-full h-auto object-contain" />
                    <img src={images.logo_home_04} alt='logo-home' className="w-full h-auto object-contain" />
                    <img src={images.logo_home_05} alt='logo-home' className="w-full h-auto object-contain" />
                </div>
            </section>
        </div>
    );
}

export default Home;