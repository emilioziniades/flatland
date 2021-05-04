import React, { useContext } from 'react'
import { Table } from 'react-bootstrap'

import { BlockchainContext, SquareContext } from '../stateProvider'
import EventRow from '../CanvasHistory/eventRow'
import { TableHead, Head, TableBody, TableRow } from '../SquareManager/tableComponents'

const SquareHistory = () => {
    const { state } = useContext(BlockchainContext)
    const { history } = state
    const [selectedSquare] = useContext(SquareContext)

    let listSquareEvents = []
       
    for (let event of history) {
        console.log(event.id)
        if (event.id === selectedSquare) {
            listSquareEvents.push(event)
        }    
    }

    console.log(selectedSquare)

    let squareEventRows = listSquareEvents.map(element => {
        return(
            <EventRow data={element} key={element.txId} showID={false}/>
        )
    }) 

    return (
        <Table>
            <TableHead>
                <TableRow>
                <Head> Event </Head>
                <Head> Colour </Head>
                <Head> Date </Head>
                <Head> Receipt </Head>
                </TableRow>
            </TableHead>
            <TableBody>
                { squareEventRows }
            </TableBody>
        </Table>
    )
}

export default SquareHistory