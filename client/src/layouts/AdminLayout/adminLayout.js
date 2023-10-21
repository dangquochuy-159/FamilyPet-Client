import PropTypes from 'prop-types'
import AdminContext from '~/context/AdminContext';
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
            <div className='wrapper h-screen flex flex-col' >
                <Sidebar />
                <div className='wrapper--content sm:w-full sm:!px-0 sm:pt-0 md:w-11/12 w-10/12 h-screen fixed top-0 right-0 px-2 bg-[var(--bg-content-admin)]'>
                    <Header title={titleHeader || 'Thống kê'}
                        avatar={connectServer && adminLogin.avatar}
                        name={connectServer && adminLogin.full_name}
                        id={connectServer && adminLogin._id}
                    />
                    <div className="wrapper-page sm:!pb-0 flex flex-col w-full pb-2 overflow-auto
                                   h-[var(--page-admin-height)] mt-[var(--header-admin-height)]"
                    >
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