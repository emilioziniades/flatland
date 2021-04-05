import React from "react";
import { Row } from "react-bootstrap";

import { Jumbotron } from "react-bootstrap";

const Hero = () => {

    return (
    	<Row>
	        <Jumbotron>
	        <h1> Collaborative pixel art, on the Ethereum blockchain</h1>
		        <p>
		          Each square on this digital canvas is owned by a different person. Once you own a square,
		          you can change its colour at any time. Claim your square and become part of the Flatland community.
		    
		        </p>
	      	</Jumbotron>
		</Row>
    )
      
}

export default Hero


