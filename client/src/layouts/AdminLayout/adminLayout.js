import PropTypes from 'prop-types'
import { Sidebar } from './components';
import AdminContext from '~/context/AdminContext';

import './AdminLayout.scss'
import { useEffect, useState } from 'react';

function AdminLayout({ children }) {

    const data = JSON.parse(window.localStorage.getItem('adminLogin')).data
    const value = {
        avatar: `${process.env.REACT_APP_API_URL}/api/admins/${data.admin.id}/${data.admin.avatar}`,
        name: data.admin.full_name
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