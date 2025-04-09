import React from 'react'
import { Button } from "antd";
import { Link } from 'react-router-dom';

function LandingPage() {
    const date = new Date().getFullYear()
  return (
    <div className='background w-[100%]  items-center flex flex-col'>
        <div  className='w-[100%]  gap-[30px]  items-center flex flex-col'>
            <div className='w-[100%] flex  justify-between px-[20px] py-[15px] items-center bg-transparent'>
                <Link to="/"><p className='text-pink-600 font-semibold text-[14px] w-[50%] md:w-[100%] md:text-[22px] lg:text-[18px] font-serif'>Career Recommendation System</p></Link>
                <div className='flex md:flex-row flex-col gap-[20px]'>
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
            <div className='w-[90%] lg:mt-[30px] md:mt-[50px] gap-[30px] justify-center items-center flex flex-col'>
                <div className='w-[90%] flex flex-col gap-[20px]'>
                    <p className='text-center text-[17px] lg:px-[150px] md:text-[20px] lg:text-[18px] text-[#64748B]'>This platform analyzes your academic performance, interests, and market trends to provide personalized, AI-powered career recommendations. Make informed decisions and discover opportunities that align with your strengths.</p>
                    <div className='flex flex-col justify-center items-start lg:items-center'>
                        <p className='font-bold text-pink-600 text-[18px] mb-[10px]'>How It Works:</p>
                        <p className='text-[15px] md:text-[20px] lg:text-[16px] font-bold'>1️⃣ Sign Up/Login – Create an account.</p>
                        <p className='text-[15px] md:text-[20px] lg:text-[16px] font-bold'>2️⃣ Enter Academic Details – Select subjects and grades or upload your O’Level result (WAEC, NECO, GCE).</p>
                        <p className='text-[15px] md:text-[20px] lg:text-[16px] font-bold'>3️⃣ Get Recommendations – Click “Analyze” to receive the best course suggestions for higher education.</p>
                    </div>
                </div>
                <div className='w-[100%] justify-center items-center flex flex-col'>
                    <p className='text-[25px] font-bold text-pink-600'>Topic:</p>
                    <p className='text-[35px] md:text-[45px] lg:w-[80%] font-semibold text-center px-[100px]'>Web-based Career Recommendation System</p>
                </div>
            </div>
            <div className='w-[90%] flex flex-col md:flex-row justify-center items-center gap-[20px]'>
                <Link className='bg-white drop-shadow-xl cursor-pointer rounded-[20px] gap-[10px] outline-pink-600 outline-2 justify-center  flex flex-col px-[20px] h-[120px] md:w-[45%] w-[80%] lg:w-[30%]' to="/login">
                    <div >
                        <p className='font-bold text-pink-600 text-[20px]'>Log In</p>
                        <div className='flex  flex-col'>
                            <p className='text-[#64748B] text-[15px]'>Email: demo@gmail.com</p>
                            <p className='text-[#64748B] text-[15px]'> Password: Demo12345</p>
                        </div>
                    </div>
                </Link>
                <Link className='bg-white drop-shadow-xl cursor-pointer rounded-[20px] gap-[10px] outline-pink-600 outline-2 justify-center  flex flex-col px-[20px] h-[120px] md:w-[45%] w-[80%] lg:w-[30%]' to="/signup">
                    <div >
                        <p className='font-bold text-pink-600 text-[20px]'>Sign Up</p>
                        <div className='flex  flex-col'>
                            <p className='text-[#64748B] text-[13px]'>Sign up for career guidance and personalized recommendations today!</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
        <div className='w-[100%] text-center mt-[70px]  md:mt-[400px] lg:mt-[40px] bg-pink-100 flex justify-center items-center py-[10px]'>
            <p>©{date} Career Recommendation System. All rights reserved. Designed By Bitero Chrismi David</p>
        </div>
    </div>
  )
}

export default LandingPage
