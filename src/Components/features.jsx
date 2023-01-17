import React from 'react'
import { Button } from 'react-bootstrap'
import GP from '../img/generate_paper.svg'
import QB from '../img/question_bank.svg'
import AB from '../img/add_class.svg'

export default function Features() {
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center flex-column bg-info p-3">
            <h1 className='text-light mb-5 text-decoration-underline'>Features</h1>
            <div className='d-flex mb-4 justify-content-center align-items-center bg-light p-3' style={{ borderRadius: 20 }}>
                <div className='bg-info d-flex flex-column m-3' style={{ borderRadius: 20, minHeight: 220, minWidth: 220 }}>
                    <img src={GP} alt="generate paper" height={150} />
                    <Button className='m-3' variant='primary' href='/generate'>Generate Paper</Button>
                </div>
                <div className='bg-info d-flex flex-column m-3' style={{ borderRadius: 20, minHeight: 220, minWidth: 220 }}>
                    <img src={GP} alt="generate paper" height={150} />
                    <Button className='m-3' variant='primary' href='/addblueprint'>Add Blueprint</Button>
                </div>
                <div className='bg-info d-flex flex-column m-3' style={{ borderRadius: 20, minHeight: 220, minWidth: 220 }}>
                    <img src={QB} alt="generate paper" height={150} />
                    <Button className='m-3' variant='primary' href='/addquestion'>Add question</Button>
                </div>
                <div className='bg-info d-flex flex-column m-3' style={{ borderRadius: 20, minHeight: 220, minWidth: 220 }}>
                    <img src={AB} alt="generate paper" height={150} />
                    <Button className='m-3' variant='primary' href='/addchapter'>Add Chapter</Button>
                </div>
                <div className='bg-info d-flex flex-column m-3' style={{ borderRadius: 20, minHeight: 220, minWidth: 220 }}>
                    <img src={AB} alt="generate paper" height={150} />
                    <Button className='m-3' variant='primary' href='/addco'>Add CO</Button>
                </div>
            </div>
        </div >
    )
}
