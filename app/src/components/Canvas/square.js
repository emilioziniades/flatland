import React, { useContext } from 'react'
import $ from 'jquery'

import GridItem from './gridItem'
import { BlockchainContext } from '../../context/BlockchainContext'
import { SquareContext } from '../../context/SquareContext'
import { CoordinateContext } from '../../context/CoordinateContext'
import { getSquareColumn, getSquareRow, invertColour, coordToString } from '../../utils/utilityFunctions'

const Square = ({ id }) => {

    const { state } = useContext(BlockchainContext)
    const { account, squares } = state || {}
    const [ selectedSquare, setSelectedSquare ] = useContext(SquareContext)
    const { setCoord } = useContext(CoordinateContext)

    const squareId = parseInt(id.split('-')[1])


    //Using white as placeholder colours for unclaimed squares, in future we should change that
    //this would require changing invertedColour function to handle RGB conversion too

    // First checks if squares array present, because that is necessary to check if square exists
    const squareColour = (squares ? squares[squareId - 1] > -1 ? squares[squareId - 1] : '#ffffff': '#ffffff' )
    const invertedColour = (squares ? squares[squareId - 1] > -1 ? invertColour(squareColour) : '#000000' : '#000000' )

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
        if (selectedSquare === squareId) {
            $('#node-' + selectedSquare).css(unchosenSquare)
            setSelectedSquare(null)
        }
        else {
            $('#node-' + selectedSquare).css('border', 'none')
            $('#node-' + squareId).css(chosenSquare)
            setSelectedSquare(squareId)
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

        setCoord('.')
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
