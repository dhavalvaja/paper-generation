import React from 'react'
import AboutUs from '../Components/aboutus'
import Features from '../Components/features'
import DDUCAMPUS from '../img/DDUCAMPUS.jpg'

export default function Home() {
    return (
        <>
            <img src={DDUCAMPUS} width={"100%"} alt='back-ground' />
            <AboutUs />
            <Features />
        </>
    )
}
