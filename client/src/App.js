import { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '~/routes'


function App() {
  return (
    <Router>
      <div className="App">
        <Routes >
          {
            publicRoutes.map((route, index) => {

              let Layout = route.layout === null ? Fragment : route.layout
              let Page = route.page
              let element = <Layout> <Page /> </Layout>
              return (
                <Route key={index} path={route.path} element={element} />

              )
            })
          }

        </Routes>
      </div>
    </Router>
  );
}

export default App;
