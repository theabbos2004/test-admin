import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../lib/validation";
import Input from "./Input";
import Button from "./Button";
import { useMainContext } from "../context/AuthContext";
import { getUser } from "../lib/actions/user";


export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const {setUser,checkUser}=useMainContext()
  const onSubmit = async (data) => {
    try{
      const {usename,password}=data
      const getUserRes=await getUser({usename,password})
      if(!getUserRes.success) throw Error(getUserRes.error)
      setUser(getUserRes.data.object)
      sessionStorage.setItem("test",getUserRes.data.token)
      sessionStorage.setItem("user",JSON.stringify(getUserRes.data.object))
      checkUser()
      navigate("/");
    }
    catch(error){
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-3/5">
      <div>
        <Input {...register("usename")} placeholder="Foydalanuvchi Nomi" className={"w-full"}/>
        {errors.email && <p style={{ color: "red" }}>{errors.usename.message}</p>}
      </div>

      <div>
        <Input type="password" {...register("password")} placeholder="Parol" className={"w-full"}/>
        {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
      </div>
      <Button type="submit">Tastiqlash</Button>
    </form>
  );
}
