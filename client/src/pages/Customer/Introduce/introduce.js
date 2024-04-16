/* eslint-disable jsx-a11y/alt-text */
import { useEffect } from "react";
import { images } from "~/assets";

function Introduce() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <section id='sec-introduce_page' className="grid_layout wide my-16 sm:!my-4 sm:!px-4 ">
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Giới thiệu</h2>
                <p>Thú cưng từ lâu đã trở thành một phần không thể thiếu trong cuộc sống của mỗi người,
                    và chính tên gọi của nó đã giúp nói lên tất cả: một con thú nhỏ bé, được
                    cưng chiều như thành viên trong gia đình. Vì vậy,
                    việc chăm sóc và dành những điều kiện tốt nhất cho
                    chúng luôn được đặt lên hàng đầu với những ai yêu mến
                    những người bạn nhỏ lúc thì đáng yêu nhưng chẳng ít khi “phiền ơi là phiền” này.
                </p>
                <div className="grid grid-cols-3 gap-4 my-8">
                    <img src={images.introduce_1} />
                    <img src={images.introduce_2} />
                    <img src={images.introduce_3} />
                </div>
                <p className="font-bold">Nuôi thú cưng giống hệt nuôi… em bé</p>
                <p>Liệu bạn có biết rằng rất lâu trước đây, việc làm mọi thứ cho vật nuôi của mình được xem là “điên rồ” và nguồn thức ăn chủ yếu cho các bé chính là đồ ăn thừa của chủ sau mỗi bữa ăn. Những thứ khác như sữa tắm, đồ chơi hay chỗ ngủ đều nằm ngoài khái niệm của người nuôi bởi với họ đó là những xa xỉ phẩm chỉ dành cho con người.</p>
                <div className="grid grid-cols-3 gap-4 my-8">

                    <img src={images.introduce_4} />
                    <img src={images.introduce_5} />
                    <img src={images.introduce_6} />
                </div>
                <p className="font-bold">Thú cưng cũng được chăm sóc như em bé</p>
                <p>Nhưng đó dĩ nhiên chỉ là chuyện quá khứ, bởi giờ đây chỉ cần lên mạng là bạn có thể dễ dàng bắt gặp vô số hình ảnh hay các đoạn clip ngắn của các bạn trẻ chia sẻ những khoảnh khắc hạnh phúc bên cạnh vật nuôi của mình. Đối với giới trẻ, việc chăm sóc thú cưng từ lâu không chỉ là trách nhiệm mà còn là niềm vui. Họ thích thú với việc chọn lựa những loại đồ ăn, đồ chơi đa dạng cho thú cưng của mình, đưa chúng đi spa chăm sóc lông và móng, đi huấn luyện, tổ chức sinh nhật cho chúng, hay thậm chí nói chuyện với chúng như những người bạn thật sự.</p>
                <p className="font-bold">Sự xuất hiện của các cửa hàng cho thú cưng</p>
                <p>Nắm bắt được nhu cầu đặc biệt này, những cửa hàng đầu tiên dành riêng cho thú cưng đã bắt đầu ra đời từ rất lâu trước đây. Và một trong số những cửa hàng đầu tiên thành công cho đến ngày nay chính là Pet Lovers Centre đến từ Singapore.</p>
            </div>


        </section>
    );
}

export default Introduce;