import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Validator from "~/utils/Validate/validator";
import './login.scss'
import { EyeIcon, NotEyeIcon } from "~/components/Icons";

function Login() {
    const [eyePass, setEyePass] = useState('false')
    const ipPassRef = useRef()

    useEffect(() => {
        const check = {
            isEmpty: "Vui lòng không để trống",
            isEmail: "Vui lòng nhập đúng định dạng",
            minPass: 6,
            isPass() {
                return `Vui lòng nhập tối thiểu ${this.minPass} ký tự`
            },
        }
        Validator({
            form: '#form-login',
            formGroup: '.form-group',
            formError: '.msg-error',
            rules: [
                Validator.isRequired("#email", check.isEmpty),
                Validator.isEmail("#email", check.isEmail),
                Validator.isRequired("#password", check.isEmpty),
                Validator.isMinLength("#password", check.minPass, check.isPass()),
            ],
            onRegister: function (data) {
                const eleErrorLogin = document.querySelector('.error--login')
                axios.post(`${process.env.REACT_APP_API_URL}/api/admins/login`, data)
                    .then((res) => {
                        let logged = res.data.login
                        if (logged) {
                            alert(res.data.message)
                            window.sessionStorage.setItem('adminLogin', JSON.stringify({ data: res.data }))
                            window.location.href = '/admin/dashboard';
                        } else {
                            eleErrorLogin.innerHTML = res.data.message
                        }
                    })
                    .catch((error) => {
                        console.error('Đã xảy ra lỗi:', error);
                    });
            }
        })
    })
    const handleShowPassword = (e) => {
        setEyePass(!eyePass)
        ipPassRef.current.type = ipPassRef.current.type === 'password' ? 'text' : 'password';
    }
    return (
        <div className="wrapper--login_admin w-full h-screen relative bg-[#f5f5f5]">
            <div className="w-3/4 h-auto sm:h-auto p-5 max-w-md bg-white absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 rounded shadow-xl shadow-black">
                <h2 className="text-4xl text-center font-bold">Đăng nhập</h2>
                <p className="text-xl text-center">(Quản trị viên)</p>
                <form action="" method="POST" id="form-login" noValidate className="form mt-10 space-y-8">
                    <div className="form-group">
                        <input
                            id="email"
                            className="w-full border-2 border-solid border-gray-400 rounded h-12 px-4 focus:outline-none form-control"
                            type="email"
                            name="email"
                            placeholder="Nhập emai"
                            onFocus={() => document.querySelector('.error--login').innerHTML = ''}
                        />
                        <span className="msg-error text-red-600"></span>
                    </div>
                    <div className="form-group">
                        <div className="flex items-center">
                            <input
                                ref={ipPassRef}
                                id="password"
                                className="w-full border-2 border-solid border-gray-400 rounded h-12 px-4 focus:outline-none -mr-7  form-control"
                                type="password"
                                name="password"
                                placeholder="Nhập mật khẩu"
                                onFocus={() => document.querySelector('.error--login').innerHTML = ''}
                            />
                            <button type='button' onClick={handleShowPassword}>
                                {
                                    eyePass ? (
                                        <EyeIcon />
                                    ) : (
                                        <NotEyeIcon />
                                    )
                                }
                            </button>
                        </div>
                        <span className="msg-error text-red-600"></span>
                    </div>
                    <div className="flex sm:flex-col items-center justify-between">
                        <button className="bg-orange-500 text-sm active:bg-gray-700 cursor-pointer font-regular text-white px-4 py-2 rounded uppercase">
                            Xác nhận
                        </button>
                        <p className="error--login inline-block align-baseline font-bold text-sm text-red-500"></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;