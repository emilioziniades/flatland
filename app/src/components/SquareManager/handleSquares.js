import React, { useContext } from 'react'
import { Row } from 'react-bootstrap'

import { BlockchainContext } from '../BlockchainContext'
import { zip } from '../../utils/utilityFunctions'
import { HandleSquare } from './handleSquare'


export const HandleSquares  = (props) => {

    const { state } = useContext(BlockchainContext)

    return (
        <Row className='justify-content-center p-2'>
        <Row>
            <h3 className='p-2'> Looks like you own {state.ownedSquares.length === 1 ? 'a square' : 'squares'}! Manage here </h3>
        </Row>
        {zip(state.ownedSquares).map((square, i) => <HandleSquare key={i} squareId={square[0]} squareColour={square[1]} /> )}
        </Row>
)}


