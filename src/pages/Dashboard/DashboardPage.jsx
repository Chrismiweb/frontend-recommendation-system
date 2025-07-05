import React from 'react'
import Dashboard from './Dashboard'
import Sidebar from '../../components/Sidebar'

function DashboardPage() {
  return (
    <div className='flex'>
        <Sidebar/>
        <main className='w-[95%] ml-auto'>
            <Dashboard/>
        </main>
    </div>
  )
}

export default DashboardPage
