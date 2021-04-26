import React, { useReducer } from 'react'
import { Container } from 'react-bootstrap'

import Header from './Header/header'
import Hero from './hero'
import Canvas from './Canvas/canvas'
import UserTabs from './userTabs'
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
        history: [],

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
                { state.connected && <UserTabs /> }
            </Container>

            </BlockchainContext.Provider>
        )   
}

export default App