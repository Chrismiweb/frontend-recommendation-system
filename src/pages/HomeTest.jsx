// import React, { useContext, useEffect } from 'react'
// import { UserContext } from '../context/UserAuth'
// import { useNavigate } from 'react-router-dom'

// function HomeTest() {
//     const navigate = useNavigate();
//     const {user, setUser} = useContext(UserContext)

//     useEffect(() => {
//      if(user){
//         console.log("welcome " , user.userName)
//      }
//     }, [user])

//     const handleLogout =() =>{
//         localStorage.removeItem("token")
//         setUser(null)
//         navigate('/login')
//     }
    
//   return (
//     <div className='flex flex-col'>
//         <p>
//       {/* welcome {user ?  user.userName : "Guest"} */}
//       Welcome {user && user.userName ? user.userName : "Guest"}
//         {/* welcome {guest.userName} */}
//         </p>

//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   )
// }

// export default HomeTest


import React from 'react'

function HomeTest() {
  return (
    <div>
      
    </div>
  )
}

export default HomeTest
