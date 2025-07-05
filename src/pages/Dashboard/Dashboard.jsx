import React from 'react'
import { MdLocationOn } from "react-icons/md";
import { BsCalendar4Event } from "react-icons/bs";
import { FaCircleDot } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function Dashboard() {

 const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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
    "duration": "4 years",
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
    rank: 1,
    name: "Stanford University",
    location: "Stanford, California",
    imageUrl: "/image/FRAME.png",
    explore: "Explore Institution",
    icons: <MdLocationOn/>

  },
  {
    rank: 2,
    name: "Massachusetts Institute of Technology",
    location: "Cambridge, Massachusetts",
    imageUrl: "/image/FRAME.png",
    explore: "Explore Institution",
    icons: <MdLocationOn/>


  },
  {
    rank: 3,
    name: "Harvard University",
    location: "Cambridge, Massachusetts",
    imageUrl: "/image/FRAME.png",
    explore: "Explore Institution", 
    icons: <MdLocationOn/>

  }
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
    <div className='w-[100%] px-[50px] py-[30px] flex flex-col gap-[50px] bg-[#F3F4F6]'>
        <div className='flex justify-between items-center'>
            <div>
                <p className='text-[30px] font-bold'>Welcome Back, Chrismi</p>
                <p className='text-[#4B5563] text-[15px] font-semibold'>{formattedDate}</p>
            </div>
            <Link to= '/career-recommendation'>
                <button className='bg-[#2563EB] text-white px-[20px] text-[20px] py-[15px] rounded-[10px] cursor-pointer'>View Career Recommendation</button>
            </Link>
        </div>

        
        {/* recommended courses */}
        <div className='flex flex-col gap-[10px]'>
            <div className='flex justify-start items-center'>
                <div>
                    <p className='text-[25px] font-bold'>Recommended Courses</p>
                </div>
                {/* <a href='#' className='text-[#2563EB] font-bold px-[20px] text-[20px] py-[15px] rounded-[10px] cursor-pointer'>View All {">"}</a> */}
            </div>
            <div className='flex w-[100%] justify-between items-center'>
                {recommendedCourses.map((r, index)=>(
                    <div key={index} className='w-[24%] rounded-[20px] overflow-hidden pb-[25px] shadow-lg gap-[15px] flex flex-col'>
                        <div className='w-[100%] h-[300px]'>
                            <img src={r.image} className='w-full h-full object-fill' alt="" />
                        </div>
                        <div className='px-[30px] gap-[20px] flex flex-col'>
                            <div className='flex flex-col gap-[8px]'>
                                <p className='text-[20px] font-bold'>{r.title}</p>
                                <p className='text-[#4B5563] text-[18px]'>{r.institution}</p>
                            </div>
                            <div className='w-full justify-between flex items-center'>
                                <p className='text-[#4B5563] text-[18px]'>{r.duration}</p>
                                <Link to={r.linking}>
                                    <p className=' cursor-pointer text-[#2563EB] font-bold text-[18px]'>{r.view}</p>
                                </Link>
                            </div>
                        </div>

                    </div>
                ))}

                <Link to='/explore-courses' className='w-[24%] h-[440px] rounded-[20px] gap-[8px] shadow-2xl justify-center items-center flex cursor-pointer '>
                    <p className='flex items-center text-[#2563EB] hover:text-[#003fc7] text-[24px] font-semibold'>View More Courses </p>
                    <FaArrowRightLong className='text-[#2563EB] hover:text-[#003fc7] text-[24px]'/>
                </Link>
            </div>
            
         </div>


         {/* upcoming Event */}
        <div className='flex flex-col gap-[10px]'>
            <div className='flex justify-between items-center'>
                <div>
                    <p className='text-[25px] font-bold'>Top Institutions for You</p>
                </div>
                <a href='#' className='text-[#2563EB] font-bold px-[20px] text-[20px] py-[15px] rounded-[10px] cursor-pointer'>View All {">"}</a>
            </div>
            <div className='flex w-[100%] justify-between items-center'>
                {topInstitutions.map((t, indexx)=>(
                    <div key={indexx} className='w-[32%] rounded-[20px] overflow-hidden pb-[25px] shadow-lg gap-[15px] flex flex-col'>
                        <div className='w-[100%] h-[300px]'>
                            <img src={t.imageUrl} className='w-full h-full object-fill' alt="" />
                        </div>
                        <div className='px-[30px] gap-[25px] flex flex-col'>
                            <div className='flex flex-col gap-[8px]'>
                                <p className='text-[20px] font-bold'>{t.name}</p>
                                <div className='flex items-center gap-[10px]'>
                                    <p className='text-[#4B5563] text-[20px]'>{t.icons}</p>
                                    <p className='text-[#4B5563] text-[15px]'>{t.location}</p>
                                </div>
                            </div>
                            <button className=' w-[100%] border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white rounded-[10px] text-[20px] py-[10px] border-2 cursor-pointer'>{t.explore}</button>
                        </div>

                    </div>
                ))}
            </div>
        </div>

         <div className='flex flex-col gap-[10px]'>
            <div className='flex '>
                <div>
                    <p className='text-[25px] font-bold'>Upcoming Events</p>
                </div>
            </div>
            <div className='grid grid-cols-2 w-[68%] gap-[20px]  justify-between items-center '>
                {event.map((e, indexx)=>(
                    <div key={indexx} className='w-[99%] rounded-[20px] overflow-hidden py-[16px] px-[16px]  flex shadow-lg gap-[15px] bg-white'>
                        <div>
                            <p className='text-[#2563EB] text-[25px] bg-[#b5c9fd] p-[15px] rounded-[5px]'>{e.eventIcons}</p>
                        </div>
                        <div className='gap-[25px] flex flex-col'>
                            <div className='flex flex-col gap-[8px]'>
                                <p className='text-[20px] font-bold'>{e.eventName}</p>
                                <div className='flex items-center gap-[10px]'>
                                    <p className='text-[#4B5563] text-[20px]'>{e.date}</p>
                                    <p className='text-[7px] text-[#4B5563]'>{e.dot}</p>
                                    <p className='text-[#4B5563] text-[20px]'>{e.time}</p>
                                </div>
                            </div>
                            <p className='text-[#2563EB] text-[17px]'>{e.eventType}</p>
                        </div>

                    </div>
                ))}
            </div>
        </div>
        
    </div>
  )
}

export default Dashboard
