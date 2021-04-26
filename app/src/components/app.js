import React, { useReducer } from 'react'
import { Container } from 'react-bootstrap'

import Header from './Header/header'
import Hero from './hero'
import Canvas from './Canvas/canvas'
import UserTabs from './userTabs'
import { BlockchainContext } from './BlockchainContext'
import { blockchainReducer, claimTopic, changeTopic, parseLogs, blockHeightToDate  } from '../utils/blockchainUtils'



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
    const { connected, contract, provider, history } = state
    
    // Listeners (should probably be refactored somewhere else, but unsure where)
    if (connected) {
        const claimFilter = {
                address: contract.address,
                topics: [ claimTopic ]
            }

        provider.on(claimFilter, (e) => {
            console.log(e)
            let newLog = parseLogs([e])
            console.log(newLog)
            blockHeightToDate(e.blockNumber, provider).then( data => {
                console.log(data)
                newLog['date'] = data
                console.log(newLog)
                const newHistory = newLog.concat(history)
                dispatch({type: 'UPDATE-LOGS', payload: newHistory})

            })

        })
        
        const changeFilter =  {
            address: contract.address,
            topics: [ changeTopic ]
        }

        provider.on(changeFilter, (e) => {
            console.log(e)
            let newLog = parseLogs([e])
            console.log(newLog)
            blockHeightToDate(e.blockNumber, provider).then(data => {
                console.log(data)
                newLog['date'] = data
                console.log(newLog)
                const newHistory = newLog.concat(history)
                dispatch({type: 'UPDATE-LOGS', payload: newHistory})

            })
        })
        }

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