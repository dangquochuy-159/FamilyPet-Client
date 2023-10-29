import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Link, useActionData } from "react-router-dom";
import { Button } from "~/components/Button";
import { CloseIcon, DeleteIcon, MinusIcon, PayIcon, PlusIcon } from "~/components/Icons";
import Image from "~/components/Image";
import CustomerContext from "~/context/CustomerContext";

function Cart() {
    const [products, setProducts] = useState([])
    const [userLogin] = useContext(CustomerContext)
    const ip_quantityRef = useRef()

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/products`).then(res => res.json())
            .then(data => setProducts(data.data))
    })

    const handleChangeQuantity = (e) => {
        let btn = e.target.getAttribute("data-btn")
        let input = e.target.parentElement.querySelector('.input-quantity')
        let btnUp = e.target.parentElement.querySelector('.btn-up')
        let btnDown = e.target.parentElement.querySelector('.btn-down')
        let value = Number(input.value)
        if (btn === 'up') {
            input.value = value + 1
        } else {
            input.value = value - 1
        }
        input.value == 0 ? btnDown.disabled = true :
            btnDown.disabled = false;
        input.value == 6 ? btnUp.disabled = true :
            btnUp.disabled = false;
    }
    const handleDeleteCartItem = () => {
        let value = Number(ip_quantityRef.current.value)
        console.log(value)
    }
    const handlePayment = () => { }
    const handleUnCheck = () => { }
    return (
        <section id='sec-home_cart' className="grid_layout wide h-auto !my-16 ">


            {
                !userLogin.carts.length > 0 ? <p className="text-2xl text-center font-bold">Chưa có sản phẩm nào trong giỏ hàng!
                    <Link to='/' className="ml-4 underline text-blue-500 hover:text-red-500">Mua hàng ngay</Link></p> :
                    <>
                        <div className="flex items-center justify-end p-4 gap-4 mb-16 shadow-xl shadow-white bg-white sticky top-[128px]">
                            <Button onClick={handleDeleteCartItem} title='Xóa' rightIcon={<DeleteIcon />} className="px-4 py-2 rounded-sm text-white bg-red-600 hover:bg-red-500" />
                            <Button onClick={handlePayment} title='Thanh toán' rightIcon={<PayIcon />} className="px-4 py-2 rounded-sm text-white bg-blue-600 hover:bg-blue-500" />
                            <Button onClick={handleUnCheck} title='Bỏ chọn' rightIcon={<CloseIcon />} className="px-4 py-2 rounded-sm text-white bg-green-600 hover:bg-green-500" />
                        </div>
                        {userLogin.carts.map((cart, index) => (
                            <div key={index} className="grid grid-cols-6 mb-4 bg-white rounded-sm shadow-xl shadow-white">
                                <div className="col-span-1 w-full flex justify-center items-center p-4 ">
                                    {
                                        products.map(product => product._id === cart.id_product &&
                                            <Image key={product._id} src={`${process.env.REACT_APP_API_URL}/api/products/${product._id}}/${product.photo}`} alt='thuung'
                                                className='w-[150px] h-[150xp] object-cover' />
                                        )
                                    }
                                </div>
                                <div className="col-span-4 flex flex-col gap-4 py-4">
                                    {
                                        products.map((product, index) => product._id === cart.id_product &&
                                            <Fragment key={index + product._id}>
                                                <p className="text-2xl font-bold">{product.name}</p>
                                                <p>{product.des} </p>
                                            </Fragment>
                                        )
                                    }
                                    <p className="text-xl font-bold text-red-600">{cart.price}</p>
                                </div>
                                <div className="col-span-1 flex justify-around items-center ">
                                    <div className="flex rounded-sm p-2 shadow-xl shadow-[var(--primary-color)] text-black font-bold bg-[var(--primary-color)]">
                                        <Button leftIcon={<PlusIcon />} data-btn='up' onClick={handleChangeQuantity}
                                            className="btn-up disabled:text-gray-300" />
                                        <input ref={ip_quantityRef} type='text' defaultValue={cart.quantity} readOnly
                                            className="input-quantity w-10 h-10 text-xl text-center outline-none bg-[var(--primary-color)]" />
                                        <Button leftIcon={<MinusIcon className=' pointer-events-none' />} data-btn='down' onClick={handleChangeQuantity}
                                            className="btn-down disabled:text-gray-300" />
                                    </div>
                                    <input type='checkbox' className="w-6 h-6" />
                                </div>
                            </div>
                        ))
                        }
                    </>
            }
        </section>
    );
}

export default Cart;