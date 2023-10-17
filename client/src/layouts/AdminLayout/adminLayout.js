import PropTypes from 'prop-types'
import AdminContext from '~/context/AdminContext';
import './AdminLayout.scss'
import { Sidebar } from './components';
import { useEffect, useState } from 'react';

function AdminLayout({ children }) {
    const dataAdmin = JSON.parse(window.sessionStorage.getItem('adminLogin')).data.admin
    const [adminLogin, setAdminLogin] = useState(dataAdmin)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/admins/${dataAdmin._id}`)
            .then(res => res.json())
            .then(data => {
                setAdminLogin(data.data)
            })
            .catch(err => err.message);
    }, [])

    return (
        <AdminContext.Provider value={[adminLogin]}>
            <div className='wrapper h-screen flex flex-col ' >
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