import React from 'react'
import { LuFileQuestion } from "react-icons/lu";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { FaCalendarCheck } from "react-icons/fa";
function HowItWork() {
    const steps = [
        {
            image: <LuFileQuestion/>,
            steps: 'Step 1',
            header: "Answer a Quick Questionnaire",
            content: "Tell us about your interests, passions, and preferences. This helps us understand what drives you and where your strengths lie."
        },
         {
            image: <RiUploadCloud2Fill/>,
            steps: 'Step 2',
            header: "Upload Your Academic Results",
            content: "Share your subject grades or upload a snapshot of your results. This helps match you with careers that align with your academic performance."
        },
         {
            image: <FaCalendarCheck/>,
            steps: 'Step 3',
            header: "Get Personalized Career Recommendations",
            content: "Based on your responses, we’ll suggest career paths that fit you best—so you can move forward with confidence."
        },
    ]
  return (
    <div className='w-full flex flex-col items-center bg-[#F9FAFB] py-[30px] md:py-[40px] lg:py-[80px] gap-[40px] md:gap-[54] lg:gap-[64px]'>
        <p className='text-[7vw] md:text-[4vw] lg:text-[2.5vw] font-bold'>How it Works</p>

        <div className='flex flex-col lg:flex-row w-full justify-center items-center gap-[32px] '>
            {steps.map((s, index)=>(
                <div className='w-[90%] lg:w-[30%] bg-white rounded-[16px] pt-[36px] pb-[36px] lg:h-[310px] pl-[32px] pr-[50px] shadow-lg' key={index}>
                    <div>
                        <p className='text-[#2563EB] text-[7vw] md:text-[3.5vw] lg:text-[2.3vw] '>{s.image}</p>
                    </div>
                    <p className='text-[#2563EB] text-[18px] md:text-[20px] lg:text-[16px] mt-[24px] font-semibold'>{s.steps}</p>
                    <p className='mt-[8px] text-[5.5vw] md:text-[3vw] lg:text-[1.3vw] font-semibold'>{s.header}</p>
                    <p className='mt-[18px] lg:text-[1vw] md:text-[2.3vw] text-[4vw]'>{s.content}</p>
                    
                </div>
            ))}
        </div>
    </div>
  )
}

export default HowItWork