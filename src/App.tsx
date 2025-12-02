import { BrowserRouter, Route, Routes } from 'react-router-dom'
import classes from './App.module.css'
import SidePane from './components/SidePane/SidePane'
import { routes } from './constants/utils'
import Home from './pages/home/home'
import MainWrapper from './wrappers/MainWrapper'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import ToastContainer from './components/Toast/ToastContainer'


function App() {

  return (
    <BrowserRouter>
      <div className={classes.container}>
        <ToastContainer />
        <SidePane />
        <MainWrapper>
          <Routes>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.signin} element={<Login />} />
            <Route path={routes.register} element={<Register />} />
          </Routes>
        </MainWrapper>
      </div>
    </BrowserRouter>
  )
}

export default App
