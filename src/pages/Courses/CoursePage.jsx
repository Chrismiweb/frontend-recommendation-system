import React from 'react'
import Courses from './Courses'
import Sidebar from '../../components/Sidebar'

function CoursePage() {
  return (
    <div className='flex'>
        <Sidebar/>
        <main className='w-[95%] ml-auto'>
            <Courses/>
        </main>
    </div>
  )
}

export default CoursePage
