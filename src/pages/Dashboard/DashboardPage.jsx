import React from 'react'
import Dashboard from './Dashboard'
import Sidebar from '../../components/Sidebar'

function DashboardPage() {
  return (
    <div className='flex'>
        <div className='hidden lg:flex'>
          <Sidebar />
        </div>
        <main className='w-full lg:w-[95%] ml-auto'>
            <Dashboard/>
        </main>
    </div>
  )
}

export default DashboardPage
