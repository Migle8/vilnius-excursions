
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import ExcursionPage from './pages/ExcursionPage'
import MyExcursionsPage from './pages/MyExcursionsPage'
import MyExcursionsInfoPage from './pages/MyExcursionInfoPage'

function App() {

  return (
    <>
      <Routes>
        <Route index element={<HomePage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/signup' element={<RegisterPage />}></Route>
        <Route path='/:id' element={<ExcursionPage />}></Route>
        <Route path='/myexcursions' element={<MyExcursionsPage />}></Route>
        <Route path='/myexcursions/:id' element={<MyExcursionsInfoPage />}></Route>
      </Routes>
    </>
  )
}

export default App
