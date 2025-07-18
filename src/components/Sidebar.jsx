import React, { useContext, useState } from 'react';
import { FaUserGraduate } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { GiOpenBook } from "react-icons/gi";
import { GiGraduateCap } from "react-icons/gi";
import { IoLogOutSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import { AuthContext } from '../context/AuthProvider';
import { FiX } from 'react-icons/fi'; // icons for toggle


const Sidebar = ({onClose}) => {
    const {user, setUser} = useContext(AuthContext)
    const [close, setClose] = useState(true)
    const navigate = useNavigate()
    const logout =()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        navigate('/login')
        setUser(null)
    }
    const items = [
        { icon: <FaHome />, label: 'Dashboard', link: '/dashboard' },
        { icon: <FaUserGraduate />, label: 'Career Recommendation', link: '/career-recommendation' },
        { icon: <GiOpenBook />, label: 'Explore Courses', link: '/explore-courses' },
        { icon: <GiGraduateCap />, label: 'Explore Universities', link: '/explore-universities' },
    ];

    return (
        // <div className="left-0 top-0 fixed group flex flex-col bg-[#0D2B56] text-white py-4 px-2 h-screen transition-all duration-300 w-[85%]  lg:w-[5%] lg:hover:w-[20vw] overflow-hidden">
         <div className={`
                ${close ? 'left-0' : '-left-full'}
                fixed top-0 lg:left-0 lg:fixed group flex flex-col bg-[#0D2B56] text-white py-4 px-2 h-screen transition-all duration-300 
                w-[85%] lg:w-[5%] lg:hover:w-[20vw] overflow-hidden z-40
            `}>      
            <div className='flex items-center justify-between md:pr-[50px]'>
                <div className='flex'>
                    <Link to='/' className='md:text-[2.5vw] lg:text-[1.1vw] text-[5.5vw] h-[5vh] w-[5vh] rounded-[5px] ml-[0.5vw] my-[30px]  bg-[white] text-[#0D2B56] flex justify-center items-center font-bold'>E</Link>
                </div>
                <FiX onClick={onClose} className='md:text-[6vw] text-[9vw] lg:hidden flex'/>
            </div>
            <div className="space-y-[3.5vh] md:space-y-[3vh] cursor-pointer">
                {items.map((item, index) => (
                    <Link to={item.link} key={index} className="flex items-center space-x-3 px-2 hover:bg-[#17417B] rounded-md py-2 transition-all duration-200">
                        <div className="text-white text-[4.5vh] md:text-[3.8vh] lg:text-[4.5vh]">{item.icon}</div>
                        <span className="md:text-[2.5vw] lg:text-[1.1vw] text-[5vw] font-medium lg:whitespace-nowrap lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                            {item.label}
                        </span>
                    </Link>
                ))}
            </div>
            <div className="flex-grow"></div>
             <div className="space-y-6 cursor-pointer">
                    <div onClick={logout} className="flex items-center space-x-3 px-2 hover:bg-[#17417B] rounded-md py-2 transition-all duration-200">
                        <div className="text-white text-[4.5vh] md:text-[3.8vh] lg:text-[4.5vh]"><IoLogOutSharp /></div>
                        <span className="md:text-[2.5vw] lg:text-[1.1vw] text-[5vw] font-medium  lg:whitespace-nowrap lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                            LOG OUT
                        </span>
                    </div>
            </div>
        </div>
    );
};

export default Sidebar;
