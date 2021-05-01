import React, { useState, useContext } from 'react'
import { Button, Toast } from 'react-bootstrap'
import styled from 'styled-components'
import $ from 'jquery'

import { invertColour } from '../../utils/utilityFunctions'
import { BlockchainContext, SquareContext } from '../stateProvider'

const SquareIcon = styled.div`
    border: 1px solid #E2E2E2;
    height: 16px;
    width: 16px;
    display: inline-block;
    vertical-align: middle;
    ${squareId => `background: ${squareId.background};`}
    `

const EventToast = ({ data }) => {
    const { date, id, colour, topic } = data

    const [show, setShow] = useState(true)
    const toggleShow = () => setShow(!show)

    const { state } = useContext(BlockchainContext)
    const { squares } = state
    const [selectedSquare, setSelectedSquare] = useContext(SquareContext)

    const squareColour = (squares[id - 1] > -1 ? squares[id - 1] : '#ffffff')
    const invertedColour = (squares[id - 1] > -1 ? invertColour(squareColour) : '#000000')

    const chosenSquare = {
        'border': '2px solid ' + invertedColour,
    }

    const handleClick = (e) => {
        $('#node-' + selectedSquare).css('border', 'none')       
        $('#node-' + id).css(chosenSquare)
        setSelectedSquare(id)
    }


    return(
        <Toast 
            className='m-1'
            show={show}
            onClose={toggleShow}>
            <Toast.Header>
            <SquareIcon background={colour} className="mr-2" />    
            <b className="mr-auto"> {topic === 'NewSquare' ? 'Square Claim' : 'Colour Change'}</b>
        </Toast.Header>
        <Toast.Body>
            <Button
                variant='link'
                size='sm'
                onClick={handleClick}
            >
                Square  <b>#{id}</b>
            </Button>
            {topic === 'NewSquare' ? 'claimed with' : 'changed to'} colour <b>{colour}</b> on <b>{date}</b>
        </Toast.Body>
    </Toast>
    )
}

export default EventToast