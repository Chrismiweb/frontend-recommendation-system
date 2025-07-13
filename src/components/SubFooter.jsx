import React from 'react'
import { Link } from 'react-router-dom'
function SubFooter() {
  return (
    <div className='bg-[#2563EB] w-full py-[40px] md:py-[60px] lg:py-[80px] justify-center items-center gap-[20px] md:gap-[25px] lg:gap-[32px] flex flex-col'>
        <p className='text-[7vw] md:text-[4vw] lg:text-[2.3vw] font-bold text-white text-center w-[80%]'>Looking for a University Near You?</p>
        <p className='text-white lg:text-[1vw] md:text-[2.3vw] text-[4vw] w-[85%] text-center'>Explore universities that match your interests, career goals, and location. </p>
        <Link to='/dashboard'>
        <button className='lg:px-[24px] lg:py-[16px] md:px-[25px] md:py-[15px] px-[20px] py-[13px] bg-[white] lg:text-[1vw] md:text-[2.2vw] text-[4vw] font-semibold rounded-[30px] :rounded-full text-[#2563EB] cursor-pointer'>Explore Universities</button>
        </Link>

        <div className='flex gap-[15px] md:gap-[25px] lg:gap-[32px] w-[90%] items-center justify-center'>
            <div className='w-[120px] h-[50px] overflow-hidden'>
                <img src="/image/unilorin.png" className='w-full h-full object-fill' alt="" />
            </div>
            <div className='w-[120px] h-[50px] overflow-hidden'>
                <img src="/image/unilag.png" className='w-full h-full object-fill' alt="" />
            </div>
            <div className='w-[120px] h-[50px] overflow-hidden'>
                <img src="/image/uniabuja.png" className='w-full h-full object-fill' alt="" />
            </div>
        </div>
    </div>
  )
}

export default SubFooter