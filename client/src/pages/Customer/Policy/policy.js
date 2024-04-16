import { useEffect } from "react";

function Policy() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <section id='sec-policy_page' className="grid_layout wide my-16 flex flex-col gap-8 sm:!my-0 sm:!p-2">
            <h2 className="text-4xl text-[var(--primary-color)] font-bold">Chính sách khi mua hàng tại FamilyPet</h2>
            {/* Mục 1 */}
            <div className="space-y-2">
                <p className="text-2xl font-bold">1. Chính sách đổi trả</p>
                <p className="text-lg">Nhằm giúp bạn thấy thoải mái và an tâm hơn khi mua sắm tại FamilyPet, khách hàng và thành viên FamilyPet hoàn toàn có thể đổi hoặc trả sản phẩm sau khi mua hàng.</p>
                <p className="text-xl italic text-[var(--primary-color)] underline">Khách hàng được kiểm tra sản phẩm trước khi nhận hàng</p>
                <p className="text-lg">FamilyPet khuyến khích khách hàng nên kiểm tra sản phẩm trước khi thanh toán, hoặc sau khi nhận được hàng nhằm giúp khách hàng an tâm và thoải mái hơn khi lựa chọn mua sắm tại FamilyPet.</p>
                <p className="text-xl italic text-[var(--primary-color)] underline">Sản phẩm được đổi trả</p>
                <p className="text-lg">Hàng hóa đổi/trả cần kèm theo hóa đơn mua hàng gốc từ FamilyPet và còn hạn sử dụng kèm theo:</p>
                <p className="text-lg">Còn nguyên tem, nhãn, bao bì, seal.</p>
                <p className="text-lg">Bao bì SP không nhàu nát, xé rách, lủng lỗ</p>
                <p className="text-lg">Chưa qua sử dụng (mới 100%).</p>

                <p className="text-xl italic text-[var(--primary-color)] underline">Thời hạn đổi trả sản phẩm</p>
                <p className="text-lg">Thời gian đổi/trả áp dụng: trong vòng 5 ngày kể từ khi bạn nhận được sản phẩm.</p>

                <p className="text-xl italic text-[var(--primary-color)] underline">Phương thức đổi/trả và thời gian giải quyết</p>
                <p className="text-lg">Khi nhận được yêu cầu đổi/trả sản phẩm, FamilyPet sẽ cố gắng giải quyết trong vòng 24h từ lúc nhận được yêu cầu</p>
                <p className="text-lg">Bạn không tốn phí đổi/trả sản phẩm</p>
                <p className="text-lg">Bạn có thể đổi/trả sản phẩm tại cửa hàng hoặc yêu cầu dịch vụ chuyển phát, bạn thanh toán phí vận chuyển phát sinh.</p>
                <p className="text-lg">Khi bạn yêu cầu đổi/trả sản phẩm sau thời gian đổi/trả tại, chúng tôi có thể từ chối giải quyết.</p>
                <p className="text-lg">Đơn hàng được xác nhận là lỗi sai sót (hàng hóa, số lượng, giao hàng…) từ phía FamilyPet, chúng tôi sẽ đổi sản phẩm cho bạn trong vòng 24-48h kể từ khi nhận được thông báo, áp dụng cho tất cả đơn hàng nội thành và các tỉnh thành khác. Chúng tôi khuyến khích bạn nên kiểm tra sản phẩm trước khi thanh toán.</p>

            </div>

            {/* Mục 2 */}
            <div className="space-y-2">
                <p className="text-2xl font-bold">2. Chính sách bảo mật</p>
                <p className="text-xl italic text-[var(--primary-color)] underline">Phạm vi thu nhập và mục đích thu nhập</p>
                <p className="text-lg">Việc thu nhập thông tin trên website của FamilyPet bao gồm: email, số điện thoại, địa chỉ và họ tên khách hàng</p>
                <p className="text-lg">Dữ liệu sẽ được thu nhập khi khách hàng đăng kí tài khoản hoặc mua hàng trên website </p>
                <p className="text-lg">Đây là các thông tin mà FamilyPet cần khách hàng cung cấp khi sử dụng dịch vụ nhằm để FamilyPet liên hệ khi khách hàng mưa sắm tại website</p>
                <p className="text-xl italic text-[var(--primary-color)] underline">Phạm vi sử dụng thông tin</p>
                <p className="text-lg">FamilyPet sẽ sử dụng thông tin khách hàng cugn cấp để:</p>
                <p className="text-lg">Cung cấp các dịch vụ đến khách hàng</p>
                <p className="text-lg">Gửi các thông báo về các hoạt động trao đổi thông tin giữa khách hàng và website</p>
                <p className="text-lg">Liên lạc và giải quyết với khách hàng trong một số trường hợp đặt biệt</p>
                <p className="text-lg">Khồn sử dụng thông tin khách hàng ngoài mục đích xác nhận và liên hệ có liên quan đến giao dịch tại FamilyPet</p>
                <p className="text-xl italic text-[var(--primary-color)] underline">Thời gian lưu trữ thông tin</p>
                <p className="text-lg">Dữ liệu cá nhân của khách hàng sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ hoặc khách hàng yêu cầu hủy bỏ. Còn lại trong mọi trường hợp thông tin cá nhân khách hàng sẽ được bảo mật trên máy chủ của FamilyPet</p>
                <p className="text-xl italic text-[var(--primary-color)] underline">Cam kết bảo mật thông tin khách hàng</p>
                <p className="text-lg">Thông tin cá nhân của khách hàng trên FamilyPet được cam kết bảo mật tuyệt đối theo chính sách bảo vệ thông tin cá nhân của FamilyPet Việc thu thập và sử dụng thông tin của mỗi khách hàng chỉ được thực hiện khi có sự đồng ý của khách hàng đó trừ những trường hợp pháp luật có quy định khác.</p>
                <p className="text-lg">Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên thứ 3 nào về thông tin cá nhân của khách hàng khi không có sự cho phép đồng ý từ khách hàng.</p>
                <p className="text-lg">Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến mất mát dữ liệu cá nhân. Chúng tôi sẽ có trách nhiệm thông báo vụ việc cho cơ quan chức năng điều tra xử lý kịp thời và thông báo cho khách hàng được biết.</p>
                <p className="text-lg">Bảo mật tuyệt đối mọi thông tin giao dịch trực tuyến của khách hàng bao gồm thông tin hóa đơn kế toán chứng từ số hóa trên FamilyPet.</p>
            </div>

            {/* Mục 3 */}
            <div>
                <p className="text-2xl font-bold">3. Chính sách giao hàng</p>
                <ul className="space-y-2 py-2">
                    <li className="space-y-2">
                        <p className="text-xl italic text-[var(--primary-color)] underline">Chính sách áp dụng</p>
                        <p className="text-lg">Áp dụng với tất cả tỉnh thành trên toàn quốc</p>
                    </li>
                    <li className="space-y-2">
                        <p className="text-xl italic text-[var(--primary-color)] underline">Thời gian nhận hàng</p>
                        <p className="text-lg">FamilyPet giao hàng hoả tốc trong ngày với các khách hàng trong TP Hồ Chí Minh và bán kính đến cửa hàng của FamilyPet dưới 15 km. Khoảng cách lớn hơn nhân viên của chúng tôi sẽ tư vấn cách thức giao hàng thuận tiện nhất cho khách hàng.</p>
                        <div className="grid grid-cols-2 gap-2">
                            <p className="text-lg font-bold">Khoảng cách từ khách hàng đến cửa hàng</p>
                            <p className="text-lg font-bold">Thành phố Hồ Chí Minh</p>
                            <p className="text-lg">Dưới 5 km</p>
                            <p className="text-lg">Giao hàng trong 30 phút</p>
                            <p className="text-lg">5-10km</p>
                            <p className="text-lg">Giao hàng trong 2 tiếng</p>
                            <p className="text-lg">10-20km</p>
                            <p className="text-lg">Giao trong 24 tiếng</p>
                            <p className="italic text-[var(--primary-color)]"> Lưu ý: Thời gian giao hàng từ 9:00 đến 21:00 hàng ngày</p>
                        </div>
                        <p className="text-lg font-bold">Đối với khách hàng các tỉnh ngoài Thành phố Hồ Chí Minh</p>
                        <p className="text-lg">Sản phẩm sẽ được giao đến khách hàng trong thời gian từ 2 đến 4 ngày</p>
                        <p className="text-xl italic text-[var(--primary-color)] underline">Chi phí giao hàng</p>
                        <p>Đối với đơn hàng tại Thành Phố Hồ Chí Minh, phí giao hàng được áp dụng là 29.000đ</p>
                        <p>Đối với các đơn hàng đi tỉnh, phí giao hàng được áp dụng là 35.000đ </p>
                        <p>Đối với đơn hàng trị giá trên 500.000đ sẽ được giao hàng MIỄN PHÍ</p>
                        <p className="text-xl italic text-[var(--primary-color)] underline">Một số lưu ý về vận chuyển</p>
                        <p>Áp dụng chính sách giao hàng nội thành thông qua các đối tác giao hàng nhanh như <strong> GRAB, AHAMOVE, ...</strong></p>
                        <p>Thời gian giao hàng nội thành TP HCM tối đa trong vòng 48 giờ tính từ lúc khách hàng đặt hàng</p>
                        <p>Khách hàng có thể thanh toán trực tiếp hoặc chuyển khoản ngân hàng.</p>
                        <p>Phí vận chuyển được tính theo 10% <strong>VAT</strong> và phí dịch vụ <strong>COD</strong> nếu giá trị đơn hàng trên 2.000.000đ (tùy theo quy định của mỗi bên đối tác giao hàng)</p>
                    </li>
                </ul>
            </div>

            {/* Mục 4 */}
            <div className="space-y-2">
                <p className="text-2xl font-bold">4. Quy trình đặt hàng và thanh toán</p>
                <p className="text-lg">Khách hàng có thể chọn thêm sản phẩm vào giỏ hàng sau đó tiến hành thanh toán sản phẩm từ giỏ hàng hoặc có thể mua hàng trực tiếp thông qua nút mua hàng trên trang chi tiết sản phẩm</p>
                <p className="text-xl italic text-[var(--primary-color)] underline">Các bước đặt hàng và thanh toán:</p>
                <p className="text-lg"><strong>Bước 1</strong>: Chọn mua hàng từ giỏ hàng hoặc mua hàng trực tiếp từ trang chi tiết sản phẩm</p>
                <p className="text-lg"><strong>Bước 2</strong>: Sau khi chon yêu cầu mua hàng sẽ sẽ chuyển sang trang nhập thông tin</p>
                <p className="text-lg"><strong>Bước 3</strong>: Tại trang nhập thông tin khách hàng nhập các thông tin sau:</p>
                <p className="text-lg"> - Hình thức thanh toán</p>
                <p className="text-lg"> - Họ tên</p>
                <p className="text-lg"> - Số điện thoại</p>
                <p className="text-lg"> - Địa chỉ</p>
                <p className="text-lg"> - Chọn mã khuyến mãi (nếu có)</p>
                <p className="text-lg"><strong>Bước 4</strong>: Sau khi nhập đầy đủ thông tin tiến hành thanh toán đơn hàng</p>
                <p className="text-lg"><strong>Bước 5</strong>: Kiểm tra đơn hàng và xác nhận thanh toán</p>
                <p className="text-lg"><strong>Bước 6</strong>: Đến của hàng nhận hàng (Đối với khách hàng chọn hình thức thanh toán tại cửa hàng) hoặc đợi giao hàng (Đối với khách hàng chọn hình thức thanh toán sau khi nhận hàng - COD)</p>
                <p className="text-lg"></p>
            </div>
        </section>
    );
}

export default Policy;