import React from 'react'
import { Link } from 'react-router-dom'

function Recommendation() {
  return (
    <div className='flex flex-col items-center gap-[25px] pt-[239px]'>
        <h1 className='text-[32px]'>Discover Your Ideal Career Path</h1>
        <p className='text-[#6B7280] text-[18px] text-center'>Take our 5-minute assessment to get personalized career recommendations based on your interests and strengths</p>
        <Link to='/result' className='bg-[#2563EB] text-white px-[20px] text-[20px] py-[15px] rounded-[10px] cursor-pointer'>Begin Recommendation</Link>
        <p className='text-[#6B7280] text-[15px] text-center'>No personal information required</p>
    </div>
  )
}

export default Recommendation