import React from 'react'
import { IoMdCheckmarkCircle } from "react-icons/io";

function Steps() {
    const work =[
        {
            icon: <IoMdCheckmarkCircle/>,
            content: "Answer quick questions about your interests."
        },
        {
            icon: <IoMdCheckmarkCircle/>,
            content: "Get career options tailored to your interests and subjects."
        },
         {
            icon: <IoMdCheckmarkCircle/>,
            content: "Find schools offering the right courses for your goals."
        },
        {
            icon: <IoMdCheckmarkCircle/>,
            content: "Explore opportunities by your preferred location."
        },
    ]
  return (
    <div id='how-it-works' className='flex flex-col-reverse lg:flex-row w-full justify-center items-center gap-[50px] bg-[#F9FAFB] py-[40px] md:py-[60px] lg:py-[80px]'>
        <div className='w-[90vw] lg:w-[35vw] lg:h-[30vw] md:h-[60vw] h-[70vw] overflow-hidden rounded-[16px] shadow-lg'>
            <video
                src="/video/howitworks.mp4"
                    // /video/howitworks.mp4
                className="w-full h-full object-fill"  
                autoPlay
                loop
                muted
                playsInline  
            >
                Sorry, your browser doesn’t support embedded videos.
            </video>
        </div>
        <div className='flex flex-col gap-[32px] lg:w-[30%] w-[90%]'>
            <p className='text-[7vw] md:text-[4vw] lg:text-[2vw] font-bold'>See How it Works</p>
            <div className='flex flex-col gap-[26px]'>
                {work.map((w, index)=>(
                    <div className='flex items-center gap-[16px]' key={index}>
                        <p className='text-[#2563EB]  lg:text-[1.5vw] md:text-[3.5vw] text-[5vw]'>{w.icon}</p>
                        <p className='lg:text-[1vw] md:text-[2.3vw] text-[4vw]'>{w.content}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Steps