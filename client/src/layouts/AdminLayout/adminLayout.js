import PropTypes from 'prop-types'
import { Sidebar } from './components';
import AdminContext from '~/context/AdminContext';

import './AdminLayout.scss'

function AdminLayout({ children }) {
    let avatar = 'https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-Facebook-cute-cho-con-gai.jpg?ssl=1'
    let name = "Kiều Oanh"
    const value = {
        avatar, name
    }
    return (
        <AdminContext.Provider value={value}>
            <div className='wrapper h-screen flex flex-col' >
                <Sidebar />

                <div className='wrapper--content w-10/12 h-full fixed top-20 right-0 p-2'>
                    <div className='content h-full overflow-auto'>
                        {children}
                    </div>
                </div>
            </div>
        </AdminContext.Provider>
    );
}

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AdminLayout;