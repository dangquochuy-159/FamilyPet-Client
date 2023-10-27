import { images } from "~/assets";
import { AirPlanIcon, ServiceIcon } from "~/components/Icons";

function Service() {
    return (
        <section id='sec-home_service' className="grid_layout wide mt-16">
            <h2 className="w-full title  style-title sm:!text-2xl md:!text-3xl text-4xl text-white bg-green-500">
                <span className="flex">
                    <ServiceIcon width="36px" height="36px" />
                    <ServiceIcon width="36px" height="36px" />
                </span>
                Dịch vụ
                <span className="flex">
                    <ServiceIcon width="36px" height="36px" />
                    <ServiceIcon width="36px" height="36px" />
                </span>
            </h2>
            <div className="grid sm:!grid-cols-1 md:!grid-cols-1 grid-cols-3 gap-10 py-10">
                <div className="flex flex-col gap-5 p-4 sm:!rounded-none rounded-md shadow-md shadow-white bg-white">
                    <h4 className="text-center text-2xl font-bold p-4">Chăm sóc thú cưng</h4>
                    <div className="flex flex-col gap-2 ml-2">
                        <p className="flex items-start gap-5 text-xl font-normal"> <AirPlanIcon className='w-1/6' /> <span className="w-5/6">Giúp thú cưng sạch sẽ hơn, gọn gàng hơn</span></p>
                        <p className="flex items-start gap-5 text-xl font-normal"> <AirPlanIcon className='w-1/6' /> <span className="w-5/6">Tạo những kiểu tóc sang chảnh, ấn tượng</span></p>
                        <p className="flex items-start gap-5 text-xl font-normal"> <AirPlanIcon className='w-1/6' /> <span className="w-5/6">Loại bỏ các mầm mống gây bệnh từ lông móng</span></p>
                        <p className="flex items-start gap-5 text-xl font-normal"> <AirPlanIcon className='w-1/6' /> <span className="w-5/6">Thú cưng được massage đúng cách, tạo tâm lý vui vẻ, thoải mái</span></p>
                        <p className="flex items-start gap-5 text-xl font-normal"> <AirPlanIcon className='w-1/6' /> <span className="w-5/6">Đảm bảo an toàn cho boss</span></p>
                    </div>
                </div>
                <div className="sm:!hidden md:!hidden flex flex-col ">
                    <img src={images.service} alt='dich-vu' />
                </div>
                <div className="flex flex-col gap-5 p-2 sm:!rounded-none rounded-md shadow-md shadow-white bg-white">
                    <h4 className="text-center text-2xl font-bold p-4">Kiểm tra thú cưng</h4>
                    <div className="flex flex-col gap-2 ml-2">
                        <p className="flex items-start gap-5 text-xl font-normal"> <AirPlanIcon className='w-1/6' /> <span className="w-5/6">Ngăn ngừa và sớm phát hiện các bệnh nguy hiểm</span></p>
                        <p className="flex items-start gap-5 text-xl font-normal"> <AirPlanIcon className='w-1/6' /> <span className="w-5/6">Kiểm soát được tình trạng mất cân bằng dinh dưỡng</span></p>
                        <p className="flex items-start gap-5 text-xl font-normal"> <AirPlanIcon className='w-1/6' /> <span className="w-5/6">Phát hiện bệnh từ những dấu hiệu ban đầu và điều trị dứt điểm</span></p>
                        <p className="flex items-start gap-5 text-xl font-normal"> <AirPlanIcon className='w-1/6' /> <span className="w-5/6">Tiết kiệm chi phí và thời gian điều trị cho thú cưng</span></p>
                        <p className="flex items-start gap-5 text-xl font-normal"> <AirPlanIcon className='w-1/6' /> <span className="w-5/6">Phòng ngừa các bệnh lây từ thú sang người</span></p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Service;