import React, { useState, useReducer, useMemo } from 'react'
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
    
    const providerSelectSquare = useMemo(() => ({selectedSquare, setSelectedSquare}), [selectedSquare, setSelectedSquare])

    return(
        <BlockchainContext.Provider value={{ state, dispatch }}>
            <SquareContext.Provider value={providerSelectSquare}>
            {children}
            </SquareContext.Provider>
        </BlockchainContext.Provider>
    )

}

const StateProvider = ({ element }) => <StateWrapper> {element} </StateWrapper>

export default StateProvider