import React from 'react'

export default function Button({className,children,...props}) {
  return (
    <button 
        className={`bg-[var(--color-blue-1)] rounded-sm p-2 px-4 outline-none text-gray-50 cursor-pointer ${className}`}
        {...props}
        >
        {children}
    </button>
  )
}
