import React from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import Hero from './Hero'
import HowItWork from './HowItWork'
import WhyChooseUs from './WhyChooseUs'
import Steps from './Steps'
import Developer from './Developer'
import SubFooter from '../../components/SubFooter'
import Footer from '../../components/Footer'

function HomePage() {
  return (
    <div className=' w-[100%] overflow-hidden scroll-smooth' >
        <Navbar/>
        <Hero/>
        <HowItWork/>
        <WhyChooseUs/>
        <Steps/>
        <Developer/>
        <SubFooter/>
        <Footer/>
    </div>
  )
}

export default HomePage