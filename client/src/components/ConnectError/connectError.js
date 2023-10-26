import { useEffect, useState } from "react";
import './connectError.scss'

function ConnectError() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage('! Mất kết nối tới server ...');
        }, 2000);

        return () => clearTimeout(timer);
    }, []);
    return (
        <div className="wrapper-error w-full h-full flex items-center justify-center bg-transparent text-red-600 ">
            <h1 className="text-2xl text-white font-normal py-10">{message}</h1>
        </div >
    );
}

export default ConnectError;