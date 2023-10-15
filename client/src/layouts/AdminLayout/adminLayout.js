import PropTypes from 'prop-types'
import { Sidebar } from './components';
import AdminContext from '~/context/AdminContext';
import './AdminLayout.scss'
import { useState } from 'react';

function AdminLayout({ children }) {
    const dataAdmin = JSON.parse(window.sessionStorage.getItem('adminLogin')).data.admin

    return (
        <AdminContext.Provider value={[dataAdmin]}>
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