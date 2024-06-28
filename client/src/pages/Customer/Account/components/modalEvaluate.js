import axios from "axios";
import { useRef, useState } from "react";
import { API_EVALUATE } from "~/api/api";
import { StarIcon } from "~/components/Icons";

function ModalEvaluate({ id_product, name_product, user_name, user_id }) {
    const [star, setStar] = useState(0)
    const contentRef = useRef()

    const handleSelectStar = (e) => {
        const btnStars = document.querySelectorAll('.btn-star')
        let dataStar = e.target.getAttribute('data-star');
        let noActive = e.target.querySelector('.icon-star').classList.contains('fill-white')

        if (dataStar === star && !noActive) {
            Array.from(btnStars).forEach(btnStar => { btnStar.querySelector('.icon-star').classList.add('fill-white') })
            setStar(0)
        } else {
            Array.from(btnStars).forEach(btnStar => {
                if (btnStar.getAttribute('data-star') <= dataStar) {
                    btnStar.querySelector('.icon-star').classList.remove('fill-white')
                    btnStar.querySelector('.icon-star').classList.add('fill-yellow-400')
                } else {
                    btnStar.querySelector('.icon-star').classList.remove('fill-yellow-400')
                    btnStar.querySelector('.icon-star').classList.add('fill-white')
                }
            })
            setStar(dataStar)
        }

    }


    const handleSendEvaluate = () => {
        const data = {
            id_product: id_product,
            id_customer: user_id,
            name_product: name_product,
            name_user: user_name,
            star: star,
            content: contentRef.current.value
        }
        axios.post(API_EVALUATE, data)
            .then(res => {
                alert('Gửi đánh giá thành công')
                window.location.reload()
            })

    }


    return (
        <div className="p-4 flex flex-col gap-4">
            <h2 className="text-center text-4xl font-medium">Đánh giá sản phẩm</h2>
            <div className="p-8 flex justify-center items-center gap-2">
                <button onClick={handleSelectStar} data-star='1' className="btn-star text-yellow-400"><StarIcon className='icon-star fill-white' width='50px' height="50px" /></button>
                <button onClick={handleSelectStar} data-star='2' className="btn-star text-yellow-400"><StarIcon className='icon-star fill-white' width='50px' height="50px" /></button>
                <button onClick={handleSelectStar} data-star='3' className="btn-star text-yellow-400"><StarIcon className='icon-star fill-white' width='50px' height="50px" /></button>
                <button onClick={handleSelectStar} data-star='4' className="btn-star text-yellow-400"><StarIcon className='icon-star fill-white' width='50px' height="50px" /></button>
                <button onClick={handleSelectStar} data-star='5' className="btn-star text-yellow-400"><StarIcon className='icon-star fill-white' width='50px' height="50px" /></button>
            </div>
            <div>
                <p className="text-xl font-medium">Nhận xét:</p>
                <textarea ref={contentRef} className="h-40 w-full p-4 border border-solid border-gray-300 outline-none resize-none" />
            </div>
            <div className="flex justify-end">
                <button onClick={handleSendEvaluate} className="w-40 p-4 text-white bg-red-500">Gửi</button>
            </div>
            {/* <h2>{id_product}</h2>
            <h2>{name_product}</h2>
            <h2>{user_name}</h2>
            <h2>{user_id}</h2> */}
        </div>
    );
}

export default ModalEvaluate;