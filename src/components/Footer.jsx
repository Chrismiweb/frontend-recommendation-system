import React from 'react'

function Footer() {
    const date = new Date().getFullYear()
  return (
    <div className='bg-[#111827] py-[64px] px-[32px] w-full flex flex-col gap-[48px]'>
        <div className='w-full gap-[400px] flex text-white   '>
            <div className='w-[30%] justify-start items-start flex flex-col gap-[24px]'>
                <div className='flex justify-center items-center gap-[5px]'>
                    <div className='bg-[#2563EB] h-[32px] w-[32px] flex justify-center items-center text-[20px] rounded-[8px] font-bold text-white'>E</div>
                    <p className='text-[20px] font-black text-white'>EduPath</p>
                </div>
                <p className='text-[#9CA3AF] lg:text-[1vw] md:text-[2.3vw] text-[4vw]'>We’re dedicated to empowering Nigerian students with the tools and knowledge they need to make confident decisions about their future. Whether you're uncertain about what course to study, which university to attend, or what career path to follow, our platform is designed to guide you every step of the way. Using smart matching technology, easy-to-understand insights, and a student-first approach, we simplify the journey to higher education — making it more accessible, personalized, and stress-free.</p>
            </div>

            <div className='flex gap-[150px] mt-[50px]  '>
                <div className='flex flex-col gap-[10px]'>
                    <h4 class="mb-2 text-[23px] font-bold">Learn More</h4>
                    <p className='lg:text-[1vw] md:text-[2.3vw] text-[4vw] text-[#9CA3AF] cursor-pointer font-semibold'>How it Works</p>
                    <p className='lg:text-[1vw] md:text-[2.3vw] text-[4vw] text-[#9CA3AF] cursor-pointer font-semibold'>Why Choose Us</p>
                    <p className='lg:text-[1vw] md:text-[2.3vw] text-[4vw] text-[#9CA3AF] cursor-pointer font-semibold'>About</p>
                </div>

                <div className='flex flex-col gap-[10px]'>
                    <h4 class="mb-2 text-[23px] font-bold">Account</h4>
                    <p className='lg:text-[1vw] md:text-[2.3vw] text-[4vw] text-[#9CA3AF] cursor-pointer font-semibold'>Register</p>
                    <p className='lg:text-[1vw] md:text-[2.3vw] text-[4vw] text-[#9CA3AF] cursor-pointer font-semibold'>Login</p>
                </div>

                <div className='flex flex-col gap-[10px]'>
                    <h4 class="mb-2 text-[23px] font-bold">Explore</h4>
                    <p className='lg:text-[1vw] md:text-[2.3vw] text-[4vw] text-[#9CA3AF] cursor-pointer font-semibold'>Dashboard</p>
                    <p className='lg:text-[1vw] md:text-[2.3vw] text-[4vw] text-[#9CA3AF] cursor-pointer font-semibold'>Career Recommendation</p>
                    <p className='lg:text-[1vw] md:text-[2.3vw] text-[4vw] text-[#9CA3AF] cursor-pointer font-semibold'>Explore Courses</p>
                    <p className='lg:text-[1vw] md:text-[2.3vw] text-[4vw] text-[#9CA3AF] cursor-pointer font-semibold'>Explore Universities</p>
                </div>
            </div>
        </div>

        <div className='h-[1px] w-[100%] bg-[#9CA3AF]'></div>

        <div className='w-full flex justify-center items-center'>
            <p className='text-[#9CA3AF] font-semibold text-[20px]'>© {date} EduPath. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer