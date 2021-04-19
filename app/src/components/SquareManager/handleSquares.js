import React, { useContext } from 'react'
import { Row, Table } from 'react-bootstrap'
import styled from 'styled-components'

import { BlockchainContext } from '../BlockchainContext'
import { zip } from '../../utils/utilityFunctions'
import HandleSquare from './handleSquare'

const TableHead = styled.th`
    text-align: center
    `
const HandleSquares  = (props) => {

    const { state } = useContext(BlockchainContext)

    return (
        <Row className='justify-content-center mr-auto ml-auto p-2'>
        <Row>
            <h3 className='p-2'> Looks like you own {state.ownedSquares.length === 1 ? 'a square' : 'squares'}! Manage here </h3>
        </Row>
        <Table>
                    <thead>
                    <tr>
                    <TableHead> Square # </TableHead>
                    <TableHead> Coords </TableHead>
                    <TableHead> Square </TableHead>
                    <TableHead> Current colour </TableHead>
                    <TableHead> Change colour </TableHead>
                    </tr>
                    </thead>
                    <tbody>
                    {zip(state.ownedSquares).map((square, i) => <HandleSquare key={i} squareId={square[0]} squareColour={square[1]} /> )}
                    </tbody>
        </Table>
        </Row>
)}

export default HandleSquares


