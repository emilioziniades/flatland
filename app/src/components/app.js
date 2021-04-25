import React, { useReducer } from 'react'
import { Container } from 'react-bootstrap'

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
        ownedSquares: {},
        isSquareClicked: false,
        clickedSquare: null,

    }

    const [state, dispatch] = useReducer(blockchainReducer, initialState)

        return(
            <BlockchainContext.Provider value={{ state, dispatch }}>

            <Header />                    
            <Container>
                <Hero />
            </Container>
                <Canvas/>
            <Container>
                <hr/>
                <SquareManager />
            </Container>

            </BlockchainContext.Provider>
        )   
}

export default App