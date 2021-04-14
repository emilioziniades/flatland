import React from 'react'
import { Row } from 'react-bootstrap'
import { Link } from 'gatsby'

import { Jumbotron } from 'react-bootstrap'

const Hero = () => {

    return (
    	<Row>
	        <Jumbotron>
	        <h1> Collaborative pixel art, on the Ethereum blockchain</h1>
		        <p>
				Anyone can claim a square! Once you own a square, you can change its colour at any time. Squares are Non-Fungible Tokens that
				can be sold on secondary markets. Eventually, flatland will mint Canvas snapshots every month, which are collectively owned by the Square owners.
				They can be bidded on by interested parties. Bids are accepted via a consesus mechanism, and proceeds are split equally
				among squares. Check out the <Link to='/explainer'>explainer</Link>, or claim a square below.

		        </p>
	      	</Jumbotron>
		</Row>
    )
      
}

export default Hero


