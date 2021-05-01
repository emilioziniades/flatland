import React from 'react'
import { Helmet } from 'react-helmet'
import { Nav, Navbar, Container } from 'react-bootstrap'
import { Link } from 'gatsby'

import pallette from '../../images/gatsby-icon.png'

const HeaderBase = ({ children }) => {
    return (
        <header className='bg-dark'>
            <Helmet>
              <meta charSet='utf-8' />
              <title>Flatland</title>
              <link rel='canonical' href='https://flatland.gq/' />
            </Helmet>
            <Container>
                <Navbar variant='dark' expand='md'>
                <Link to="/">
                <Navbar.Brand className='m-1'>
                <img
                  alt=''
                  src={pallette}
                  width='30'
                  height='30'
                  className='d-inline-block align-top'
                /> 
                {' '}Flatland
                </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='mr-auto'>
                <Nav.Item>
                    <Nav.Link>
                    <Link to="/">Home</Link>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link>
                        <Link to="/explainer">Explainer</Link>
                    </Nav.Link>
                </Nav.Item>
                </Nav>
                {children}
                </Navbar.Collapse>
                </Navbar>
            </Container>
        </header>
    )  
}

export default HeaderBase