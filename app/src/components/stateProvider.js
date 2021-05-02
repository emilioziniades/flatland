import React, { useState, useReducer } from 'react'
import { blockchainReducer } from '../utils/blockchainUtils'

export const BlockchainContext = React.createContext(null)
export const SquareContext = React.createContext(null)

export const initialState = {
    connected: false,
    contract: {},
    provider: null,
    squares: [],
    totalSupply: 0,
    maxSupply: 0,
    account: '',
    ownedSquares: {},
    history: [],

}

const StateWrapper = ({ children }) => {

    const [state, dispatch] = useReducer(blockchainReducer, initialState)
    
    const [ selectedSquare, setSelectedSquare ] = useState(null)

    return(
        <BlockchainContext.Provider value={{ state, dispatch }}>
            <SquareContext.Provider value={[ selectedSquare, setSelectedSquare ]}>
            {children}
            </SquareContext.Provider>
        </BlockchainContext.Provider>
    )

}

const StateProvider = ({ element }) => <StateWrapper> {element} </StateWrapper>

export default StateProvider