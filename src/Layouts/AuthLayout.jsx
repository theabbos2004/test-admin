import React from 'react'
import {AuthImage} from "../assets/images"
import { Outlet } from 'react-router-dom'
export default function AuthLayout() {
  return (
    <section className='container min-h-screen mx-auto flex'>
      <div
        className='w-2/3 flex justify-center items-center'
      >
        <img src={AuthImage} className=' w-full'/>
      </div>
      <div className='w-2/6 flex justify-center items-center'>
        <Outlet/>
      </div>
    </section>
  )
}
