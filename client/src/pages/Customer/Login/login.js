import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Validator from "~/utils/Validate/validator";
import './login.scss'
import { ChangeIcon, EyeIcon, HomeIcon, NotEyeIcon } from "~/components/Icons";
import { NavLink } from "react-router-dom";
import { Button } from "~/components/Button";
import { API_USER_LOGIN } from "~/api/api";

function Login() {
    const [loginEmail, setLoginEmail] = useState("true")
    const [eyePass, setEyePass] = useState('false')
    const ipPassRef = useRef()
    const ipUserNameRef = useRef()

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
                Validator.isRequired("#username", check.isEmpty),
                loginEmail ? Validator.isEmail("#username", check.isEmail) : Validator.isRequired("#username", check.isEmpty),
                Validator.isRequired("#password", check.isEmpty),
                Validator.isMinLength("#password", check.minPass, check.isPass()),
            ],

            onRegister: function (data) {
                const eleErrorLogin = document.querySelector('.error--login')
                axios.post(API_USER_LOGIN, data)
                    .then((res) => {
                        let logged = res.data.login
                        if (logged) {
                            alert(res.data.message)
                            window.sessionStorage.setItem('userLogin', JSON.stringify({ data: res.data }))
                            window.location.href = '/';
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
    const handleChangeMethodLogin = () => {
        const msgErrors = document.querySelectorAll('.msg-error')
        setLoginEmail(!loginEmail)
        ipPassRef.current.value = ''
        ipUserNameRef.current.value = ''
        Array.from(msgErrors).map((msgError) => msgError.innerHTML = '')

        const ipUsername = document.querySelector('.input-username')
        const ipPass = document.querySelector('.input-pass')
        ipUsername.parentElement.classList.contains('invalid') &&
            ipUsername.parentElement.classList.remove('invalid')
        ipPass.parentElement.classList.contains('invalid') &&
            ipPass.parentElement.classList.remove('invalid')
    }
    return (
        <div className="wrapper--login w-full h-screen relative">
            <div className="w-3/4 h-auto sm:h-auto p-5 max-w-md backdrop-opacity-10 backdrop-invert bg-white/50 absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 rounded shadow-xl shadow-black">
                <h2 className="text-4xl text-center font-bold">Đăng nhập</h2>
                <div className="flex flex-col justify-center items-center gap-2 mt-2">
                    {
                        loginEmail ? <button className="text-center font-medium hover:text-blue-600" onClick={handleChangeMethodLogin}> Đăng nhập với email </button> :
                            <button className="text-center font-medium  hover:text-blue-600" onClick={handleChangeMethodLogin}> Đăng nhập với số điện thoại </button>
                    }
                    <Button leftIcon={<ChangeIcon />} onClick={handleChangeMethodLogin} />
                </div>
                <form action="" method="POST" id="form-login" noValidate className="form mt-10 space-y-8">
                    <div className="form-group">
                        {
                            loginEmail ?
                                <input
                                    ref={ipUserNameRef}
                                    id="username"
                                    className="input input-username w-full border-2 border-solid border-gray-400 rounded h-12 px-4 focus:outline-none form-control"
                                    type="text"
                                    name="email"
                                    placeholder="Nhập email"
                                    onFocus={() => document.querySelector('.error--login').innerHTML = ''}
                                /> :
                                <input
                                    ref={ipUserNameRef}
                                    id="username"
                                    className="input input-username w-full border-2 border-solid border-gray-400 rounded h-12 px-4 focus:outline-none form-control"
                                    type="number"
                                    name="phone_login"
                                    placeholder="Nhập số điện thoại"
                                    onFocus={() => document.querySelector('.error--login').innerHTML = ''}
                                />
                        }
                        <span className="msg-error text-red-600 font-bold"></span>
                    </div>
                    <div className="form-group ">
                        <div className="input input-pass flex items-center border-2 border-solid border-gray-400 rounded">
                            <input
                                ref={ipPassRef}
                                id="password"
                                className="w-full h-12 px-4 focus:outline-none -mr-7  form-control"
                                type="password"
                                name="password"
                                placeholder="Nhập mật khẩu"
                                onFocus={() => document.querySelector('.error--login').innerHTML = ''}
                            />
                            <button type='button' onClick={handleShowPassword}>
                                {
                                    eyePass ? (
                                        <NotEyeIcon />
                                    ) : (
                                        <EyeIcon />
                                    )
                                }
                            </button>
                        </div>
                        <span className="msg-error text-red-600 font-bold"></span>
                    </div>
                    <div className="flex sm:flex-col items-center justify-between">
                        <button className="bg-orange-500 text-sm active:bg-gray-700 cursor-pointer font-regular text-white px-4 py-2 rounded uppercase">
                            Xác nhận
                        </button>

                        <p className="error--login inline-block align-baseline font-bold text-sm text-red-500"></p>
                    </div>
                </form>

                <div className="sm:!flex-col gap-2 flex justify-between sm:!items-center mt-4">
                    <p className="font-medium">Chưa có tài khoản ?
                        <NavLink to='/register' className='ml-2 text-red-600 hover:text-blue-600'>Đăng ký</NavLink>
                    </p>
                    <NavLink to='/' className='flex gap-2 font-medium hover:text-blue-600'>Quay lại <HomeIcon /></NavLink>
                </div>

            </div>
        </div >
    );
}


export default Login;