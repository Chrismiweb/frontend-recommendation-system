import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi'; // icons for toggle
import { HiOutlineMenuAlt3 } from "react-icons/hi";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='w-full relative'>
      {/* Top Bar */}
      <div className='flex justify-between px-[15px] md:px-[35px] lg:px-[32px] items-center py-[30px]'>
        
        {/* Logo */}
        <div className='flex justify-center items-center gap-[5px]'>
          <div className='bg-[#2563EB] px-[10px] lg:px-[12px] flex justify-center items-center lg:text-[1.3vw] text-[5vw] md:text-[2.5vw] rounded-[8px] font-bold text-white'>E</div>
          <p className='lg:text-[1.3vw] text-[5vw] md:text-[2.5vw] font-black text-black'>EduPath</p>
        </div>

        {/* Desktop Menu */}
        <div className='hidden lg:flex gap-[32px] items-center'>
          <Link to=''><p className='text-[1.1vw] '>How it works</p></Link>
          <Link to=''><p className='text-[1.1vw]'>Why Us</p></Link>
          <Link to=''><p className='text-[1.1vw]'>About</p></Link>
          <Link to='/login'><p className='text-[1.1vw]'>Login</p></Link>
          <Link to='/signup'><p className='text-[1.1vw]'>Register</p></Link>
          <Link to=''>
            <button className='px-[24px] py-[8px] bg-[#2563EB] text-[1.1vw] rounded-full text-white cursor-pointer'>Start Assessment</button>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className='lg:hidden'>
          <button onClick={toggleMenu}>
            {menuOpen ? <FiX size={30} /> : <HiOutlineMenuAlt3 size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className='flex flex-col lg:hidden gap-[20px] md:gap-[25px] bg-white px-[20px] py-[20px] shadow-md z-50 absolute top-[100%] w-full left-0'>
          <Link to='' onClick={toggleMenu}><p className='text-[5vw] md:text-[3.5vw]'>How it works</p></Link>
          <Link to='' onClick={toggleMenu}><p className='text-[5vw] md:text-[3.5vw]'>Why Us</p></Link>
          <Link to='' onClick={toggleMenu}><p className='text-[5vw] md:text-[3.5vw]'>About</p></Link>
          <Link to='/login' onClick={toggleMenu}><p className='text-[5vw] md:text-[3.5vw]'>Login</p></Link>
          <Link to='/signup' onClick={toggleMenu}><p className='text-[5vw] md:text-[3.5vw]'>Register</p></Link>
          <Link to='' onClick={toggleMenu}>
            <button className='w-full px-[24px] py-[10px] bg-[#2563EB] rounded-full text-white font-semibold text-[5vw] md:text-[3.5vw]'>Start Assessment</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
