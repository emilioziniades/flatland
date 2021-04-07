import React, { useReducer } from "react"
import { Container } from "react-bootstrap"

import Header from './header'
import Hero from './hero'
import Canvas from './canvas'
import SquareManager from './squareManager'
import { BlockchainContext } from './BlockchainContext'
import { blockchainReducer } from '../utils/blockchainUtils'

/*

MNEMONIC USED FOR TESTING PURPOSES: 
roof gasp satisfy cause gather frequent forget swim swarm real unaware video

 */

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
            <Header/>                    
            <Container>
                <Hero />
                <Canvas/>                    
                <hr/>
                <SquareManager />
                
            </Container>
            </BlockchainContext.Provider>
        )   
}

export default App