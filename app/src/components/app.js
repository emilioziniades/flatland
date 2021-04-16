import React, { useReducer } from 'react'
import { Container, Row, Alert } from 'react-bootstrap'

import Header from './Header/header'
import Hero from './hero'
import Canvas from './Canvas/canvas'
import SquareManager from './SquareManager/squareManager'
import { BlockchainContext } from './BlockchainContext'
import { blockchainReducer } from '../utils/blockchainUtils'

const App = () => {

    const initialState = {
        connected: false,
        contract: null,
        provider: null,
        squares: [],
        totalSupply: 0,
        maxSupply: 0,
        account: '',
        ownedSquares: []

    }

    const [state, dispatch] = useReducer(blockchainReducer, initialState)

        return(
            <BlockchainContext.Provider value={{ state, dispatch }}>
            <Header />                    
            <Container>
                <Hero />
                <Canvas/>                    
                <Row className='d-flex justify-content-center'>
                    <Alert variant='warning' className='pr-5 pl-5' >
                        Note: transactions claiming a square or changing colour must be confirmed on the Ethereum Ropsten Testnet blockchain before it will reflect on Flatland. Blocks are mined every 15 seconds on average.
                    </Alert>
                </Row>
                <hr/>

                <SquareManager />
                
            </Container>
            </BlockchainContext.Provider>
        )   
}

export default App