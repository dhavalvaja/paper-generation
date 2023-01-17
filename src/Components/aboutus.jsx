import React from 'react'
import DDUCAMPUS from '../img/DDUCAMPUS.jpg'
export default function AboutUs() {
    return (
        <div className='container-fluid bg-info p-3 '>
            <h1 className='text-center text-decoration-underline text-light m-3'>About Us</h1>
            <div className='d-flex align-align-items-center justify-content-center'>
                <p className='p-5 m-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi accusantium a odio fugit fugiat ex, ut eveniet voluptas cum laudantium sequi neque debitis veritatis odit tempora magni et iusto quis culpa cupiditate impedit! Quasi sed nam commodi cupiditate, nostrum officia, aut quam odit aliquam assumenda ea similique sunt, porro fuga.</p>
                <img className='p-3 m-5' height={300} src={DDUCAMPUS} alt='back-ground' />
            </div>
        </div>
    )
}
