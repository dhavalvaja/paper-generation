import React from 'react'
import '../App.css'
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import LOGO from '../img/DDULOGO.png'
import { Link } from 'react-router-dom'

export default function NavigationBar() {
  return (<>
    <Navbar bg='light' variant='light'>
      <Container>
        <Navbar.Brand><img className='mx-3' src={LOGO} height={50} width={50} alt='brand logo' />
          DDU-Paper Generator</Navbar.Brand>
        <Nav>
          <Nav.Link href='/'>Home</Nav.Link>
          <Nav.Link href="#">Test Generator</Nav.Link>
          <Nav.Link href="#aboutus">About us</Nav.Link>
          <Button>Log In</Button>
        </Nav>
      </Container>
    </Navbar>
  </>
  )
}
