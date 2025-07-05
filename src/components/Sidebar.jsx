import React from 'react';
import { FaUserGraduate } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { GiOpenBook } from "react-icons/gi";
import { GiGraduateCap } from "react-icons/gi";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Sidebar = () => {
    const items = [
        { icon: <FaHome />, label: 'Dashboard', link: '/dashboard' },
        { icon: <FaUserGraduate />, label: 'Career Recommendation', link: '/career-recommendation' },
        { icon: <GiOpenBook />, label: 'Explore Courses', link: '/explore-courses' },
        { icon: <GiGraduateCap />, label: 'Explore Universities', link: '/explore-universities' },
    ];

    return (
        <div className=" fixed group flex flex-col bg-[#0D2B56] text-white py-4 px-2 h-screen transition-all duration-300 w-[5%] hover:w-[20vw] overflow-hidden">
            <div className='flex'>
                <Link to='/' className='text-[20px] w-[40px] rounded-[5px] ml-[10px] my-[30px] h-[40px] bg-[white] text-[#0D2B56] flex justify-center items-center font-bold'>E</Link>
            </div>
            <div className="space-y-6 cursor-pointer">
                {items.map((item, index) => (
                    <Link to={item.link} key={index} className="flex items-center space-x-3 px-2 hover:bg-[#17417B] rounded-md py-2 transition-all duration-200">
                        <div className="text-white text-[40px]">{item.icon}</div>
                        <span className="text-[20px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {item.label}
                        </span>
                    </Link>
                ))}
            </div>
            <div className="flex-grow"></div>
        </div>
    );
};

export default Sidebar;
