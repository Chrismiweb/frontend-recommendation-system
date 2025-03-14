import React, { useState, useEffect, createContext } from 'react'

export const UserContext = createContext();


export default function UserAuth({children}) {
    const [user, setUser] = useState(()=>{
        const username = localStorage.getItem("username")
        return username ? { userName: username } : null;

    })

   useEffect(() => {
    if(user){
        localStorage.setItem("username", user.userName)
    }
    else{
        localStorage.removeItem("username")
    }
     
   }, [user])
   
  return (
    
    <UserContext.Provider value={{ user, setUser }}>
    {children}
  </UserContext.Provider>
  )
}
