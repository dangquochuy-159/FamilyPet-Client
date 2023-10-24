import CustomerContext from "~/context/CustomerContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

function MainLayout({ children }) {
    const value = 'huy'
    const [user, setUser] = useState({})
    useEffect(() => {
        // fetch(`${process.env.REACT_APP_API_URL}/api/users`).then(res => res.json()).then(data =>)
    })

    return (
        <CustomerContext.Provider value={[value]}>
            <Header />
            <div className="mt-[128px]">
                {children}
            </div>
            <Footer />
        </CustomerContext.Provider>
    );
}

export default MainLayout;