import { useRef, useState } from "react";
import './login.scss'

function Login() {
    const [eyePass, setEyePass] = useState('false')
    const ipPassRef = useRef()
    const handleShowPassword = (e) => {
        setEyePass(!eyePass)
        ipPassRef.current.type = ipPassRef.current.type === 'password' ? 'text' : 'password';
    }
    return (
        <div className="wrapper--login w-full h-screen relative">
            <div className="w-3/4 h-1/2 p-5 max-w-md bg-white absolute bottom-32 left-24 rounded shadow-lg">
                <h2 className="text-4xl text-center">Đăng nhập</h2>
                <form className="mt-10 space-y-8">
                    <input
                        className="w-full border-2 border-solid border-gray-400 rounded h-12 px-4 focus:outline-none "
                        placeholder="Email"
                        type="email"
                        required
                    />

                    <div className="flex items-center ">
                        <input
                            ref={ipPassRef}
                            className="w-full border-2 border-solid border-gray-400 rounded h-12 px-4 focus:outline-none -mr-7 "
                            placeholder="Password"
                            type="password"
                            required
                        />
                        <button type='button' onClick={handleShowPassword}>
                            {
                                eyePass ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                    <div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between ">
                            <input
                                className="bg-orange-500 text-sm active:bg-gray-700 cursor-pointer font-regular text-white px-4 py-2 rounded uppercase"
                                type="submit"
                                value="Xác nhận"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;