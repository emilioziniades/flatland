import React, { useContext } from 'react'
import $ from 'jquery'

import GridItem from './gridItem'
import { BlockchainContext, SquareContext } from '../stateProvider'
import { CoordinateContext, HighlightContext } from '../canvasContextProvider'
import { getSquareColumn, getSquareRow, invertColour, coordToString } from '../../utils/utilityFunctions'

const Square = ({ id }) => {

    const { state } = useContext(BlockchainContext)
    const { squares, ownedSquares } = state || {}
    const { selectedSquare, setSelectedSquare } = useContext(SquareContext)
    const { setCoord } = useContext(CoordinateContext)
    const { highlightSquares } = useContext(HighlightContext)


    const squareId = parseInt(id.split('-')[1])

    //Using white as placeholder colours for unclaimed squares, in future we should change that
    //this would require changing invertedColour function to handle RGB conversion too

    // First checks if squares array present, because that is necessary to check if square exists
    const squareColour = (squares ? squares[squareId - 1] > -1 ? squares[squareId - 1] : '#ffffff': '#ffffff' )
    const invertedColour = (squares ? squares[squareId - 1] > -1 ? invertColour(squareColour) : '#000000' : '#000000' )

    //Hover CSS states
    const hoveredSquareColumn = {'opacity': '0.5',}
    const hoveredSquareRow = {'opacity': '0.5',}
    const unhoveredSquareColumn = {'opacity': '1',}
    const unhoveredSquareRow = {'opacity': '1',}

    const handleClick = (e) => {(selectedSquare === squareId) ? setSelectedSquare(null) : setSelectedSquare(squareId)}

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

        setCoord(coordToString(squareId))
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

        setCoord('_')
    }

    let squareSelected = selectedSquare === squareId
    let highlightSquare = (ownedSquares[squareId]>0) && highlightSquares
    
    return (
        <GridItem
            className='node grid-item'
            id={id}
            onClick={handleClick}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            selected={ squareSelected }
            highlight= { highlightSquare }
            colour={squareColour}
            inverseColour={invertedColour}
        >
        </GridItem>
    )
}

export default Square
