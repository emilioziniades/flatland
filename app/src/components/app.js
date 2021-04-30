import React, { useEffect, useReducer, useState } from 'react'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from './Header/header'
import Hero from './hero'
import Canvas from './Canvas/canvas'
import UserTabs from './userTabs'
import { BlockchainContext } from './BlockchainContext'
import { SquareContext } from './SquareContext'
import { blockchainReducer, claimTopic, changeTopic, parseLogs, blockHeightToDate } from '../utils/blockchainUtils'
import { hexColourToDecimal } from '../utils/utilityFunctions' 


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
    const { connected, contract, provider } = state || {} //allows app to render even without blockchain connection
    const [ selectedSquare, setSelectedSquare ] = useState(null)

    // Listens for account change
    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', () => {
                window.ethereum.request({ method: 'eth_requestAccounts' }).then(
                    data => {
                        dispatch({type: 'CHANGE-ACCOUNT', payload: data[0]})
                    }
                )
            })

            return () => {
                window.ethereum.off('accountsChanged')
            }
        }



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
        newLog = newLog[0]

        // Update history
        blockHeightToDate(e.blockNumber, provider).then(data => {
                        newLog['date'] = data
                        dispatch({type: 'APPEND-LOGS', payload: newLog})
                        }
        )
        // Update squares
        let colourInteger = hexColourToDecimal(newLog.colour)

        if (newLog.topic === 'NewSquare' ) {
            dispatch({type: 'MINT-REMOTE', colour: colourInteger})
        }
        else if (newLog.topic === 'ColourChange') {
            dispatch({type: 'CHANGE-REMOTE', id: newLog.id, colour: colourInteger})
        }
    } 
        return(
            <SquareContext.Provider value={[ selectedSquare, setSelectedSquare ]}>
            <BlockchainContext.Provider value={{ state, dispatch }}>
            <Header /> 
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover />                   
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