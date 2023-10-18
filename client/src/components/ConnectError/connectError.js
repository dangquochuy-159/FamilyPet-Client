import { useEffect, useState } from "react";

function ConnectError() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage('Đang kết nối tới server...');
        }, 2000);

        return () => clearTimeout(timer);
    }, []);
    return (
        <div className="w-full h-full bg-white pb-4 px-4 ">
            <p className="text-2xl text-center mt-10">{message}</p>
        </div >
    );
}

export default ConnectError;