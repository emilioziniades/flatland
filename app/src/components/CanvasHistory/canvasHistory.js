import React, { useContext, useEffect } from 'react'
import { Row, Table } from 'react-bootstrap'
import { blockHeightToDate } from '../../utils/blockchainUtils'

import { BlockchainContext } from '../BlockchainContext'
import EventRow from './eventRow'
import { TableHead, Head, TableBody, TableRow } from '../SquareManager/tableComponents'


const CanvasHistory = () => {

    const { state, dispatch } = useContext(BlockchainContext)
    const { provider, connected, history } = state

    const replaceBlockHeightWithDate = async () => {

        console.log('Starting date replacement')
        
        for (let i = 0; i < history.length; i++) {
            try {
                let newHistory = history
                const blockHeight = newHistory[i].date
                const date = await blockHeightToDate(blockHeight, provider)
                newHistory[i].date = date
                dispatch({type: 'UPDATE-LOGS', payload: newHistory})

            }
            catch (e) {

            }
        }

        console.log('finished date replacement')
    }

    useEffect(() => {
        if (connected) {
            replaceBlockHeightWithDate()
        } 
    }, [connected])

    let events = history.map((element, index) => {
        return(
            <EventRow data={element} key={element.txId} />
        )
    })

    return(
        <Row className='justify-content-center mr-auto ml-auto p-2'>
        <Row>
            <h3 className='p-2'> Flatland History </h3>
        </Row>
        <Table hover responsive>
            <TableHead>
                <TableRow>
                <Head> Event </Head>
                <Head> Square # </Head>
                <Head> Colour </Head>
                <Head> Date </Head>
                </TableRow>
            </TableHead>
            <TableBody>
                { events }
            </TableBody>
        </Table>
        </Row>
        )
}

export default CanvasHistory