import React from 'react'
import {Link} from 'react-router-dom'


function Hero() {
  return (
    <div className='flex-col md:flex-row flex w-full justify-center items-center gap-[50px] md:gap-[40px] py-[20px] lg:gap-[95px] md:py-[50px] lg:py-[90px]'>
        <div className='w-[90%] md:w-[40%] lg:w-[35%] flex flex-col gap-[15px] md:gap-[15px] lg:gap-[32px]'>
            <p className='lg:text-[2.7vw] md:text-[4vw] text-[9vw] font-bold w-[80%] md:w-[90%]'>Discover the Career That Fits You Best</p>
            <p className='lg:text-[1.1vw] md:text-[2vw] text-[4vw]'>Answer a few simple questions and get personalized career recommendations tailored to your strengths, interests, and academic background.</p>
            <Link to=''>
            <button className='lg:px-[24px] lg:py-[16px] md:px-[14px] md:py-[10px] px-[20px] py-[13px] bg-[#2563EB] lg:text-[1.1vw] md:text-[2vw] text-[4vw] font-semibold rounded-[30px] md:rounded-[20px] lg:rounded-full text-white cursor-pointer'>Get Recommendations</button>
          </Link>
        </div>

        <div className='w-[90vw] md:w-[45vw] lg:w-[40vw] rounded-[16px] overflow-hidden'>
            <img src="/image/student.jpg" className='w-full h-full object-fill ' alt="" />
        </div>
    </div>
  )
}

export default Hero