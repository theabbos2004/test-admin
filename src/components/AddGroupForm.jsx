import React, { useEffect, useState } from 'react'
import {Button, Input} from '.'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { AddGroupSchema } from '../lib/validation';

export default function AddGroupForm({closeFunc,submit,defaultValues}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
        reset
      } = useForm({
        resolver: zodResolver(AddGroupSchema),
        defaultValues,
        shouldUnregister: true,
      });
      
      useEffect(() => {
          if (defaultValues) {
            reset(defaultValues);
          } else {
            reset({name:'',testTime:""});
          }
        }, [defaultValues, reset]);
        
      const [loading, setLoading] = useState(false);

      const onSubmit = async (data) => {
        setLoading(true);
        try {
            const submitRes=await submit(data)
            if(!submitRes.success)throw Error(submitRes.error)
            closeFunc()
            reset()
        } catch (error) {
            setError("question", { type: "manual", message: error.message });
        } finally {
          setLoading(false);
        }
      };
      
  return (
    <form 
        className='w-2/5 flex flex-col gap-5 bg-[var(--color-gray)] p-5 rounded-lg'
        onSubmit={handleSubmit(onSubmit)}
        >
        <div className='bg-[var(--color-gray-1)] rounded-md p-2'>
            <Input 
                {...register("name")}
                placeholder="Guruh nomini kiriting"
                className={"w-full text-center bg-transparent"}
                />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div className='bg-[var(--color-gray-1)] rounded-md p-2'>
            <Input 
                {...register("testTime", { valueAsNumber: true })}
                type="number"
                placeholder="test vaqtini kiriting"
                className={"w-full text-center bg-transparent"}
                />
            {errors.testTime && <p className="text-red-500 text-sm">{errors.testTime.message}</p>}
        </div>
        <div className='flex justify-end gap-5'>
            <Button className={"bg-[var(--color-red)]"} onClick={()=>{
                reset()
                closeFunc()}}>Yopish</Button>
            <Button type="submit" disabled={loading}>Tasdiqlash</Button>
        </div>
    </form>
  )
}
