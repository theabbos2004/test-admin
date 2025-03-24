import React from 'react'
import {Button} from '../components'

export default function Card({test,handleDelete,setSelectTest}) {
    const letter = ["A", "B", "C", "D", "E", "F"];
  return (
    <div className=' self-start flex flex-col gap-5 bg-[var(--color-gray)] p-5 rounded-lg'>
        <div className=' bg-[var(--color-gray-1)] rounded-md p-2'>
            <h1 className='text-center'>{test?.testEntity?.question}</h1>
        </div>
        <ul className='w-full flex flex-col gap-2'>
            {
                test?.optionEntities?.map((opt,indx)=>(
                    <Button key={indx} className={`w-full flex !p-0 !py-2 items-center rounded-md text-gray-900 ${opt.correct ? "!bg-[var(--color-green)]":"!bg-[var(--color-gray-1)]"}`}>
                        <h1 className='w-[20%] text-center flex justify-center items-center border-r-1 border-r-gray-50'>{letter[indx]}</h1>
                        <p className='w-[80%] text-center flex justify-center items-center'>{opt.optionText}</p>
                    </Button>
                ))
            }
        </ul>
        <div className='flex flex-col gap-2'>
            <Button className={"bg-[var(--color-red)]"} onClick={()=>handleDelete(test)}>O'chirish</Button>
            <Button onClick={()=>{setSelectTest(test)}}>O'zgartirish</Button>
        </div>
    </div>
  )
}
