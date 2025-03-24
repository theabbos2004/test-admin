import React, { useEffect, useState } from 'react'
import {AddCardForm, Button, Card, SideBar} from '../components'
import { createTest, delTest, getTestByGroup, updateTest } from '../lib/actions/test'
import { useMainContext } from '../context/AuthContext'
import { createOption, updateOption } from '../lib/actions/option'

export default function Home() {
  const [tests,setTests]=useState()
  const [selectTest,setSelectTest]=useState()
  const [selectGroup,setSelectGroup]=useState()
  const {token}=useMainContext()
  
  useEffect(()=>{
    if(selectGroup?.id){
      (async()=>{
        const getTestByGroupRes=await getTestByGroup({groupId:selectGroup.id,token})
        if(getTestByGroupRes.data){
          setTests(getTestByGroupRes.data.object)
        }
      })()
    }
  },[selectGroup])
  const [addCollapse,setAddCollapse]=useState(false)
  const [copied, setCopied] = useState(false);
  const submit=async(data)=>{
    try{
      const {question,optionEntities}=data
      if(selectTest){
        const updateTestRes=await updateTest({token, question, groupId:selectTest?.testEntity?.groupId,testId:selectTest?.testEntity?.id,correct:true})
        if(!updateTestRes.data)throw Error(updateTestRes.error)
        optionEntities && optionEntities.forEach(async (element) => {
          if(element?.$id){
            const updateOptionRes=await updateOption({token, optionText:element?.optionText,correct:element?.correct,testId:updateTestRes.data.object.id,optionId:element?.$id})
            if(!updateOptionRes.data){
              throw Error(updateOptionRes.error)
            }
          }
          else{
            const createOptionRes=await createOption({token, optionText:element?.optionText,correct:element?.correct,testId:updateTestRes.data.object.id})
            if(!createOptionRes.data){
              throw Error(createOptionRes.error)
            }
          }
        })
      }
      else{
        const createTestRes=await createTest({token, question, groupId:selectGroup?.id,correct:true})
        if(!createTestRes.data)throw Error(createTestRes.error)
        optionEntities && optionEntities.forEach(async (element) => {
        const createOptionRes=await createOption({token, optionText:element?.optionText,correct:element?.correct,testId:createTestRes.data.object.id})
        if(!createOptionRes.data){
          await delTest({testId:createTestRes.data.object.id})
          throw Error(createOptionRes.error)
        }
        });
      }
      setSelectTest(null)
      return {success:true}
    }
    catch(error){
      return {success:false,error}
    }
  }
  const handleDelete=async (test)=>{
    try{
      const delTestRes=await delTest({testId:test.testEntity.id})
      if(!delTestRes.data)throw Error(delTestRes.error)
    }
    catch(error){
      console.log(error);
    }
  }
  const selectTestFunc=async (test)=>{
    try{
      test.optionEntities.map(option=>{
        option.$id=option.id
        delete option.id
        return option
      })
      setSelectTest(test)
      setAddCollapse(true)
    }
    catch(error){
      console.log(error);
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(selectGroup?.connectionId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return (
    <div>
      <div className='relative container mx-auto h-screen flex'>
          <SideBar className={"w-[20%]"} setSelectGroup={setSelectGroup} />
          <div className='w-[80%] h-full'>
            <div className='w-full h-16 flex items-center justify-between px-5 border-b-2'>
              <h1>Natijalar doskasi</h1>
              <Button className={"min-w-40"} onClick={()=>setAddCollapse(true)} disabled={selectGroup?.id?false:true}>Qo'shish</Button>
            </div>
            <div className='w-full p-5 h-[calc(100%-4rem)] overflow-hidden'>
              <h1 className='flex gap-2' >
                {copied 
                  ? "Copied!" 
                  :<div>ID:<span onClick={(e)=>copyToClipboard(e)}>{selectGroup?.connectionId}</span></div>}
                </h1>
              <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 h-full overflow-y-scroll p-5'>
                {
                  tests && tests?.map((test,indx)=>(
                    <Card key={indx} test={test} handleDelete={handleDelete} setAddCollapse={setAddCollapse} setSelectTest={selectTestFunc}/>
                  ))
                }
              </div>
            </div>
          </div>
      </div>
      <div className={`absolute top-0 left-0 w-full h-full z-[1] bg-[rgba(0,0,0,0.2)] backdrop-blur-sm justify-center items-center ${addCollapse?"flex":"hidden"}`}>
        <AddCardForm 
          closeFunc={()=>setAddCollapse(false)} 
          submit={submit} 
          defaultValues={selectTest 
            ? { question: selectTest?.testEntity?.question, optionEntities: selectTest?.optionEntities}
            : { question: "", optionEntities: [{ optionText: "", correct: false }] }}
          />
      </div>
    </div>
  )
}