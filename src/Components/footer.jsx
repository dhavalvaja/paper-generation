import React from 'react'
import LOGO from '../img/DDULOGO.png'
import { AiFillFacebook, AiFillYoutube, AiFillInstagram } from 'react-icons/ai'

export default function CFooter() {
    return (
        <div className='container-fluid d-flex justify-content-evenly bg-light p-5' style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            <div>
                <div className='d-flex align-items-center'>
                    <img className='m-1' src={LOGO} alt='logo' />
                    <h2 className='m-1'>Dharmsinh Desai University</h2>
                </div>
                <div>
                    <p>
                        <b>Address:</b><br />
                        College Road,<br />
                        Nadiad 387 0001, Gujarat
                    </p>
                </div>
            </div>
            <div className='d-flex text-center flex-column'>
                <h2>Pages</h2>
                <p className='text-decoration-underline'>Test Generator</p>
                <p className='text-decoration-underline'>About Us</p>
            </div>
            <div className='d-flex flex-column align-items-center'>
                <h2>Connect with us</h2>
                <div className='d-flex'>
                    <AiFillFacebook />
                    <AiFillInstagram />
                    <AiFillYoutube />
                </div>
            </div>
        </div>
    )
}
