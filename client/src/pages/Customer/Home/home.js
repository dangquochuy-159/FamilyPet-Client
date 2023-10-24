import { useContext } from "react";
import ButtonToTop from "~/components/ButtonToTop";
import CustomerContext from "~/context/CustomerContext";
import Banner from "./components/banner";

import './style_home.scss'

function Home() {
    const contextCustomer = useContext(CustomerContext)
    const [value] = contextCustomer

    const handleClick = () => {
    }
    return (
        <div id='page-home' style={{ height: '1000px' }} className="page">
            <ButtonToTop />
            <Banner />
            {/* <section className="container bg-gray-200">
                <h2>Section 1</h2>
                <button onClick={handleClick}>Click</button>
            </section> */}
        </div>
    );
}

export default Home;