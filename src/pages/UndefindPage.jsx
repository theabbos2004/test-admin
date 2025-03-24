import React from 'react'
import { NotFoundImage } from '../assets/images'

export default function UndefindPage() {
  return (
    <div className='w-screen h-screen overflow-hidden flex justify-center items-center'>
      <img
        alt='bg-image'
        src={NotFoundImage}
        className='h-full'
      />
    </div>
  )
}
