import React, { useState, useContext } from 'react'
import { Button, Toast } from 'react-bootstrap'
import styled from 'styled-components'
import $ from 'jquery'

import { hexColourToDecimal, invertColour } from '../../utils/utilityFunctions'
import { BlockchainContext } from '../BlockchainContext'

const SquareIcon = styled.div`
    //box-shadow: 1px 1px 1px black ;
    height: 16px;
    width: 16px;
    display: inline-block;
    vertical-align: middle;
    ${squareId => `background: ${squareId.background};`}
    `

const EventToast = ({ data }) => {
    const { date, id, colour } = data

    const [show, setShow] = useState(true)
    const toggleShow = () => setShow(!show)

    const { state, dispatch } = useContext(BlockchainContext)
    const { isSquareClicked, clickedSquare } = state
    const invertedColour = invertColour(hexColourToDecimal(colour))

    const chosenSquare = {
        'border': '2px solid ' + invertedColour,
    }

    const handleClick = (e) => {

        const indexSquare = 'node-'.concat(id)
        console.log(indexSquare)
        console.log(colour)
        console.log(invertedColour)

        if (isSquareClicked && clickedSquare !== indexSquare) {
            $('#' + clickedSquare).css('border', 'none')
            $('#' + indexSquare).css(chosenSquare)
            dispatch({ type: 'CLICK-SQUARE', clickedSquare: indexSquare })
        }
        else {
            //No square is clicked
            $('#' + indexSquare).css(chosenSquare)
            dispatch({ type: 'CLICK-SQUARE', clickedSquare: indexSquare })

        }
    }


    return(
        <Toast 
            className='m-1'
            show={show}
            onClose={toggleShow}>
            <Toast.Header>
            <SquareIcon background={colour} className="mr-2" />    
            <b className="mr-auto"> Flatland Square Claim</b>
        </Toast.Header>
        <Toast.Body>
            <Button
                variant='link'
                size='sm'
                onClick={handleClick}
            >
                Square  <b>#{id}</b>
            </Button>
            claimed on <b>{date}</b> with colour <b>{colour}</b>
        </Toast.Body>
    </Toast>
    )
}

export default EventToast