import CustomerContext from "~/context/CustomerContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

function MainLayout({ children }) {
    const dataUser = window.sessionStorage.getItem('userLogin') && JSON.parse(window.sessionStorage.getItem('userLogin')).data.user
    const [userLogin, setUserLogin] = useState(dataUser)

    const [connectServer, setConnectServer] = useState(false)
    useEffect(() => {
        dataUser &&
            fetch(`${process.env.REACT_APP_API_URL}/api/users/${dataUser._id}`)
                .then(res => res.json())
                .then(data => {
                    setUserLogin(data.data)
                    setConnectServer(true)
                })
                .catch(err => setConnectServer(false));
    }, [])

    return (
        <CustomerContext.Provider value={[userLogin]}>
            <div className="flex flex-col min-h-screen">
                <Header avatar={connectServer && userLogin.avatar} id={connectServer && userLogin._id} carts={connectServer && userLogin.carts.length} />
                <div className="flex-1 mt-[var(--header-height)] bg-[#f5f5f5]">
                    {children}
                </div>
                <Footer />
            </div>
        </CustomerContext.Provider>
    );
}

export default MainLayout;