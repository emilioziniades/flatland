import React, { useEffect, useContext } from 'react'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from './Header/header'
import Hero from './hero'
import UserTabs from './userTabs'
import { BlockchainContext } from './stateProvider'
import { claimTopic, changeTopic, parseLogs, blockHeightToDate } from '../utils/blockchainUtils'
import { hexColourToDecimal } from '../utils/utilityFunctions' 
import CanvasLayout from './Canvas/canvasLayout'

const App = () => {

    const { state, dispatch } = useContext(BlockchainContext)
    const { connected, contract, provider, ownedSquares } = state || {} //allows app to render even without blockchain connection

    // Listens for account change
    // useEffect(() => {
    //     if (window.ethereum) {
    //         // console.log(window.ethereum)
    //         window.ethereum.on('accountsChanged', () => {
    //             window.ethereum.request({ method: 'eth_requestAccounts' }).then(
    //                 data => {
    //                     dispatch({type: 'CHANGE-ACCOUNT', payload: data[0]})
    //                 }
    //             )
    //         })
    //         return () => {
    //             // window.ethereum.off('accountsChanged')
    //         }
    //     }
    // })

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
            if (!ownedSquares.hasOwnProperty(newLog.id)) {
                // not my square, update squares
                dispatch({type: 'MINT-REMOTE', colour: colourInteger})
            }
            // my square, squares already updated, do nothing

        }
        else if (newLog.topic === 'ColourChange') {
            dispatch({type: 'CHANGE-REMOTE', id: newLog.id, colour: colourInteger})
        }
        } 
        return(
            <>
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
                <CanvasLayout/>
            <Container>
                { connected && <UserTabs /> }
            </Container>
            </>
        )   
}

export default App