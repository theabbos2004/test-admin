import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthLayout, RootLayout } from './Layouts'
import {LoginForm, Snipper} from './components'
import { UndefindPage } from './pages'
import Home from './pages/Home'
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Suspense fallback={<Snipper/>}><RootLayout/></Suspense>}>
          <Route index element={<Suspense fallback={<Snipper/>}><Home/></Suspense>}/>
        </Route>
        <Route path="/auth" element={<Suspense fallback={<Snipper/>}><AuthLayout/></Suspense>}>
          <Route path='login' element={<Suspense fallback={<Snipper/>}><LoginForm/></Suspense>}/>
        </Route>
        <Route path='*' element={<UndefindPage/>}/>
      </Routes>
    </>
  )
}

export default App
