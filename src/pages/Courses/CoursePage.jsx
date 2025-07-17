import React from 'react'
import Courses from './Courses'
import Sidebar from '../../components/Sidebar'

function CoursePage() {
  return (
    <div className='flex'>
        <div className='hidden lg:flex'>
          <Sidebar />
        </div>
        <main className='w-full px-[20px] lg:px-0 lg:w-[95%] ml-auto'>
            <Courses/>
        </main>
    </div>
  )
}

export default CoursePage
