import React, { useContext } from "react";
import { Helmet } from 'react-helmet';
import { Nav, Navbar, Container, Form, Button } from "react-bootstrap";

import { BlockchainContext } from './BlockchainContext'
import pallette from "../images/gatsby-icon.png";
import { loadBlockchain } from '../utils/blockchainUtils'

const Header = (props) => {

    const { state, dispatch } = useContext(BlockchainContext)

    const handleClick = async () => {

        const blockchainState = await loadBlockchain()
        dispatch({
          type: 'LOAD',
          payload: blockchainState
        })
        
    }


    return (
        <header className="bg-dark">
            <Helmet>
              <meta charSet="utf-8" />
              <title>Flatland</title>
              <link rel="canonical" href="https://flatland.gq/" />
            </Helmet>
            <Container>
                <Navbar variant="dark" expand="md">
                <Navbar.Brand href="/">
                <img
                  alt=""
                  src={pallette}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                /> 
                {" "}Flatland
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav as="ul" className="ml-auto">
                  <Form inline>
                  <Button 
                    variant={state.account ? "success" : "primary" } 
                    onClick={handleClick}>
                      {state.account ? state.account : "Connect Account" }
                    </Button>
                  </Form>
                </Nav>  
                </Navbar.Collapse>
                </Navbar>
            </Container>
        </header>
    )  
}

export default Header




