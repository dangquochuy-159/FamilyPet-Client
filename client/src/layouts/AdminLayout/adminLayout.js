import PropTypes from 'prop-types'
import AdminContext from '~/context/AdminContext';
import './AdminLayout.scss'
import { Header, Sidebar } from './components';
import { useEffect, useState } from 'react';

function AdminLayout({ children }) {
    const dataAdmin = JSON.parse(window.sessionStorage.getItem('adminLogin')).data.admin
    const titleHeader = window.sessionStorage.getItem('titleHeader')
    const [adminLogin, setAdminLogin] = useState(dataAdmin)
    const [connectServer, setConnectServer] = useState(false)


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/admins/${dataAdmin._id}`)
            .then(res => res.json())
            .then(data => {
                setAdminLogin(data.data)
                setConnectServer(true)

            })
            .catch(err => setConnectServer(false));
    }, [])

    return (
        <AdminContext.Provider value={[adminLogin]}>
            <div className='wrapper h-screen flex flex-col -z-10' >
                <Sidebar />
                <div className='wrapper--content w-10/12 h-screen fixed top-0 right-0 px-2'>
                    <Header title={titleHeader || 'Thống kê'}
                        avatar={connectServer && adminLogin.avatar}
                        name={connectServer && adminLogin.full_name}
                        id={connectServer && adminLogin._id}
                    />
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