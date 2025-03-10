import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

function LoginTest() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const baseurl = 'https://recommendation-system-7a8m.onrender.com/login'
    const loginApi = async(e)=>{
        e.preventDefault()
    try {
        const responds = await fetch(baseurl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        })
        const data = await responds.json();
        if(responds){
            toast.success(data.message)
            console.log(data.message)
        }
    } catch (error) {
        console.log(error)
        toast.error("unable to login, check your internet connection")
    }
    }
  return (
    <div>
      <input type="text" name ="emai" value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder='email' id="" />
      <input type="text" name ="password" onChange={(e)=>setPassword(e.target.value)}  value={password} placeholder='password'  id="" />
      <button onClick={loginApi}>Submit</button>
    </div>
  )
}

export default LoginTest
