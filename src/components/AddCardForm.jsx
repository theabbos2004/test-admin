import React, { useEffect, useState } from 'react'
import {Button, Input} from '../components'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { AddTestSchema } from '../lib/validation';

export default function AddCardForm({closeFunc,submit,defaultValues}) {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
        setValue,
        watch,
      } = useForm({
        resolver: zodResolver(AddTestSchema),
        defaultValues,
        shouldUnregister: true,
      });
      useEffect(() => {
        if (defaultValues) {
          reset(defaultValues);
        } else {
          reset({ question: "", optionEntities: [{ optionText: "", correct: false}] });
        }
      }, [defaultValues, reset]);
      const [loading, setLoading] = useState(false);
      const { fields, append, remove } = useFieldArray({
        control,
        name: "optionEntities",
      });
      const onSubmit = async (data) => {
        setLoading(true);
        try {
            const updatedData = {...data}
            for (let i = 0; i < data?.optionEntities?.length; i++) {
              updatedData.optionEntities[i]={
                ...data?.optionEntities[i],
                $id:defaultValues?.optionEntities[i]?.$id ? defaultValues.optionEntities[i].$id:null
              }
            }
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
                {...register("question")}
                placeholder="Savol"
                className={"w-full text-center bg-transparent"}
                />
        </div>
        {errors.question && <p className="text-red-500 text-sm">{errors.question.message}</p>}
        <ul className='w-full flex flex-col gap-2'>
            {fields?.map((field, index) => (
                <div
                    key={index}
                >
                    <div 
                        className={`w-full flex items-center rounded-md text-gray-900 ${false ? "!bg-[var(--color-green)]":"!bg-[var(--color-gray-1)]"}`}>
                            <div className={"w-[15%] text-center flex justify-center items-center bg-transparent border-r-1 border-gray-900"}>A</div>
                            <Input 
                                {...register(`optionEntities.${index}.optionText`)}
                                placeholder="Javob" 
                                className={"w-[65%] text-center flex justify-center items-center bg-transparent rounded-none"}/>
                            <div className='w-[15%] flex gap-2 justify-between items-center'>
                                <Controller
                                    name={`optionEntities.${index}.correct`}
                                    control={control}
                                    render={(fieldCorrect) => (
                                        <input
                                        type="checkbox"
                                        checked={Boolean(fieldCorrect.field.value)}
                                        onChange={(e) => {
                                          setValue(`optionEntities.${index}.correct`, e.target.checked)
                                        }}
                                        className="w-5 h-5"
                                        />
                                    )}
                                    />
                                <Button
                                    onClick={() => {
                                        setValue("optionEntities", watch("optionEntities").filter((_, i) => i !== index));
                                        remove(field?.id)
                                    }}
                                    className="bg-red-500 text-white rounded text-2xl !p-1 leading-none"
                                    >
                                    ×
                                </Button>
                            </div>
                    </div>
                     {errors.optionEntities?.[index] && <p className="text-red-500 text-sm">{errors.optionEntities[index]?.optionText?.message} va {errors.optionEntities[index]?.variant?.message}</p>}
                </div>
            ))}
        </ul>
        {errors.optionEntities?.root?.message && <p className="text-red-500 text-sm">{errors.optionEntities.root.message}</p>}
        <Button 
             onClick={() => append({ variant: "", optionText: "", correct: false })}>Variant Qo'shish</Button>
        <div className='flex justify-end gap-5'>
            <Button className={"bg-[var(--color-red)]"} onClick={()=>{
                reset({question: "", optionEntities: [{ optionText: "" }]})
                closeFunc()}}>Yopish</Button>
            <Button  type="submit"  disabled={loading}>Tasdiqlash</Button>
        </div>
    </form>
  )
}
