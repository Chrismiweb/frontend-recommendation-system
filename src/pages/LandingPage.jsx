import React from 'react'
import { Button } from "antd";
import { Link } from 'react-router-dom';

function LandingPage() {
    const date = new Date().getFullYear()
  return (
    <div className='background w-[100%]  items-center flex flex-col bg-[#F7A8C4]'>
        <div  className='w-[100%] h-screen gap-[30px]  items-center flex flex-col'>
            <div className='w-[100%] flex justify-between  px-[20px] py-[15px] items-center bg-transparent'>
                <p className='text-pink-600 font-semibold text-[18px] font-serif'>Career Recommendation System</p>
                <div className='flex gap-[20px]'>
                <Link to='/signup'>
                    <Button color="pink" variant="filled">
                        Sign Up
                    </Button>
                </Link>
                <Link to = "/login">
                    <Button color="pink" variant="solid">
                        Log In
                    </Button>
                </Link>
                </div>

            </div>
            <div className='w-[90%] gap-[30px] justify-center items-center flex flex-col'>
                <div className='w-[90%] flex flex-col gap-[20px]'>
                    <p className='text-center px-[150px] text-[15px] text-[#64748B]'>This platform analyzes your academic performance, interests, and market trends to provide personalized, AI-powered career recommendations. Make informed decisions and discover opportunities that align with your strengths.</p>
                    <div className='flex flex-col justify-center items-center'>
                        <p className='font-bold text-pink-600 text-[18px]'>How It Works:</p>
                        <p className='text-[14px] font-bold'>1️⃣ Sign Up/Login – Create an account.</p>
                        <p className='text-[14px] font-bold'>2️⃣ Enter Academic Details – Select subjects and grades or upload your O’Level result (WAEC, NECO, GCE).</p>
                        <p className='text-[14px] font-bold'>3️⃣ Get Recommendations – Click “Analyze” to receive the best course suggestions for higher education.</p>
                    </div>
                </div>
                <div className='w-[100%] justify-center items-center flex flex-col'>
                    <p className='text-[25px] font-bold text-pink-600'>Topic:</p>
                    <p className='text-[35px] font-semibold text-center px-[100px]'>Web-based Career Recommendation System</p>
                </div>
            </div>
            <div className='w-[90%] flex justify-center items-center gap-[20px]'>
                <div className='bg-white drop-shadow-xl cursor-pointer rounded-[20px] gap-[10px] outline-pink-600 outline-2 justify-center  flex flex-col px-[20px] h-[120px] w-[30%]'>
                    <p className='font-bold text-pink-600 text-[20px]'>Log In</p>
                    <div className='flex  flex-col'>
                        <p className='text-[#64748B] text-[15px]'>Username: Demo</p>
                        <p className='text-[#64748B] text-[15px]'> Password: Demo12345</p>
                    </div>
                </div>
                <div className='bg-white drop-shadow-xl cursor-pointer rounded-[20px] gap-[10px] outline-pink-600 outline-2 justify-center  flex flex-col px-[20px] h-[120px] w-[30%]'>
                    <p className='font-bold text-pink-600 text-[20px]'>Sign Up</p>
                    <div className='flex  flex-col'>
                        <p className='text-[#64748B] text-[13px]'>Sign up for career guidance and personalized recommendations today!</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='w-[100%] bg-pink-100 flex justify-center items-center py-[10px]'>
            <p>©{date} Career Recommendation System. All rights reserved.   Designed By Bitero Chrismi David</p>
        </div>
      
    </div>
  )
}

export default LandingPage
