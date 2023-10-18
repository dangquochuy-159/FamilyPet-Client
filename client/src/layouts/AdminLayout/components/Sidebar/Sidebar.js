import config from "~/config";
import './Sidebar.scss'
import { images } from '~/assets'
import { NavItem, NavMenu } from '~/components/NavMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat, faChartLine, faCircleInfo, faGift, faPaste, faPenNib, faRectangleList, faRightFromBracket, faUser, } from '@fortawesome/free-solid-svg-icons';


function Sidebar() {
    const admin = config.routes_private

    const handleLogout = () => {
        window.sessionStorage.removeItem('adminLogin')
        window.sessionStorage.removeItem('titleHeader')
        window.location.href = '/admin';
    }
    return (
        <div className="wrapper--sidebar w-2/12 h-screen fixed top-0 left-0 ">
            <div className='w-full logo--admin border-b-2 border-solid border-black'>
                <img src={images.logo_admin} alt='logo admin' />
            </div>
            <NavMenu className='flex flex-col '>
                <NavItem to={admin.dashboard} title='Thống kê' className=' py-4 px-6' icon={<FontAwesomeIcon icon={faChartLine} />} />
                <NavItem to={admin.user} title='Khách hàng' className=' py-4 px-6' icon={<FontAwesomeIcon icon={faUser} />} />
                <NavItem to={admin.product} title='Sản phẩm' className=' py-4 px-6' icon={<FontAwesomeIcon icon={faCat} />} />
                <NavItem to={admin.category} title='Danh mục sản phẩm' className=' py-4 px-6' icon={<FontAwesomeIcon icon={faRectangleList} />} />
                <NavItem to={admin.order} title='Đơn đặt hàng' className=' py-4 px-6' icon={<FontAwesomeIcon icon={faPaste} />} />
                <NavItem to={admin.promote} title='Khuyến mãi' className=' py-4 px-6' icon={<FontAwesomeIcon icon={faGift} />} />
                <NavItem to={admin.evaluate} title='Đánh giá' className=' py-4 px-6' icon={<FontAwesomeIcon icon={faPenNib} />} />
                <NavItem to={admin.info} title='Thông tin quản trị viên' className=' py-4 px-6' icon={<FontAwesomeIcon icon={faCircleInfo} />} />
                <button
                    className='btn--logout w-full border-t-2 border-solid border-black text-left absolute bottom-0 left-0 py-4 px-6 '
                    onClick={handleLogout}
                >
                    <span className="w-4 h-4">
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </span>
                    <span className="ml-4 font-bold">Logout</span>
                </button>
            </NavMenu>
        </div>
    );
}

export default Sidebar;