import PropTypes from 'prop-types'
import { Sidebar } from './components';
import AdminContext from '~/context/AdminContext';

import './AdminLayout.scss'

function AdminLayout({ children }) {

    const data = JSON.parse(window.sessionStorage.getItem('adminLogin')).data
    const value = {
        admin: data.admin,
        avatar: `${process.env.REACT_APP_API_URL}/api/admins/${data.admin.id}/${data.admin.avatar}`,
        name: data.admin.full_name
    }

    return (
        <AdminContext.Provider value={value}>
            <div className='wrapper h-screen flex flex-col' >
                <Sidebar />
                <div className='wrapper--content w-10/12 h-screen fixed top-0 right-0 px-2'>
                    {children}
                </div>
            </div>
        </AdminContext.Provider>
    );
}

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AdminLayout;