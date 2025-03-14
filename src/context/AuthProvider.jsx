// import { createContext, useContext, useState, useEffect } from "react";
// import { toast } from "react-toastify"; // Import toast for better messages

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   // ameer code 
//   // const [user, setUser] = useState(() => {
//   //   try {
//   //     return JSON.parse(localStorage.getItem("user")) || null;
//   //   } catch (error) {
//   //     console.error(" Error parsing localStorage user:", error);
//   //     return null;
//   //   }
//   // });

//   const [loading, setLoading] = useState(false);

//   // my test code 
//   const[user, setUser] = useState(()=>{
//       const username = localStorage.getItem("theusername")

//       return username ? {theusername :username} : null
//   })

// // ameer code 
//   // useEffect(() => {
//   //   if (user) {
//   //     localStorage.setItem("user", JSON.stringify(user));
//   //   } else {
//   //     localStorage.removeItem("user");
//   //   }
//   // }, [user]);

//   // my test code 
//   useEffect(() => {
//     if(user){
//       localStorage.setItem("theusername". user.userName)
//     }
//     else{
//       localStorage.removeItem("theusername")
//     }
//   }, [user])
  





//   // login user

//   // const login = async (email, password) => {
//   //   setLoading(true);
//   //   try {
//   //     const response = await fetch("https://recommendation-system-7a8m.onrender.com/login", {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify({ email, password }),
//   //     });

//   //     const data = await response.json();

//   //     if (!response.ok) {
//   //       throw new Error(data.message || " Invalid login credentials");
//   //     }

//   //     // setUser(data.user);
//   //     setUser(data.existingUser)
//   //     toast.success("✅ Login Successful!");
//   //     localStorage.setItem("token", user.token ) //store user token
//   //     return { success: true };
//   //   } catch (error) {
//   //     toast.error(` ${error.message}`);
//   //     return { success: false, message: error.message };
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };


//   // signup our users 
//   const signup = async (formData) => {
//     setLoading(true);
//     try {
//       const response = await fetch("https://recommendation-system-7a8m.onrender.com/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData), // Sending confirmPassword too
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || " Signup failed");
//       }

//       setUser(data.user);
//       toast.success("✅ Signup Successful!");
//       return { success: true };
//     } catch (error) {
//       toast.error(` ${error.message}`);
//       return { success: false, message: error.message };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // logout our users
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token") // remove user token
//     toast.info("🔔 Logged out successfully");
//   };

//   return (
//     <AuthContext.Provider value={{ user, signup, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);




import React, { useEffect, useState, createContext } from 'react'

export const AuthContext = createContext();


export default function AuthProvider({children}) {
  const [user, setUser] = useState(()=>{
    const username = localStorage.getItem("")
    return username ? {theUsername : username} : null 
  })
 
  useEffect(()=>{
    if(user){
      localStorage.setItem("theUsername", user.existingUser)
    }
    else{
      localStorage.removeItem("theUsername")
    }
  }, [user])

  return (
    <AuthContext.Provider value={{user, setUser}}>
        {children}
    </AuthContext.Provider>
  )
}
