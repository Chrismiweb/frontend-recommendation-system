import React from 'react'
import Universities from './Universities'
import Sidebar from '../../components/Sidebar'

function UniversityPage() {
  return (
    <div className='flex'>
        <Sidebar/>
        <main className='w-[95%] ml-auto'>
            <Universities/>
        </main>
    </div>
  )
}

export default UniversityPage
