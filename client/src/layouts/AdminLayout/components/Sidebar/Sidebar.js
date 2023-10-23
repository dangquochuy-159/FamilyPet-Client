import config from "~/config";
import './Sidebar.scss'
import { NavItem, NavMenu } from '~/components/NavMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat, faChartLine, faCircleInfo, faGift, faPaste, faPenNib, faRectangleList, faRightFromBracket, faUser, faUserGear, } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";


function Sidebar() {
    const admin = config.routes_private

    const handleLogout = () => {
        window.sessionStorage.removeItem('adminLogin')
        window.sessionStorage.removeItem('titleHeader')
        window.location.href = '/admin';
    }
    return (
        <div className="wrapper--sidebar sm:!w-full md:w-1/12 w-2/12 sm:!h-auto h-screen fixed lg:top-0 sm:!bottom-0 left-0 sm:z-50">
            <div className='w-full h-auto logo--admin border-b-2 border-solid border-black'>
                <NavLink to='/admin'>
                    <h2 className="text-black text-center text-2xl font-bold py-8">
                        <span className="sm:hidden md:hidden mr-4">  QUẢN TRỊ VIÊN</span>
                        <FontAwesomeIcon icon={faUserGear} />
                    </h2>
                    {/* <img src={images.logo_admin} alt='logo-admin' className="w-1/2 h-auto m-auto" /> */}
                </NavLink>

            </div>
            <NavMenu className='sm:h-[64px] flex sm:!flex-row sm:justify-around sm:items-center  flex-col sm:bg-[var(--primary-color)]'>
                <NavItem to={admin.dashboard} title='Thống kê' className='sm:!px-2 sm:!py-0 py-4 px-6' icon={<FontAwesomeIcon icon={faChartLine} />} />
                <NavItem to={admin.user} title='Khách hàng' className='sm:!px-2 sm:!py-0 py-4 px-6' icon={<FontAwesomeIcon icon={faUser} />} />
                <NavItem to={admin.product} title='Sản phẩm' className='sm:!px-2 sm:!py-0 py-4 px-6' icon={<FontAwesomeIcon icon={faCat} />} />
                <NavItem to={admin.category} title='Danh mục sản phẩm' className='sm:!px-2 sm:!py-0 py-4 px-6' icon={<FontAwesomeIcon icon={faRectangleList} />} />
                <NavItem to={admin.order} title='Đơn đặt hàng' className='sm:!px-2 sm:!py-0 py-4 px-6' icon={<FontAwesomeIcon icon={faPaste} />} />
                <NavItem to={admin.promote} title='Khuyến mãi' className='sm:!px-2 sm:!py-0 py-4 px-6' icon={<FontAwesomeIcon icon={faGift} />} />
                <NavItem to={admin.evaluate} title='Đánh giá' className='sm:!px-2 sm:!py-0 py-4 px-6' icon={<FontAwesomeIcon icon={faPenNib} />} />
                <NavItem to={admin.info} title='Thông tin quản trị viên' className='sm:!px-2 sm:!py-0 py-4 px-6' icon={<FontAwesomeIcon icon={faCircleInfo} />} />
                <NavItem to='./' title='Đăng xuất' className='sm:!block sm:!px-2 sm:!py-0 py-4 px-6 hidden' icon={<FontAwesomeIcon icon={faRightFromBracket} />} onClick={handleLogout} />
                <button
                    className='sm:hidden btn--logout w-full text-white text-left absolute bottom-0 left-0 py-4 px-6 bg-red-600'
                    onClick={handleLogout}
                >
                    <span className="w-4 h-4">
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </span>
                    <span className="md:hidden ml-4 font-bold">Logout</span>
                </button>
            </NavMenu>
        </div>
    );
}

export default Sidebar;