import React, { useEffect, useReducer, useState } from 'react'
import { Container } from 'react-bootstrap'

import Header from './Header/header'
import Hero from './hero'
import Canvas from './Canvas/canvas'
import UserTabs from './userTabs'
import { BlockchainContext } from './BlockchainContext'
import { SquareContext } from './SquareContext'
import { blockchainReducer, claimTopic, changeTopic, parseLogs, blockHeightToDate } from '../utils/blockchainUtils'



const App = () => {

    const initialState = {
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

    const [state, dispatch] = useReducer(blockchainReducer, initialState)
    const { connected, contract, provider } = state
    
    const [ selectedSquare, setSelectedSquare ] = useState(null)

    // Listens for account change
    useEffect(() => {
        window.ethereum.on('accountsChanged', () => {
            window.ethereum.request({ method: 'eth_requestAccounts' }).then(
                data => {
                    dispatch({type: 'CHANGE-ACCOUNT', payload: data[0]})
                }
            )
        })


    })

    // Event listener
    useEffect(() => {
        if (connected) {
            const filter = {
                address: contract.address,
                topics: [[ claimTopic, changeTopic ]] //claims OR colour changes
            }
            contract.on(filter, listener)

            return () => {
                contract.off(filter, listener)
            }
    }
    })  

    const listener = (e) => {
        console.log(e)
        let newLog = parseLogs([e])
        console.log(newLog)
        blockHeightToDate(e.blockNumber, provider).then(data => {
                        console.log(data)
                        newLog[0]['date'] = data
                        console.log(newLog)
                        dispatch({type: 'APPEND-LOGS', payload: newLog[0]})
                        }
        )
    } 

        return(
            <SquareContext.Provider value={[ selectedSquare, setSelectedSquare ]}>
            <BlockchainContext.Provider value={{ state, dispatch }}>
            
            <Header />                    
            <Container>
                <Hero />
            </Container>
                <Canvas/>
            <Container>
                { connected && <UserTabs /> }
            </Container>

            </BlockchainContext.Provider>
            </SquareContext.Provider>
        )   
}

export default App