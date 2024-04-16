import { useNavigate } from "react-router-dom";
import { handleLoadingPage } from "~/utils/SupportFunction/supportFunction";

function NotFound() {
    const navigate = useNavigate()
    const handleClickBackHome = async () => {
        await handleLoadingPage()
        navigate('/')
    }

    return (
        <div className="ư-full h-screen flex flex-col justify-start items-center">
            <h1 className="!mt-24 text-[300px] text-[var(--primary-color)]">404</h1>
            <p className="text-3xl font-thin uppercase">Page not found</p>
            <button onClick={handleClickBackHome} className="mt-32 text-xl underline text-blue-300">Trở về trang chủ</button>
        </div>
    );
}

export default NotFound