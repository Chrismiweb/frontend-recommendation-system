import React from 'react'
import { FaGithubSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";

function Developer() {
  return (
    <div id='about' className='flex flex-col justify-center items-center py-[40px] md:py-[80px] gap-[32px] bg-[#0D2B56]'>
        <p className='text-[7vw] md:text-[4vw] lg:text-[2.5vw] w-[80%] font-bold text-center  text-white'>Made by Student, for Nigerian Students</p>
        <div className='lg:w-[8vw] lg:h-[8vw] md:w-[15vw] md:h-[15vw] w-[25vw] h-[25vw] bg-amber-300 rounded-full overflow-hidden'>
            <img src="/image/me.JPG" className='w-full h-full object-fill' alt="" />
        </div>
        <div className='w-[90%] lg:w-[50%] text-center flex flex-col gap-[8px]'>
            <p className='lg:text-[1.1vw] md:text-[2.3vw] text-[4vw] text-white font-semibold'>Hi, I'm Chrismi, a Computer Science student and Software Engineer with over 3 years of experience building websites, applications, and software. </p>
            <p className='lg:text-[1.1vw] md:text-[2.3vw] text-[4vw] text-white font-semibold'>I created this platform because I once faced the same challenge many students do: figuring out the right career path and what course to study at the university.</p>
            <p className='lg:text-[1.1vw] md:text-[2.3vw] text-[4vw] text-white font-semibold'>This software is designed to guide Nigerian students who want to further their education by recommending the most suitable career, course, and university all based on their interests, academic background, and goals.</p>
        </div>
        <div className='gap-[20px] flex'>
            <a href="">
                <p className='text-white lg:text-[2vw] md:text-[4.5vw] text-[7.5vw] cursor-pointer'><FaGithubSquare/></p>
            </a>
            <a href="">
                <p className='text-white lg:text-[2vw] md:text-[4.5vw] text-[7.5vw] cursor-pointer'><FaSquareInstagram/></p>
            </a>
            <a href="">
                <p className='text-white lg:text-[2vw] md:text-[4.5vw] text-[7.5vw] cursor-pointer'><FaTelegram/></p>
            </a>
        </div>
    </div>
  )
}

export default Developer