import { useEffect } from "react";
import { images } from "~/assets";
import ButtonToTop from "~/components/ButtonToTop";
import { CheckIcon } from "~/components/Icons";
import { changeNumberToPrice } from "~/utils/SupportFunction/supportFunction";

function PriceList() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <section id='sec-price_list-page' className="grid_layout wide my-8">
            <ButtonToTop />
            <h2 className="text-2xl text-center font-bold uppercase">Bảng giá</h2>
            <div className='grid grid-cols-2 gap-2 mt-8'>
                <img src={images.banner_price_list01} alt='' className="h-full" />
                <img src={images.banner_price_list02} alt='' className="h-full" />
            </div>
            <div className="mt-8 px-8 py-8 bg-white sm:!rounded-none rounded-xl border border-solid border-[var(--primary-color)]">
                <p className="text-lg text-center mb-8 font-bold">Chăm sóc thú cưng</p>
                <ul>
                    <li className="text-lg flex justify-between sm:!gap-x-4 py-8 border-b border-solid border-[var(--primary-color)]">
                        <p className="flex gap-2"><CheckIcon className='text-[var(--primary-color)]' /> Tắm gội cho thú cưng</p>
                        <p className="text-red-600 font-bold ">{changeNumberToPrice(100000)}</p>
                    </li>
                    <li className="text-lg flex justify-between sm:!gap-x-4 py-8 border-b border-solid border-[var(--primary-color)]">
                        <p className="flex gap-2"><CheckIcon className='text-[var(--primary-color)]' /> Tỉa móng tay móng chân</p>
                        <p className="text-red-600 font-bold ">{changeNumberToPrice(200000)}</p>
                    </li>
                    <li className="text-lg flex justify-between sm:!gap-x-4 py-8 border-b border-solid border-[var(--primary-color)]">
                        <p className="flex gap-2"><CheckIcon className='text-[var(--primary-color)]' /> Cắt tóc tạo kiểu lông thú cưng</p>
                        <p className="text-red-600 font-bold ">{changeNumberToPrice(300000)}</p>
                    </li>
                    <li className="text-lg flex justify-between sm:!gap-x-4 py-8 border-b border-solid border-[var(--primary-color)]">
                        <p className="flex gap-2"><CheckIcon className='text-[var(--primary-color)]' /> Massage cho thú cưng</p>
                        <p className="text-red-600 font-bold ">{changeNumberToPrice(800000)}</p>
                    </li>
                    <li className="text-lg flex justify-between sm:!gap-x-4 py-8 border-b border-solid border-[var(--primary-color)]">
                        <p className="flex gap-2"><CheckIcon className='text-[var(--primary-color)]' /> Vệ sinh móng tay móng chân</p>
                        <p className="text-red-600 font-bold ">{changeNumberToPrice(150000)}</p>
                    </li>
                    <li className="text-lg flex justify-between sm:!gap-x-4 py-8 ">
                        <p className="flex gap-2"><CheckIcon className='text-[var(--primary-color)]' /> Dịch vụ đặc biệt</p>
                        <p className="text-red-600 font-bold ">{changeNumberToPrice(1000000)}</p>
                    </li>
                </ul>
            </div>
            <div className='grid grid-cols-2 gap-2 mt-8'>
                <img src={images.banner_price_list03} alt='' className="h-full" />
                <img src={images.banner_price_list04} alt='' className="h-full" />
            </div>
            <div className="mt-8 px-8 py-8 bg-white sm:!rounded-none rounded-xl border border-solid border-[var(--primary-color)]">
                <p className="text-lg text-center mb-8 font-bold">Kiểm tra thú cưng</p>
                <ul>
                    <li className="text-lg flex justify-between sm:!gap-x-4 py-8 border-b border-solid border-[var(--primary-color)]">
                        <p className="flex gap-2"><CheckIcon className='text-[var(--primary-color)]' /> Kiểm tra sức khỏe định kỳ</p>
                        <p className="text-red-600 font-bold ">{changeNumberToPrice(200000)}</p>
                    </li>
                    <li className="text-lg flex justify-between sm:!gap-x-4 py-8 border-b border-solid border-[var(--primary-color)]">
                        <p className="flex gap-2"><CheckIcon className='text-[var(--primary-color)]' /> Tiêm phòng</p>
                        <p className="text-red-600 font-bold ">{changeNumberToPrice(400000)}</p>
                    </li>
                    <li className="text-lg flex justify-between sm:!gap-x-4 py-8 border-b border-solid border-[var(--primary-color)]">
                        <p className="flex gap-2"><CheckIcon className='text-[var(--primary-color)]' /> Xét nghiệm nội tiết</p>
                        <p className="text-red-600 font-bold ">{changeNumberToPrice(1000000)}</p>
                    </li>
                    <li className="text-lg flex justify-between sm:!gap-x-4 py-8 border-b border-solid border-[var(--primary-color)]">
                        <p className="flex gap-2"><CheckIcon className='text-[var(--primary-color)]' /> X-Ray và siêu âm</p>
                        <p className="text-red-600 font-bold ">{changeNumberToPrice(1200000)}</p>
                    </li>
                    <li className="text-lg flex justify-between sm:!gap-x-4 py-8 border-b border-solid border-[var(--primary-color)]">
                        <p className="flex gap-2"><CheckIcon className='text-[var(--primary-color)]' /> Kiểm tra nha khoa</p>
                        <p className="text-red-600 font-bold ">{changeNumberToPrice(800000)}</p>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default PriceList;