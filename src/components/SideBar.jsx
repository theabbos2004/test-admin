import React, { useEffect, useState } from "react";
import Button from "./Button";
import AddGroupForm from "./addGroupForm";
import { createGroup, delGroup, getGroupByUserId, updateGroup } from "../lib/actions/group";
import { useMainContext } from "../context/AuthContext";

export default function SideBar({ className, setSelectGroup }) {
  const [addCollapse, setAddCollapse] = useState(false);
  const [groups, setGroups] = useState(false);
  const { token, user } = useMainContext();
  const [uGroup,setUGroup]=useState()
  console.log(uGroup);
  useEffect(() => {
    if (user) {
      (async () => {
        const getGroupAllRes = await getGroupByUserId({ token, user });
        if (getGroupAllRes?.data) {
          setGroups(getGroupAllRes.data.object);
        }
      })();
    }
  }, [user]);
  const submit = async (data) => {
    try {
        if(uGroup?.isOpen){
            const createGroupRes = await updateGroup({
              name: data?.name,
              token,
              creatorId:uGroup?.group?.creatorId,
              groupId:uGroup?.group?.id
            }); 
            if (!createGroupRes.success) throw Error(createGroupRes.error);
        }
        else{
            const createGroupRes = await createGroup({
              name: data?.name,
              creatorId: user?.id,
              testTime:data?.testTime,
              token,
            });
            if (!createGroupRes.success) throw Error(createGroupRes.error);
        }
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
    finally{
        setAddCollapse(false)
    }
  };
  return (
    <div
      className={`flex flex-col items-center gap-2 w-2/12 px-5 h-full border-r-2 ${className}`}
    >
      <h1 className="capitalize text-2xl h-16 flex items-center">Logo</h1>
      <Button
        className={"w-[calc(100%-1rem)] mr-[1rem]"}
        onClick={() => {
          setAddCollapse(true);
        }}
      >
        Qo'shish
      </Button>
      <ul className="w-full flex flex-col gap-2 overflow-auto pr-2 scrollbar-transparent vo">
        {groups &&
          groups?.map((group, index) => (
            <li key={index}>
              <Button
                className={"flex justify-between items-center w-full !bg-[var(--color-blue)] text-gray-950"}
                onClick={() => {
                  setSelectGroup(group);
                }}
              >
                <h1 className=" w-[90%]">
                    {group.name}
                </h1>
                <div className="flex flex-col">
                    <div onClick={(e)=>{
                        e.stopPropagation()
                        setUGroup({isOpen:true,group})
                        setAddCollapse(true)
                        }}>u</div>
                    <div onClick={(e)=>{
                        e.stopPropagation()
                        delGroup({groupId:group.id})
                        }}>d</div>
                </div>
              </Button>
            </li>
          ))}
      </ul>
      <div
        className={`absolute top-0 left-0 w-full h-full z-[1] bg-[rgba(0,0,0,0.2)] backdrop-blur-sm justify-center items-center ${
          addCollapse ? "flex" : "hidden"
        }`}
      >
        {
            <AddGroupForm 
                closeFunc={() => setAddCollapse(false)} 
                submit={submit} 
                defaultValues={
                    uGroup
                    ?{
                        name:uGroup?.group?.name,
                        testTime:uGroup?.group?.testTime,
                    }
                    :{
                        name:"",
                        testTime:0
                    }
                }
                />
        }
      </div>
    </div>
  );
}
