import React, { useContext } from 'react'
import { Row, Table } from 'react-bootstrap'

import { BlockchainContext } from '../BlockchainContext'
import { zip } from '../../utils/utilityFunctions'
import HandleSquare from './handleSquare'
import { TableHead, Head, TableBody, TableRow } from './tableComponents'

const HandleSquares  = () => {

    const { state } = useContext(BlockchainContext)
    const { ownedSquares } = state
    const userSquares = zip(ownedSquares)

    return (
        <Row className='justify-content-center mr-auto ml-auto p-2'>
        <Row>
            <h3 className='p-2'> Looks like you own {userSquares.length === 1 ? 'a square' : userSquares.length + ' squares'}! Manage here: </h3>
        </Row>
        <Table hover responsive>
                    <TableHead>
                    <TableRow>
                    <Head> Square # </Head>
                    <Head> Co-ordinates </Head>
                    <Head> Square </Head>
                    <Head> Current colour </Head>
                    <Head> Change colour </Head>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {userSquares.map((square, i) => <HandleSquare key={i} squareId={square[0]} squareColour={square[1]} /> )}
                    </TableBody>
        </Table>
        </Row>
)}

export default HandleSquares


