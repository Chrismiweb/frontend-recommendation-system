// import React, { useContext, useState } from 'react'
// import { ToastContainer, toast } from 'react-toastify';
// import { useNavigate } from "react-router-dom";
// import { UserContext } from '../context/UserAuth';

// function LoginTest() {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const {setUser} = useContext(UserContext)
    

//     const baseurl = 'https://recommendation-system-7a8m.onrender.com/login'
//     const loginApi = async(e)=>{
//         e.preventDefault()
//     try {
//         const responds = await fetch(baseurl, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email, password }),
//         })
//         const data = await responds.json();
//         if(responds){
//             toast.success(data.message)
//             navigate("/home");
//             // console.log(data.message)
//             localStorage.setItem("token", data.token)
//             // console.log(data.token)
//             // console.log(data)
//             setUser(data.existingUser)

//         }
//     } catch (error) {
//         // console.log(error)
//         toast.error("unable to login, check your internet connection")
//     }
//     }
//   return (
//     <div className='w-[100%] h-screen justify-center items-center flex'>
//       <input type="text" name ="emai" value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder='email' id="" />
//       <input type="text" name ="password" onChange={(e)=>setPassword(e.target.value)}  value={password} placeholder='password'  id="" />
//       <button className='bg-pink-500' onClick={loginApi}>Submit</button>
//     </div>
//   )
// }

// export default LoginTest



import React from 'react'

function LoginTest() {
  return (
    <div>
      
    </div>
  )
}

export default LoginTest
