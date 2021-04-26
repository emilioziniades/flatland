import React, { useContext, useEffect } from 'react'
import { Row } from 'react-bootstrap'
import { blockHeightToDate } from '../../utils/blockchainUtils'

import { BlockchainContext } from '../BlockchainContext'
import EventToast from './eventToast'


const CanvasHistory = () => {

    const { state, dispatch } = useContext(BlockchainContext)
    const { provider, connected, history } = state

    const replaceBlockHeightWithDate = async () => {

        console.log('Starting date replacement')
        let newHistory = history

        for (let i = 0; i < newHistory.length; i++) {
            try {
                const blockHeight = newHistory[i].date
                const date = await blockHeightToDate(blockHeight, provider)
                newHistory[i].date = date
            }
            catch (e) {

            }
        }

        console.log(newHistory)

        dispatch({type: 'UPDATE-LOGS', payload: newHistory})

        console.log('finished date replacement')
    }

    useEffect(() => {
        if (connected) {
            replaceBlockHeightWithDate()
        } 
    }, [connected])

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