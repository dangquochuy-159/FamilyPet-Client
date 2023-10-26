import { useContext } from "react";
import ButtonToTop from "~/components/ButtonToTop";
import CustomerContext from "~/context/CustomerContext";

import './style_home.scss'
import { images } from "~/assets";
import { AllProduct, CategoryProduct, OutstandProduct, PromoteProduct } from "./components";



function Home() {
    const contextCustomer = useContext(CustomerContext)
    const [value] = contextCustomer

    const handleClick = () => {
    }
    return (
        <div id='page-home' className="page ">
            <ButtonToTop />
            <section id='sec-home_banner' className='grid_layout h-auto md:h-auto overflow-hidden shadow-md shadow-black'>
                <img src={images.banner1} alt='banner' className='object-contain' />
            </section>

            <CategoryProduct />
            <OutstandProduct />
            <PromoteProduct />
            <AllProduct />
            {/* <section className="container bg-gray-200">
                <h2>Section 1</h2>
                <button onClick={handleClick}>Click</button>
            </section> */}
        </div>
    );
}

export default Home;