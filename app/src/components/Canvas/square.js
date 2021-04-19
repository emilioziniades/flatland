import React, { useContext } from 'react'
import $ from 'jquery'
import GridItem from './gridItem'
import { BlockchainContext } from '../BlockchainContext'
import { getSquareColumn, getSquareRow, invertColour } from '../../utils/utilityFunctions'

const Square = (props) => {

    const { state, dispatch } = useContext(BlockchainContext)
    const {squares, isSquareClicked, clickedSquare} = state
    const squareId = parseInt(props.id.split('-')[1])
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

    const handleClick = (e) => {

        console.log(e)
        console.log(chosenSquare)

        if (isSquareClicked && clickedSquare === props.id ) {
            $('#'+ props.id).css(unchosenSquare)
            dispatch({type: 'UNCLICK-SQUARE'})
        }

        else if (isSquareClicked && clickedSquare !== props.id) {
            $('#'+ clickedSquare).css('border', 'none')
            $('#'+ props.id).css(chosenSquare)
            dispatch({type: 'CLICK-SQUARE', clickedSquare: props.id})
        }
        else {
            //No square is clicked
            $('#'+ props.id).css(chosenSquare)
            dispatch({type: 'CLICK-SQUARE', clickedSquare: props.id})
 
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
            id={props.id}
            onClick={handleClick}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            >
        </GridItem>)

}

export default Square