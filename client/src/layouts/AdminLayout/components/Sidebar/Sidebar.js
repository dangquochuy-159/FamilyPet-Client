import { Link, NavLink } from 'react-router-dom';
import './Sidebar.scss'
import { images } from '~/assets'
import { NavItem, NavMenu } from '~/components/NavMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat, faChartLine, faCircleInfo, faGift, faPaste, faPenNib, faRectangleList, faRightFromBracket, faUser, } from '@fortawesome/free-solid-svg-icons';


function Sidebar() {
    return (
        <div className="wrapper--sidebar w-2/12 h-screen fixed top-0 left-0 ">
            <div className='w-full logo--admin border-b-2 border-solid border-black'>
                <img src={images.logo_admin} alt='logo admin' />
            </div>
            <NavMenu className='flex flex-col '>
                <NavItem to='/admin/dashboard' title='Thống kê' className=' py-4 px-6' icon={<FontAwesomeIcon icon={faChartLine} />} />
                <NavItem to='/admin/user' title='Khách hàng' className=' py-4 px-6' icon={<FontAwesomeIcon icon={faUser} />} />
                <NavItem to='/admin/evaluate' title='Đánh giá' className=' py-4 px-6' icon={<FontAwesomeIcon icon={faPenNib} />} />
                <NavItem to='/admin/Promote' title='Khuyến mãi' className=' py-4 px-6' icon={<FontAwesomeIcon icon={faGift} />} />
                <NavItem to='/admin/order' title='Đơn đặt hàng' className=' py-4 px-6' icon={<FontAwesomeIcon icon={faPaste} />} />
                <NavItem to='/admin/product' title='Sản phẩm' className=' py-4 px-6' icon={<FontAwesomeIcon icon={faCat} />} />
                <NavItem to='/admin/category' title='Danh mục sản phẩm' className=' py-4 px-6' icon={<FontAwesomeIcon icon={faRectangleList} />} />
                <NavItem to='/admin/info' title='Thông tin quản trị viên' className=' py-4 px-6' icon={<FontAwesomeIcon icon={faCircleInfo} />} />
                <NavItem to='/login-admin' title='Log-out' className='w-full absolute bottom-0 left-0 py-4 px-6 ' icon={<FontAwesomeIcon icon={faRightFromBracket} />} />
            </NavMenu>
        </div>
    );
}

export default Sidebar;