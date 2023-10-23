import { useContext } from "react";
import ButtonToTop from "~/components/ButtonToTop";
import CustomerContext from "~/context/CustomerContext";

function Home() {
    const contextCustomer = useContext(CustomerContext)
    const [value] = contextCustomer
    return (
        <div style={{ height: '1000px' }} className="">
            <ButtonToTop />
            <section className="container bg-gray-200">
                <h2>Section 1</h2>
            </section>
        </div>
    );
}

export default Home;