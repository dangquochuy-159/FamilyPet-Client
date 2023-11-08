import axios from "axios";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "~/components/Button";
import ButtonToTop from "~/components/ButtonToTop";
import { CloseIcon, DeleteIcon, MinusIcon, PayIcon, PlusIcon } from "~/components/Icons";
import Image from "~/components/Image";
import CustomerContext from "~/context/CustomerContext";
import { changeNumberToPrice, handleLoadingPage } from "~/utils/SupportFunction/supportFunction";

function Cart() {
    const [userLogin] = useContext(CustomerContext)

    const [products, setProducts] = useState([])
    const [listProductCheck, setListProductCheck] = useState([])
    const [totalPay, setTotalPay] = useState(0)
    const [disabledBtn, setDisabledBtn] = useState(true)

    const ip_quantityRef = useRef()
    const navigate = useNavigate()

    const ipCheck = document.querySelectorAll('.ip-check')


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/products`).then(res => res.json())
            .then(data => setProducts(data.data))
    }, [])

    const caculateTotalPay = () => {
        let totalPay = 0
        Array.from(ipCheck).forEach(ip => {
            if (ip.checked === true) {
                let quantity = ip.parentElement.querySelector('.input-quantity').value
                userLogin.carts.forEach(cart => {
                    if (cart.id_product === ip.getAttribute("data-id-product")) {
                        totalPay += cart.price * quantity
                    }
                })
            }
        })
        setTotalPay(totalPay)
    }

    const handleChangeQuantity = (e) => {
        let btn = e.target.getAttribute("data-btn")
        let quantityMax = e.target.getAttribute("data-max")
        let inputQuantity = e.target.parentElement.querySelector('.input-quantity')
        let btnUp = e.target.parentElement.querySelector('.btn-up')
        let btnDown = e.target.parentElement.querySelector('.btn-down')
        let valueQuantity = Number(inputQuantity.value)
        btn === 'up' ?
            inputQuantity.value = valueQuantity + 1 :
            inputQuantity.value = valueQuantity - 1

        inputQuantity.value == 0 ? btnDown.disabled = true :
            btnDown.disabled = false;
        inputQuantity.value == quantityMax ? btnUp.disabled = true :
            btnUp.disabled = false;
        caculateTotalPay()
    }

    const handleChangeInputCheck = (e) => {
        let list_idProduct = []
        let isChecked = Array.from(ipCheck).some(ip => {
            return ip.checked === true
        })
        isChecked === true ? setDisabledBtn(false) : setDisabledBtn(true)

        Array.from(ipCheck).forEach(ip => {
            if (ip.checked === true) {
                list_idProduct.push(ip.getAttribute("data-id-product"))
            }
        })
        caculateTotalPay()
        setListProductCheck(list_idProduct)
    }

    const handleDeleteCartItem = () => {
        if (window.confirm("Bạn chắc chắn muốn xóa sản phẩm trong giỏ hàng")) {
            axios.delete(`${process.env.REACT_APP_API_URL}/api/users/${userLogin._id}/cart`, { data: listProductCheck })
                .then((res) => {
                    alert("xóa thành công")
                    window.location.reload()
                })
        }
    }

    const handleUnCheck = () => {
        Array.from(ipCheck).map((ip) => {
            return ip.checked = false
        })
        setDisabledBtn(true)
    }

    const handlePayment = async () => {
        const details = []
        Array.from(ipCheck).forEach(ip => {
            if (ip.checked === true) {
                let quantity = ip.parentElement.querySelector('.input-quantity').value
                userLogin.carts.forEach(cart => {
                    cart.id_product === ip.getAttribute("data-id-product") &&
                        details.push({
                            id_product: cart.id_product,
                            name_product: ip.getAttribute("data-name-product"),
                            quantity: quantity,
                            unit_price: cart.price,
                            into_money: cart.price * quantity,
                        })
                })
            }
        })

        const productPayment = {
            total_pay: totalPay,
            details: details,
        }
        window.sessionStorage.setItem("productPayment", JSON.stringify(productPayment))
        await handleLoadingPage()
        navigate('./payment-info')
    }

    return (
        <section id='sec-home_cart' className="grid_layout wide h-auto !my-16 sm:!my-2 ">
            <ButtonToTop />
            {
                !userLogin ? <p className="h-auto sm:!pt-16 text-center text-2xl font-bold">Vui lòng đăng nhập để xem thông tin giỏ hàng!
                    <Link to='/login' className="ml-4 text-red-400 font-medium underline hover:text-blue-500">Đăng nhập</Link>
                </p> :
                    <>
                        {
                            !userLogin.carts.length > 0 ? <p className="text-2xl text-center font-bold">Chưa có sản phẩm nào trong giỏ hàng!
                                <Link to='/' className="ml-4 underline text-blue-500 hover:text-red-500">Mua hàng ngay</Link></p> :
                                <>
                                    <div className="flex sm:!flex-wrap items-center justify-end p-4 gap-4 sm:!mb-2 mb-16 shadow-xl shadow-white bg-white sticky top-[128px]">
                                        <Button disabled={disabledBtn} id='btn-delete' onClick={handleDeleteCartItem} title='Xóa' rightIcon={<DeleteIcon />} className="sm:!w-full h-full px-4 py-2 rounded-sm text-white bg-red-600 hover:bg-red-500 disabled:bg-gray-400" />
                                        <Button disabled={disabledBtn} id='btn-pay' onClick={handlePayment} title='Thanh toán' rightIcon={<PayIcon />} className="sm:!w-full h-full px-4 py-2 rounded-sm text-white bg-blue-600 hover:bg-blue-500 disabled:bg-gray-400" />
                                        <Button disabled={disabledBtn} id='btn-uncheck' onClick={handleUnCheck} title='Bỏ chọn' rightIcon={<CloseIcon />} className="sm:!w-full h-full px-4 py-2 rounded-sm text-white bg-green-600 hover:bg-green-500 disabled:bg-gray-400" />
                                    </div>
                                    {userLogin.carts.map((cart, index) => (
                                        <div key={index} className="grid grid-cols-6 mb-4 bg-white rounded-sm shadow-xl shadow-white">
                                            <div className="col-span-1 w-full flex justify-center items-center p-4 ">
                                                {
                                                    products.map(product => product._id === cart.id_product &&
                                                        <Image key={product._id} src={product.photo[0]} alt='thuung'
                                                            className='w-[150px] h-[150xp] object-cover' />
                                                    )
                                                }
                                            </div>
                                            <div className="sm:!col-span-3 md:!col-span-3 col-span-4 flex flex-col gap-4 p-4">
                                                {
                                                    products.map((product, index) => product._id === cart.id_product &&
                                                        <Fragment key={index + product._id}>
                                                            <p className="sm:!text-lg text-2xl font-bold">{product.name}</p>
                                                            <p className="sm:!text-xs text-base sm:!max-h-[1rem] sm:!-h-[1rem]  h-[3rem] max-h-[3rem] overflow-hidden line-clamp-2 ">{product.des} </p>
                                                        </Fragment>
                                                    )
                                                }
                                                <p className="text-xl font-bold text-red-600">{changeNumberToPrice(cart.price)}</p>
                                            </div>
                                            <div className="sm:!col-span-2 md:!col-span-2 col-span-1 flex justify-around items-center ">
                                                {
                                                    products.map((product, index) => product._id === cart.id_product &&
                                                        <Fragment key={product._id + index} >
                                                            <div className="flex rounded-sm p-2 shadow-xl shadow-[var(--primary-color)] text-black font-bold bg-[var(--primary-color)]">
                                                                <Button leftIcon={<PlusIcon />} data-max={product.quantity} data-btn='up' onClick={handleChangeQuantity}
                                                                    className="btn-up disabled:text-gray-300" />
                                                                <input ref={ip_quantityRef} type='text' defaultValue={cart.quantity} readOnly
                                                                    className="input-quantity sm:!w-4 sm:!h-6 w-10 h-10 text-xl text-center outline-none bg-[var(--primary-color)]" />
                                                                <Button leftIcon={<MinusIcon className=' pointer-events-none' />} data-btn='down' onClick={handleChangeQuantity}
                                                                    className="btn-down disabled:text-gray-300" />
                                                            </div >
                                                            <input type='checkbox' className="ip-check w-6 h-6" onChange={handleChangeInputCheck}
                                                                data-id-product={product._id} data-name-product={product.name}
                                                            />
                                                        </Fragment>
                                                    )}
                                            </div>
                                        </div>
                                    ))
                                    }

                                </>
                        }
                    </>
            }
        </section>
    );
}

export default Cart;