import React from 'react'
import { GiBrain } from "react-icons/gi";
import { FaClock } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa";


function WhyChooseUs() {
    const steps = [
        {
            image: <GiBrain/>,
            header: "Smart Matching Technology",
            content: "We use intelligent algorithms to align your strengths with the right career path - no guesswork, just clarity."
        },
            {
            image: <FaClock/>,
            header: "Quick and Simple",
            content: "Answer a few questions, upload your result, and get insightful recommendations in minutes."
        },
            {
            image: <FaGraduationCap/>,
            header: "Student-Centric Design",
            content: "Built with students in mind — easy to use, visually engaging, and jargon-free."
        },
    ]
  return (
    <div className='w-full flex flex-col items-center bg-white py-[50px] md:py-[40px] lg:py-[80px] gap-[64px]'>
        <p className='text-[7vw] md:text-[4vw] lg:text-[2.5vw] font-bold'>Why Choose Us</p>

        <div className='flex flex-col lg:flex-row w-full justify-center items-center gap-[32px] '>
            {steps.map((s, index)=>(
                <div className='w-[90%] lg:w-[30%] bg-[#F9FAFB] rounded-[16px] pt-[36px] pb-[36px] lg:h-[250px] pl-[32px] pr-[50px] shadow-lg' key={index}>
                    <div>
                        <p className='text-[#2563EB] text-[7vw] md:text-[3.5vw] lg:text-[2.3vw] '>{s.image}</p>
                    </div>
                    <p className='mt-[24px] text-[5.5vw] md:text-[3vw] lg:text-[1.3vw] font-semibold'>{s.header}</p>
                    <p className='mt-[16px] lg:text-[1vw] md:text-[2.3vw] text-[4vw]'>{s.content}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default WhyChooseUs