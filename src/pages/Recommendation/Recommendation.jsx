import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar';
import { HiOutlineMenuAlt3 } from "react-icons/hi"


function Recommendation() {
   const [showSidebar, setShowSidebar] = useState(false)
  
  
    //   handle display sidebar
          const handleDisplaySidebar = () => {
              setShowSidebar(true); // open sidebar
          };
  
          const handleCloseSidebar = () => {
              setShowSidebar(false); // close sidebar
          };
  return (
    <div className='flex flex-col pt-[30px] gap-[20vh] lg:pt-[239px]'>
        <div className='flex lg:hidden w-full justify-end'>
            <div>
                {!showSidebar && (
                    <button onClick={handleDisplaySidebar} className='text-[9vw] md:text-[6vw]'>
                    <HiOutlineMenuAlt3 />
                    </button>
                )}
            </div>
            {/* Mobile sidebar */}
              {showSidebar && (
                  <Sidebar onClose={handleCloseSidebar} />
              )}
        </div>
        <div className='flex flex-col items-center gap-[25px] '>
            <h1 className='md:text-[4vw] lg:text-[2vw] text-[6vw] text-center'>Discover Your Ideal Career Path</h1>
            <p className='w-[90%] lg:w-[60%] text-[#6B7280] text-center md:text-[2.3vw] lg:text-[1.3vw] text-[4.5vw]'>Take our 5-minute assessment to get personalized career recommendations based on your interests and strengths</p>
            <Link to='/result' className='bg-[#2563EB] text-white px-[20px] md:text-[2.1vw] lg:text-[1.1vw] text-[4.2vw] py-[15px] text-center rounded-[10px] cursor-pointer'>Begin Recommendation</Link>
            <p className='text-[#6B7280] text-[15px] text-center'>No personal information required</p>
        </div>
    </div>
  )
}

export default Recommendation