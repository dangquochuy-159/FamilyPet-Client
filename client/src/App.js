import { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { privateRoutes, publicRoutes, LoginRoutes } from '~/routes'


function App() {

  let checkLogin = window.sessionStorage.getItem('adminLogin')

  const LoginAdmin = () => <Navigate to="/login-admin" />;
  const LoginCustomer = () => <Navigate to="/login" />;
  const ToDashboard = () => <Navigate to="/admin/dashboard" />;

  return (
    <Router>
      <div className="App">
        <div id='block-loading' className='hidden w-full h-full bg-black bg-opacity-20 fixed top-0 left-0 z-50'>
          <div className="lds-dual-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <Routes >
          {/* Routes Customer */}
          {
            publicRoutes.map((route, index) => {
              let Layout = route.layout === null ? Fragment : route.layout
              let Page = route.page
              let element = <Layout> <Page /> </Layout>
              if (route.required_login) {
                element = checkLogin ? element : <LoginCustomer />
              }
              return <Route key={index} path={route.path} element={element} />
            })
          }
          {/* Routes Admin */}
          {
            privateRoutes.map((route, index) => {
              let Layout = route.layout === null ? Fragment : route.layout
              let Page = route.page
              let element = <Layout> <Page /> </Layout>
              element = checkLogin ? element : <LoginAdmin />
              element = route.path === '/admin' ? <ToDashboard /> : element
              return <Route key={index} path={route.path} element={element} />
            })
          }
          {/* Routes Login */}
          {
            LoginRoutes.map((route, index) => {
              let Layout = route.layout === null ? Fragment : route.layout
              let Page = route.page
              let element = <Layout> <Page /> </Layout>
              return <Route key={index} path={route.path} element={element} />
            })
          }
        </Routes>
      </div>
    </Router>
  );
}

export default App;
