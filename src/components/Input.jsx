import React from 'react'

export default function Input({className,...props}) {
  
  return (
        <input 
          {...props} 
          className={`bg-[var(--color-blue)] rounded-sm p-2 outline-none text-[var(--color-blue-1)] ${className}`}
          />
  )
}
