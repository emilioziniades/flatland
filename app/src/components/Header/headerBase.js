import React from 'react'
import { Helmet } from 'react-helmet'
import { Nav, Navbar, Container, Form, Button } from 'react-bootstrap'

import pallette from '../../images/gatsby-icon.png'

export const HeaderBase = (props) => {
    return (
        <header className='bg-dark'>
            <Helmet>
              <meta charSet='utf-8' />
              <title>Flatland</title>
              <link rel='canonical' href='https://flatland.gq/' />
            </Helmet>
            <Container>
                <Navbar variant='dark' expand='md'>
                <Navbar.Brand href='/' className='m-1'>
                <img
                  alt=''
                  src={pallette}
                  width='30'
                  height='30'
                  className='d-inline-block align-top'
                /> 
                {' '}Flatland
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='mr-auto'>
                <Nav.Item>
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link href="/explainer">Explainer</Nav.Link>
                </Nav.Item>
                </Nav>
                {props.children}
                </Navbar.Collapse>
                </Navbar>
            </Container>
        </header>
    )  
}

export default HeaderBase