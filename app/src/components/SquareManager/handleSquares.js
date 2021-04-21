import React, { useContext } from 'react'
import { Row, Table } from 'react-bootstrap'

import { BlockchainContext } from '../BlockchainContext'
import { zip } from '../../utils/utilityFunctions'
import HandleSquare from './handleSquare'
import { TableHead, Head, TableBody, TableRow } from './tableComponents'

const HandleSquares  = () => {

    const { state } = useContext(BlockchainContext)
    const { ownedSquares } = state

    return (
        <Row className='justify-content-center mr-auto ml-auto p-2'>
        <Row>
            <h3 className='p-2'> Looks like you own {ownedSquares.length === 1 ? 'a square' : 'squares'}! Manage here </h3>
        </Row>
        <Table>
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
                    {zip(ownedSquares).map((square, i) => <HandleSquare key={i} squareId={square[0]} squareColour={square[1]} /> )}
                    </TableBody>
        </Table>
        </Row>
)}

export default HandleSquares


