import React, { useContext, useState } from 'react'
import { MdLocationOn } from "react-icons/md";
import { BsCalendar4Event } from "react-icons/bs";
import { FaCircleDot } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi'; // icons for toggle
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import { AuthContext } from '../../context/AuthProvider';
import Sidebar from '../../components/Sidebar';

function Dashboard() {
 const {user} = useContext(AuthContext)
 const [showSidebar, setShowSidebar] = useState(false)


 const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

//   handle display sidebar
        const handleDisplaySidebar = () => {
            setShowSidebar(true); // open sidebar
        };

        const handleCloseSidebar = () => {
            setShowSidebar(false); // close sidebar
        };

   const recommendedCourses = [
{
    "title": "English",
    "institution": "Obafemi Awolowo University",
    "duration": "4 years",
    "image": "/image/english.jpg",
    "view": "View Details",
    "about": "A comprehensive study of the English language, literature, and communication. Prepares students for careers in education, media, writing, and public relations. This course offers practical and theoretical knowledge to help students succeed in the field. This course offers practical and theoretical knowledge to help students succeed in the field. This course offers practical and theoretical knowledge to help students succeed in the field.",
    "linking": "/explore-courses"
  },
  {
    "title": "Software Engineering",
    "institution": "Abia State University",
    "duration": "4 years",
    "image": "/image/software-engr.jpg",
    "view": "View Details",
    "about": "Focuses on designing, developing, and maintaining software systems. Equips students with practical coding skills and engineering principles. This course offers practical and theoretical knowledge to help students succeed in the field. This course offers practical and theoretical knowledge to help students succeed in the field. This course offers practical and theoretical knowledge to help students succeed in the field.",
    "linking": "/explore-courses"

  },
  {
    "title": "Mechanical Engineering",
    "institution": "University of Benin",
    "duration": "5 years",
    "image": "/image/mechanical_engr.jpg",
    "view": "View Details",
    "about": "Covers the design, analysis, and manufacturing of mechanical systems. Careers include automotive, aerospace, and energy industries. This course offers practical and theoretical knowledge to help students succeed in the field. This course offers practical and theoretical knowledge to help students succeed in the field. This course offers practical and theoretical knowledge to help students succeed in the field.",
    "linking": "/explore-courses"

  },
//   {
//     title: "Digital Marketing",
//     institution: "Columbia University",
//     duration: "1 year",
//     image: "/image/computer science.jpg"
//   }
];

const topInstitutions = [
   {
    institution: "University of Ilorin",
    address: "Ilorin, Kwara State, Nigeria",
    website: "https://www.unilorin.edu.ng",
    image: "/image/unilorin.png",
    explore: "Explore University",
    icons: <MdLocationOn />,
    link: "/explore-courses"

  },
  {
    institution: "Obafemi Awolowo University",
    address: "Ile-Ife, Osun State, Nigeria",
    website: "https://www.oauife.edu.ng",
    image: "/image/oau.png",
    explore: "Explore University",
    icons: <MdLocationOn />,
    link: "/explore-courses"

  },
  {
    institution: "University of Lagos",
    address: "Akoka, Yaba, Lagos State, Nigeria",
    website: "https://unilag.edu.ng",
    image: "/image/unilag.png",
    explore: "Explore University",
    icons: <MdLocationOn />,
    link: "/explore-courses"

  },
];


const event = [
  {
    eventName: "Virtual Campus Tour",
    eventLocation: "Stanford, California",
    time: "2:00 PM",
    date: "Feb 20, 2025",
    eventType: "Virtual Event", 
    eventIcons: <BsCalendar4Event/>,
    dot: <FaCircleDot/>


  },
  {
     eventName: "Virtual Campus Tour",
    eventLocation: "Stanford, California",
    time: "2:00 PM",
    date: "Feb 20, 2025",
    eventType: "Virtual Event", 
    eventIcons: <BsCalendar4Event/>,
    dot: <FaCircleDot/>



  },
  {
     eventName: "Virtual Campus Tour",
    eventLocation: "Stanford, California",
    time: "2:00 PM",
    date: "Feb 20, 2025",
    eventType: "Virtual Event", 
    eventIcons: <BsCalendar4Event/>,
    dot: <FaCircleDot/>



  },
  {
     eventName: "Virtual Campus Tour",
    eventLocation: "Stanford, California",
    time: "2:00 PM",
    date: "Feb 20, 2025",
    eventType: "Virtual Event", 
    eventIcons: <BsCalendar4Event/>,
    dot: <FaCircleDot/>
  }
];

  return (
    <div className='w-[100%] px-[10px] md:px-[20px] lg:px-[50px] py-[30px] flex flex-col gap-[30px] lg:gap-[50px] bg-[#F3F4F6]'>
        {/* Mobile Menu Toggle Button */}
        <div className='lg:hidden w-full justify-between items-center flex'>
            <div className=''>
                <p className='md:text-[3.5vw] lg:text-[2vw] text-[5.5vw] font-bold'>Welcome Back, {user && user.userName ? user.userName : "Guest"}</p>
                <p className='text-[#4B5563] md:text-[2vw] lg:text-[0.9vw] text-[3.5vw] font-semibold'>{formattedDate}</p>
            </div>
            {!showSidebar && (
                <button onClick={handleDisplaySidebar} className='text-[9vw] md:text-[6vw]'>
                <HiOutlineMenuAlt3 />
                </button>
            )}
        </div>
        {/* Mobile sidebar */}
            {showSidebar && (
                <Sidebar onClose={handleCloseSidebar} />
            )}
        <div className='flex flex-col md:flex-row justify-between md:items-center gap-[15px] md:gap-0'>
            <div className='hidden lg:flex lg:flex-col'>
                <p className='md:text-[3.5vw] lg:text-[2vw] text-[5.5vw] font-bold'>Welcome Back, {user && user.userName ? user.userName : "Guest"}</p>
                <p className='text-[#4B5563] md:text-[2vw] lg:text-[0.9vw] text-[3.5vw] font-semibold'>{formattedDate}</p>
            </div>
            <Link to= '/career-recommendation'>
                <button className='bg-[#2563EB] text-white px-[20px] md:text-[2.2vw] lg:text-[1vw] text-[3.3vw] py-[15px] rounded-[10px] cursor-pointer'>View Career Recommendation</button>
            </Link>
        </div>

        
        {/* recommended courses */}
        <div className='flex flex-col gap-[10px]'>
            <div className='flex justify-start items-center'>
                <div>
                    <p className='md:text-[3.2vw] lg:text-[1.5vw] text-[5vw] font-bold'>Recommended Courses</p>
                </div>
                {/* <a href='#' className='text-[#2563EB] font-bold px-[20px] text-[20px] py-[15px] rounded-[10px] cursor-pointer'>View All {">"}</a> */}
            </div>
            <div className='flex flex-col md:grid md:grid-cols-2  lg:flex lg:flex-row w-[100%] gap-[20px] md:gap-[15px] justify-between items-center'>
                {recommendedCourses.map((r, index)=>(
                    <div key={index} className='w-[95%] md:w-[95%] lg:w-[24%] lg:h-[50vh] rounded-[20px] overflow-hidden pb-[25px] shadow-lg gap-[15px] flex flex-col'>
                        <div className='w-[100%] h-[32vh]'>
                            <img src={r.image} className='w-full h-full object-fill' alt="" />
                        </div>
                        <div className='px-[15px] md:px-[30px] gap-[20px] flex flex-col'>
                            <div className='flex flex-col gap-[8px]'>
                                <p className='md:text-[2.5vw] lg:text-[1.1vw] text-[5.5vw] font-bold'>{r.title}</p>
                                <p className='text-[#4B5563] md:text-[2.3vw] lg:text-[0.9vw] text-[4.5vw]'>{r.institution}</p>
                            </div>
                            <div className='w-full justify-between flex items-center'>
                                <p className='text-[#4B5563] md:text-[2.3vw] lg:text-[0.9vw] text-[4.5vw]'>{r.duration}</p>
                                <Link to={r.linking}>
                                    <p className=' cursor-pointer text-[#2563EB] font-bold md:text-[2.3vw] lg:text-[0.9vw] text-[4.2vw]'>{r.view}</p>
                                </Link>
                            </div>
                        </div>

                    </div>
                ))}

                <Link to='/explore-courses' className='w-[95%] md:w-[95%] lg:w-[24%] h-[50vh] rounded-[20px] gap-[8px] shadow-2xl justify-center items-center flex cursor-pointer '>
                    <p className='flex items-center text-[#2563EB] hover:text-[#003fc7] md:text-[2.5vw] lg:text-[1.1vw] text-[5.5vw] font-semibold'>View More Courses </p>
                    <FaArrowRightLong className='text-[#2563EB] hover:text-[#003fc7] text-[24px]'/>
                </Link>
            </div>
            
         </div>


         {/* university*/}
        <div className='flex flex-col gap-[10px]'>
            <div className='flex justify-between items-center'>
                <div>
                    <p className='md:text-[3.2vw] lg:text-[1.5vw] text-[5vw] font-bold'>Top Institutions for You</p>
                </div>
                <Link to='/explore-universities' className='text-[#2563EB] font-bold px-[20px] md:text-[3.2vw] lg:text-[1.5vw] text-[4vw] py-[15px] rounded-[10px] cursor-pointer'>View All {">"}</Link>
            </div>
            <div className='flex flex-col lg:flex lg:flex-row w-[100%] justify-between gap-[20px] md:gap-[10px] items-center'>
                {topInstitutions.map((t, indexx)=>(
                    <div key={indexx} className='w-[95%] md:w-[95%] lg:w-[32%] rounded-[10px] lg:rounded-[20px] overflow-hidden pb-[25px] shadow-lg gap-[15px] flex flex-col'>
                        <div className='w-[100%] h-[32vh]'>
                            <img src={t.image} className='w-full h-full object-fill' alt="" />
                        </div>
                        <div className='px-[15px] md:px-[30px] gap-[25px] flex flex-col'>
                            <div className='flex flex-col gap-[8px]'>
                                <p className='md:text-[2.5vw] lg:text-[1.1vw] text-[5.5vw] font-bold'>{t.institution}</p>
                                <div className='flex items-center gap-[10px]'>
                                    <p className='text-[#4B5563] text-[20px]'>{t.icons}</p>
                                    <p className='text-[#4B5563] md:text-[2.3vw] lg:text-[0.9vw] text-[4.5vw]'>{t.address}</p>
                                </div>
                            </div>
                            <Link to={t.link}>
                            <button className=' w-[100%] border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white rounded-[10px] md:text-[2.5vw] lg:text-[1.1vw] text-[4vw] py-[10px] border-2 cursor-pointer'>{t.explore}</button>
                            
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>

         <div className='flex flex-col gap-[10px]'>
            <div className='flex '>
                <div>
                    <p className='md:text-[3.2vw] lg:text-[1.5vw] text-[5vw] font-bold'>Upcoming Events</p>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 w-full lg:w-[68%] gap-[20px]  justify-between items-center '>
                {event.map((e, indexx)=>(
                    <div key={indexx} className='w-[99%] rounded-[20px] overflow-hidden py-[16px] px-[16px]  flex shadow-lg gap-[15px] bg-white'>
                        <div>
                            <p className='text-[#2563EB] text-[25px] bg-[#b5c9fd] p-[15px] rounded-[5px]'>{e.eventIcons}</p>
                        </div>
                        <div className='gap-[25px] flex flex-col'>
                            <div className='flex flex-col gap-[8px]'>
                                <p className='md:text-[2.5vw] lg:text-[1.1vw] text-[5vw] font-bold'>{e.eventName}</p>
                                <div className='flex items-center gap-[10px]'>
                                    <p className='text-[#4B5563] md:text-[2.3vw] lg:text-[0.9vw] text-[4.5vw]'>{e.date}</p>
                                    <p className='text-[7px] text-[#4B5563]'>{e.dot}</p>
                                    <p className='text-[#4B5563] md:text-[2.3vw] lg:text-[0.9vw] text-[4.5vw]'>{e.time}</p>
                                </div>
                            </div>
                            <p className='text-[#2563EB] md:text-[2.1vw] lg:text-[0.9vw] text-[4vw]'>{e.eventType}</p>
                        </div>

                    </div>
                ))}
            </div>
        </div>
        
    </div>
  )
}

export default Dashboard
