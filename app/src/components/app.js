import React from "react";
import { Container, Row } from "react-bootstrap";

import Header from './header';
import Hero from './hero';
import Canvas from './canvas';

export default class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {       
            account: 'fill account',
            contract: null,
            totalSupply: 0,
            squares: [],
            ownedSquares: 0
    };
      }

    render() {
        return(<div>
                < Header account={this.state.account}/>                    
                <Container>
                    <Row>
                        <Hero />
                    </Row>
                    <Row>
                        <Canvas />
                    </Row>
                </Container>
            </div>)
    }
}
