import React, { useContext, useEffect } from 'react'
import { Row } from 'react-bootstrap'

import { BlockchainContext } from '../BlockchainContext'
import EventToast from './eventToast'


const CanvasHistory = () => {

    const { state, dispatch } = useContext(BlockchainContext)
    const { provider, connected, history } = state

    const replaceBlockHeightWithDate = async () => {

        console.log('Starting date replacement')
        let newHistory = history

        for (let i = 0; i < newHistory.length; i++) {

            const blockHeight = newHistory[i].date
            const blockData = await provider.getBlock(blockHeight)
            let date = new Date(blockData.timestamp * 1000)
            date = date.toLocaleDateString() + ' at ' + date.toLocaleTimeString()

            newHistory[i].date = date
        }

        console.log(newHistory)

        dispatch({type: 'UPDATE-LOGS', payload: newHistory})

        console.log('finished date replacement')
    }

    useEffect(() => {
        if (connected) {
            replaceBlockHeightWithDate()
        } 
    }, [])


    //Listener
// if (connected) {
//     const filter = {
//             address: contract.address,
//             topics: [ claimTopic ]
//         }
//         provider.on(filter, (e) => {
//             console.log(e)
//             getSquareClaimHistory()
//         })
//     }

    let events = history.map((element, index) => {
        return(
            <EventToast data={element} key={element.txId} />
        )
    })

    return(<div>
    <Row className='justify-content-center' >
            <h3 className='p-2'> {'Recent Activity \n'} </h3> 
    </Row>
    <Row className = 'm-1'>
        { events }
    </Row>
    </div>)
}

export default CanvasHistory