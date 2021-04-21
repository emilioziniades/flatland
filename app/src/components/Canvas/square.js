import React, { useContext } from 'react'
import $ from 'jquery'

import GridItem from './gridItem'
import { BlockchainContext } from '../BlockchainContext'
import { getSquareColumn, getSquareRow, invertColour } from '../../utils/utilityFunctions'

const Square = ({ key, id }) => {

    const { state, dispatch } = useContext(BlockchainContext)
    const { account, squares, isSquareClicked, clickedSquare } = state
    const squareId = parseInt(id.split('-')[1])
    const squareColour = squares[squareId - 1]
    const invertedColour = invertColour(squareColour)

    const chosenSquare = {
        'border': '2px solid ' + invertedColour,
    }

    const unchosenSquare = {
        'border': 'none',
    }

    const hoveredSquareColumn = {
        'opacity': '0.5',
    }

    const hoveredSquareRow = {
        'opacity': '0.5',
    }

    const unhoveredSquareColumn = {
        'opacity': '1',
    }

    const unhoveredSquareRow = {
        'opacity': '1',
    }

    //In future we can use this if we want to change behaviours from users who are logged in vs not
    //This is instead handled on the Side Panel level now (Not logged in > Cannot claim square)
    const routeClickEvent = (e) => { account ? handleClick(e) : handleClick(e) }       

    const handleClick = (e) => {
        if (isSquareClicked && clickedSquare === id) {
            $('#' + id).css(unchosenSquare)
            dispatch({ type: 'UNCLICK-SQUARE' })
        }
        else if (isSquareClicked && clickedSquare !== id) {
            $('#' + clickedSquare).css('border', 'none')
            $('#' + id).css(chosenSquare)
            dispatch({ type: 'CLICK-SQUARE', clickedSquare: id })
        }
        else {
            //No square is clicked
            $('#' + id).css(chosenSquare)
            dispatch({ type: 'CLICK-SQUARE', clickedSquare: id })
        }
    }

    const handleEnter = (e) => {
        e.target.style.opacity = '0.5'

        const column = getSquareColumn(squareId)
        const row = getSquareRow(squareId)

        for (let columnSquare of column) {
            let nodeId = '#node-' + columnSquare
            $(nodeId).css(hoveredSquareColumn)
        }
        for (let rowSquare of row) {
            let nodeId = '#node-' + rowSquare
            $(nodeId).css(hoveredSquareRow)
        }
    }

    const handleLeave = (e) => {
        e.target.style.opacity = '1'

        const column = getSquareColumn(squareId)
        const row = getSquareRow(squareId)

        for (let columnSquare of column) {
            let nodeId = '#node-' + columnSquare
            $(nodeId).css(unhoveredSquareColumn)

        }
        for (let rowSquare of row) {
            let nodeId = '#node-' + rowSquare
            $(nodeId).css(unhoveredSquareRow)
        }
    }

    return (
        <GridItem
            className='node grid-item'
            id={id}
            onClick={routeClickEvent}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
        </GridItem>
    )
}

export default Square