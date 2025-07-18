import React from 'react'
import Universities from './Universities'
import Sidebar from '../../components/Sidebar'

function UniversityPage() {
  return (
    <div className='flex'>
        <div className='hidden lg:flex'>
            <Sidebar />
        </div>
        <main className='w-full px-[20px] lg:px-0 lg:w-[95%] ml-auto'>
            <Universities/>
        </main>
    </div>
  )
}

export default UniversityPage
