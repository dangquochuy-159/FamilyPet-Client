import CustomerContext from "~/context/CustomerContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import ButtonToTop from "~/components/ButtonToTop";
import { API_CATEGORY, API_USER } from "~/api/api";

function MainLayout({ children }) {
    const dataUser = window.sessionStorage.getItem('userLogin') && JSON.parse(window.sessionStorage.getItem('userLogin')).data.user
    const [userLogin, setUserLogin] = useState(dataUser)

    const [categorys, setCategorys] = useState([])

    const [connectServer, setConnectServer] = useState(false)
    useEffect(() => {
        fetch(`${API_CATEGORY}`).then(res => res.json())
            .then(data => {
                setCategorys(data.data)
            })
        dataUser &&
            fetch(`${API_USER}/${dataUser._id}`)
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
                <ButtonToTop />
                <Header
                    avatar={connectServer && userLogin.avatar}
                    id={connectServer && userLogin._id}
                    cartsLength={connectServer && userLogin.carts.length}
                    categorys={categorys}
                />
                <div className="flex-1 mt-[var(--header-height)] bg-[#f5f5f5]">
                    {children}
                </div>
                <Footer />
            </div>
        </CustomerContext.Provider>
    );
}

export default MainLayout;